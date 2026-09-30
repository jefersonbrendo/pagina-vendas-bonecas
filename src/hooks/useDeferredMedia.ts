import { useEffect, useState } from 'react';

// Libera as imagens abaixo da dobra depois que a página carregou e a pessoa interagiu
// (rolagem/toque), ou no máximo 1,5 s após o "load". Assim elas não disputam a conexão
// com a capa do vídeo (LCP) no carregamento inicial.
// Começa false também no navegador, para bater com o HTML pré-renderizado.
const MAX_WAIT_AFTER_LOAD_MS = 1500;
const INTERACTION_EVENTS = ['scroll', 'touchstart', 'pointerdown', 'wheel', 'keydown'] as const;

let released = false;
let started = false;
const listeners = new Set<() => void>();

function release() {
  if (released) return;
  released = true;
  INTERACTION_EVENTS.forEach((e) => window.removeEventListener(e, release));
  listeners.forEach((fn) => fn());
  listeners.clear();
}

function start() {
  started = true;
  INTERACTION_EVENTS.forEach((e) => window.addEventListener(e, release, { passive: true }));
  const afterLoad = () => window.setTimeout(release, MAX_WAIT_AFTER_LOAD_MS);
  if (document.readyState === 'complete') afterLoad();
  else window.addEventListener('load', afterLoad, { once: true });
}

export function useDeferredMedia(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (released) {
      setReady(true);
      return;
    }
    const onRelease = () => setReady(true);
    listeners.add(onRelease);
    if (!started) start();
    return () => {
      listeners.delete(onRelease);
    };
  }, []);

  return ready;
}
