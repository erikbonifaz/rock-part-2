import { useState } from 'react';
import { ArrowUpRight, Check, FlaskConical, ShieldCheck } from 'lucide-react';
import ContactForm from './ContactForm.jsx';

const scenarios = [
  { id: 'success', label: 'Éxito · API', description: 'Envía un POST real a JSONPlaceholder. Su respuesta 201 simula la creación de un recurso; no envía un correo.' },
  { id: 'error', label: 'Error simulado', description: 'Provoca un fallo local para comprobar el mensaje de error. El correo se conserva y puedes volver al escenario de éxito.' },
];

export default function Demo() {
  const [scenario, setScenario] = useState('success');
  const current = scenarios.find(({ id }) => id === scenario);

  return (
    <section id="demo" className="demo-section" aria-labelledby="demo-heading">
      <div className="demo-explanation">
        <h2 id="demo-heading">Las mejoras también<br />se pueden probar<span className="blue-period">.</span></h2>
        <p>Cambia entre un envío a la API de prueba y un error simulado. La validación y los mensajes usan el mismo componente mejorado.</p>
        <ul className="demo-checklist">
          <li><Check size={17} />Envía un campo vacío o un correo inválido.</li>
          <li><Check size={17} />Usa Tab y Enter para completar el envío.</li>
          <li><Check size={17} />Observa la espera, el resultado y el reintento.</li>
        </ul>
        <a className="text-link" href="#analisis">Revisar las decisiones <ArrowUpRight size={16} /></a>
      </div>
      <div className="demo-workbench">
        <div className="demo-top"><span><FlaskConical size={18} /> Demo interactiva</span><span className="local-badge">JSONPlaceholder</span></div>
        <fieldset className="scenario-picker"><legend>Respuesta del servicio</legend><div className="scenario-options">{scenarios.map((item) => <label key={item.id} className={scenario === item.id ? 'selected' : ''}><input type="radio" name="scenario" value={item.id} checked={scenario === item.id} onChange={() => setScenario(item.id)} /><span>{item.label}</span></label>)}</div></fieldset>
        <p className="scenario-description" role="status">{current.description}</p>
        <ContactForm simulateError={scenario === 'error'} />
        <div className="privacy-note"><ShieldCheck size={16} /><span>Usa datos ficticios. Éxito consulta la API pública; los errores son locales. <a href="https://jsonplaceholder.typicode.com/#create" target="_blank" rel="noopener noreferrer">Ver documentación<span className="sr-only"> (abre una pestaña nueva)</span></a>.</span></div>
      </div>
    </section>
  );
}
