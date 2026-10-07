import { useState } from 'react';
import { ArrowRight, CheckCircle2, LoaderCircle } from 'lucide-react';

export default function ContactForm({ simulateError = false }) {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState({ kind: 'idle', text: '' });
  const submitting = feedback.kind === 'loading';

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting) return;
    setFeedback({ kind: 'loading', text: 'Enviando solicitud…' });

    try {
      if (simulateError) throw new Error('Error de prueba. Intenta de nuevo con el escenario de éxito.');

      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!response.ok) throw new Error(`No se pudo enviar (HTTP ${response.status}). Intenta de nuevo.`);

      setEmail('');
      setFeedback({ kind: 'success', text: 'Solicitud recibida correctamente.' });
    } catch (error) {
      setFeedback({ kind: 'error', text: error instanceof TypeError
        ? 'No se pudo conectar. Revisa tu conexión e intenta de nuevo.'
        : error.message });
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-busy={submitting}>
      <label htmlFor="contact-email">Correo electrónico <span>(obligatorio)</span></label>
      <input
        id="contact-email"
        name="email"
        type="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          if (!submitting) setFeedback({ kind: 'idle', text: '' });
        }}
        required
        maxLength={254}
        autoComplete="email"
        readOnly={submitting}
        placeholder="tu@ejemplo.com"
        aria-describedby="contact-help"
      />
      <p id="contact-help" className="field-help">Usa un correo ficticio. El escenario de éxito lo envía a JSONPlaceholder.</p>
      <button type="submit" className="primary-button" disabled={submitting}>
        {submitting ? <LoaderCircle className="spinner" size={18} aria-hidden="true" /> : null}
        {submitting ? 'Enviando…' : 'Enviar mensaje'}
        {!submitting && <ArrowRight size={17} aria-hidden="true" />}
      </button>
      <div className={`form-feedback ${feedback.kind}`} role={feedback.kind === 'error' ? 'alert' : 'status'} aria-live={feedback.kind === 'error' ? 'assertive' : 'polite'} aria-atomic="true">
        {feedback.kind === 'success' && <CheckCircle2 size={17} aria-hidden="true" />}
        {feedback.text}
      </div>
    </form>
  );
}
