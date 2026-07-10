import './styles.css';

// Self-hosted fonts (weights used by the design tokens).
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/600-italic.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/800.css';
import '@fontsource/montserrat/900.css';
import '@fontsource/spectral/300.css';
import '@fontsource/spectral/400.css';
import '@fontsource/spectral/400-italic.css';
import '@fontsource/spectral/500.css';
import '@fontsource/spectral/600.css';

import { createRoot } from 'react-dom/client';
createRoot(document.getElementById('root')).render(
  <div style={{ padding: 40, fontFamily: 'var(--font-body)', background: 'var(--paper-100)' }}>
    Tokens + fonts OK
  </div>
);
