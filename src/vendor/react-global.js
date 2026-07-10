// _ds_bundle.js references a bare global `React`. Expose the bundled React on
// window BEFORE the bundle is imported so that reference resolves.
import React from 'react';
import * as ReactDOM from 'react-dom';
window.React = React;
window.ReactDOM = ReactDOM;
