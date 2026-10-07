import { useRef, useState } from 'react';
import { Accessibility, ArrowDown, ArrowRight, ArrowUpRight, Atom, BookOpen, CircleAlert, Code2, Gauge, GitCompareArrows, ListChecks, Plug, Shield, Sparkles } from 'lucide-react';
import CodePanel from './components/CodePanel.jsx';
import Demo from './components/Demo.jsx';
import { categories, originalSource } from './data/review.js';
import componentSource from './components/ContactForm.jsx?raw';

const icons = { accessibility: Accessibility, sparkles: Sparkles, listchecks: ListChecks, shield: Shield, plug: Plug, circlealert: CircleAlert, atom: Atom, code: Code2, gauge: Gauge, book: BookOpen };
const originalFiles = [{ name: 'ContactForm.jsx', source: originalSource }];
const improvedFiles = [{ name: 'ContactForm.jsx', source: componentSource }];

function Analysis() {
  const [selected, setSelected] = useState(0);
  const tabsRef = useRef([]);
  const current = categories[selected];

  function moveTab(event, index) {
    const directions = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next;
    if (event.key in directions) next = (index + directions[event.key] + categories.length) % categories.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = categories.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabsRef.current[next]?.focus();
  }

  return (
    <section id="analisis" className="analysis-section" aria-labelledby="analysis-heading">
      <div className="section-heading"><div><h2 id="analysis-heading">Qué cambia y por qué</h2><p>Diez perspectivas para revisar un mismo componente.</p></div><span className="section-note">Problema → Solución</span></div>
      <div className="analysis-layout">
        <div className="category-nav" role="tablist" aria-label="Áreas de análisis" aria-orientation="vertical">
          {categories.map((category, index) => {
            const Icon = icons[category.icon];
            return <button key={category.id} ref={(element) => { tabsRef.current[index] = element; }} id={`tab-${category.id}`} role="tab" aria-selected={selected === index} aria-controls="analysis-panel" tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={(event) => moveTab(event, index)}><Icon size={18} aria-hidden="true" /><span>{category.title}</span>{selected === index && <ArrowRight size={15} className="category-arrow" aria-hidden="true" />}</button>;
          })}
        </div>
        <div className="analysis-content" id="analysis-panel" role="tabpanel" aria-labelledby={`tab-${current.id}`} tabIndex={0}>
          <div className="analysis-title"><h3>{current.title}</h3><span>{current.issues.length} hallazgos</span></div>
          <p className="analysis-intro">{current.intro}</p>
          <div className="issue-headings" aria-hidden="true"><span>En el original</span><span>Cómo lo solucionaría</span></div>
          <div className="issues">{current.issues.map((issue) => <article className="issue-row" key={issue.problem}><div><span className="mobile-column-label">En el original</span><h4>{issue.problem}</h4><p>{issue.detail}</p></div><div className="issue-solution"><span className="mobile-column-label">Cómo lo solucionaría</span><p>{issue.solution}</p></div></article>)}</div>
          <pre className="decision-snippet"><code>{current.snippet}</code></pre>
          <a className="source-link" href={current.source.url} target="_blank" rel="noopener noreferrer">{current.source.label}<ArrowUpRight size={15} /><span className="sr-only"> (abre una pestaña nueva)</span></a>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <header className="site-header"><div className="header-inner"><a href="#" className="brand" aria-label="Rock debugging, inicio"><span className="brand-mark"><Code2 size={23} strokeWidth={2.2} /></span><strong>rock<span className="brand-divider">/</span><span className="brand-detail">debugging</span></strong></a><nav aria-label="Navegación principal"><a href="#comparativa">Comparativa</a><a href="#analisis">Análisis</a><a href="#demo" className="nav-demo">Probar demo<ArrowUpRight size={15} /></a></nav></div></header>
      <main id="contenido" className="page-container">
        <section className="hero" aria-labelledby="page-heading"><div><div className="assignment-line"><span>Prueba técnica</span><span className="assignment-divider" /><span>Parte 2 — Debugging</span></div><h1 id="page-heading">Un formulario simple.<br /><span>Una mejor implementación.</span></h1></div><div className="hero-context"><p>El código puede funcionar y aun así tener mucho por mejorar. Una revisión de <code>ContactForm</code>, desde el primer clic hasta la respuesta de la API.</p><div className="stack-label"><span className="react-symbol"><Atom size={17} /></span>React<span className="stack-separator" />Vite<span className="stack-separator" />JavaScript</div></div></section>
        <section id="comparativa" className="comparison-section" aria-labelledby="comparison-heading"><div className="section-heading"><div className="comparison-heading"><GitCompareArrows size={21} /><h2 id="comparison-heading">Antes y después</h2></div><a className="text-link" href="#demo">Verlo en acción<ArrowDown size={16} /></a></div><div className="code-comparison"><CodePanel variant="original" files={originalFiles} /><CodePanel variant="improved" files={improvedFiles} /></div><div className="comparison-summary"><CircleAlert size={17} /><p><strong>El punto clave:</strong> recibir una respuesta no significa que el envío haya sido exitoso. La versión mejorada comprueba el resultado y comunica cada estado.</p><a href="#analisis" aria-label="Explorar el análisis de las diez áreas"><ArrowRight size={19} /></a></div></section>
        <Analysis />
        <Demo />
        <aside className="scope-note"><Shield size={21} /><div><h2>El frontend es solo una parte de la solución.</h2><p>La validación del servidor y la protección contra spam necesitan un backend real. JSONPlaceholder permite probar la respuesta HTTP, pero no envía correos ni crea un recurso persistente.</p></div></aside>
      </main>
      <footer className="site-footer"><div><span className="footer-brand"><Code2 size={17} />rock / debugging</span><span>Parte 2 · Análisis de ContactForm</span><a href="#contenido">Volver al inicio<ArrowUpRight size={14} /></a></div></footer>
    </>
  );
}
