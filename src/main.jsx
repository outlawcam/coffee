import './vendor/react-global.js';
import './vendor/image-slot.js';   // register OUR shim first
import './vendor/_ds_bundle.js';   // its guarded image-slot registration now no-ops
import './data/coffees.js';

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
const { Button } = window.StancraftCoffeeDesignSystem_65aedf;
createRoot(document.getElementById('root')).render(
  <div style={{ padding: 40 }}>
    <Button variant="primary">Add to cart</Button>
    <image-slot id="smoke" style={{ display: 'block', width: 200, height: 200 }} src="/assets/bean-placeholder-50.png" fit="contain"></image-slot>
    <image-slot id="smoke-empty" style={{ display: 'block', width: 200, height: 200 }}></image-slot>
  </div>
);
