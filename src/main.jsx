import './gtm.js';
// react-global.js's header comment says it must load BEFORE the bundle is
// imported — that bundle (_ds_bundle.js) is no longer imported by this
// branch, so react-global.js currently has no consumer. Left in place:
// removing it saves 581 bytes (0.4%), not worth touching a vendor file for.
import './vendor/react-global.js';
import './vendor/image-slot.js';

import './styles.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/600-italic.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/800.css';
import '@fontsource/montserrat/900.css';

import { createRoot } from 'react-dom/client';
import { App } from './sections/App.jsx';

createRoot(document.getElementById('root')).render(<App />);
