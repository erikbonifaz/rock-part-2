import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm.jsx';

afterEach(() => vi.unstubAllGlobals());

describe('ContactForm', () => {
  it('bloquea campos vacíos y correos inválidos con validación HTML', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    render(<ContactForm />);
    const user = userEvent.setup();
    const input = screen.getByLabelText(/correo electrónico/i);
    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }));
    expect(input).toBeInvalid();
    await user.type(input, 'correo-invalido');
    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }));
    expect(input).toBeInvalid();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('envía JSON y confirma una respuesta 201 sin exigir un body', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 201 });
    vi.stubGlobal('fetch', fetchMock);
    render(<ContactForm />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/correo electrónico/i), 'demo@example.com');
    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }));
    expect(fetchMock).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'demo@example.com' }),
    });
    expect(await screen.findByRole('status')).toHaveTextContent('Solicitud recibida correctamente.');
    expect(screen.getByLabelText(/correo electrónico/i)).toHaveValue('');
  });

  it('muestra un error HTTP y conserva el correo', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    render(<ContactForm />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/correo electrónico/i), 'demo@example.com');
    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent('HTTP 500');
    expect(screen.getByLabelText(/correo electrónico/i)).toHaveValue('demo@example.com');
    expect(screen.getByRole('button', { name: /enviar mensaje/i })).toBeEnabled();
  });

  it('comunica un fallo de conexión', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
    render(<ContactForm />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/correo electrónico/i), 'demo@example.com');
    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Revisa tu conexión');
  });

  it('deshabilita el botón durante la espera', async () => {
    let resolveRequest;
    vi.stubGlobal('fetch', vi.fn(() => new Promise((resolve) => { resolveRequest = resolve; })));
    render(<ContactForm />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/correo electrónico/i), 'demo@example.com');
    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }));
    expect(screen.getByRole('button', { name: /enviando/i })).toBeDisabled();
    resolveRequest({ ok: true, status: 201 });
    expect(await screen.findByRole('status')).toHaveTextContent('Solicitud recibida correctamente.');
  });

  it('permite demostrar un error local sin llamar a la API', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    render(<ContactForm simulateError />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/correo electrónico/i), 'demo@example.com');
    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Error de prueba');
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
