import { useState } from 'react';
import { Check, Copy, FileCode2 } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';

function renderToken(token, key) {
  if (typeof token === 'string') return token;
  if (Array.isArray(token)) return token.map((item, index) => renderToken(item, index));
  return <span key={key} className={`token ${token.type}`}>{renderToken(token.content)}</span>;
}

// El código se renderiza como texto/token JSX; no se inserta HTML arbitrario.
export default function CodePanel({ variant, files }) {
  const [fileIndex, setFileIndex] = useState(0);
  const [copyStatus, setCopyStatus] = useState('');
  const file = files[fileIndex];
  const lines = file.source.trimEnd().split('\n');
  const original = variant === 'original';

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(file.source);
      setCopyStatus('Código copiado');
    } catch {
      setCopyStatus('No se pudo copiar. Selecciona el código manualmente.');
    }
  }

  return (
    <article className={`code-panel ${variant}`} aria-label={`Código ${original ? 'original' : 'mejorado'}`}>
      <header className="code-header">
        <div className="code-title"><span className="version-dot" /><h3>{original ? 'Original' : 'Mejorado'}</h3><span className="version-caption">{original ? 'Punto de partida' : 'Propuesta de solución'}</span></div>
        <button type="button" className="copy-button" onClick={copyCode} aria-label={`Copiar ${original ? 'código original' : file.name}`}>
          {copyStatus === 'Código copiado' ? <Check size={15} /> : <Copy size={15} />}<span>{copyStatus === 'Código copiado' ? 'Copiado' : 'Copiar'}</span>
        </button>
      </header>
      <div className="file-bar">
        <FileCode2 size={15} aria-hidden="true" />
        {files.length > 1 ? <select value={fileIndex} onChange={(event) => { setFileIndex(Number(event.target.value)); setCopyStatus(''); }} aria-label="Archivo de la solución mejorada">{files.map((item, index) => <option value={index} key={item.name}>{item.name}</option>)}</select> : <span>{file.name}</span>}
        <span className="line-count">{lines.length} líneas</span>
      </div>
      <div className="code-scroll" tabIndex={0} role="region" aria-label={`Leer ${original ? 'componente original' : file.name}`}>
        <pre><code>{lines.map((line, index) => <span className="code-line" key={index}><span className="line-number" aria-hidden="true">{index + 1}</span><span className="line-content">{renderToken(Prism.tokenize(line, Prism.languages.jsx)) || ' '}</span></span>)}</code></pre>
      </div>
      <footer className="code-footer"><span>{original ? 'Hay caminos que anuncian éxito sin comprobarlo.' : 'Valida, espera la respuesta y comunica el resultado.'}</span><span className="language-tag">JSX / JS</span></footer>
      <span className="sr-only" role="status">{copyStatus}</span>
    </article>
  );
}
