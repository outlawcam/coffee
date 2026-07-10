import './vendor/react-global.js';
import './vendor/image-slot.js';   // register OUR shim first
import './vendor/_ds_bundle.js';   // its guarded image-slot registration now no-ops
import './data/coffees.js';

import './styles.css';
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
import { App } from './sections/App.jsx';

window.__resources = {
  logoDark: '/assets/logo-stancraft.svg',
  logoWhite: '/assets/logo-stancraft-white.svg',
  scaLogo: '/assets/sca-member-white.png',
};

createRoot(document.getElementById('root')).render(<App />);
