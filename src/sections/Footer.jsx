// Footer — one hairline and the contact line. Deliberately minimal.
import React from 'react';

export function Footer() {
  return (
    <footer className="site-footer">
      <p className="site-footer__text">
        Stancraft Coffee Co. · Lufkin, TX
        <br />
        <a href="mailto:tyler@stancraftcoffee.com" className="site-footer__link">
          tyler@stancraftcoffee.com
        </a>
      </p>
    </footer>
  );
}
