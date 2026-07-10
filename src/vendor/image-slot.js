// Production <image-slot>: renders its `src` (honoring `fit`), else nothing.
// The design tool's drag-to-fill/persistence is inert outside that runtime,
// so this ships graceful placeholders (real photos = set a `src` later).
if (!customElements.get('image-slot')) {
  customElements.define('image-slot', class extends HTMLElement {
    connectedCallback() { this.render(); }
    static get observedAttributes() { return ['src', 'fit']; }
    attributeChangedCallback() { if (this.isConnected) this.render(); }
    render() {
      const src = this.getAttribute('src');
      const fit = this.getAttribute('fit') || 'cover';
      this.style.display = 'block';
      this.style.width = '100%';
      this.style.height = '100%';
      this.innerHTML = '';
      if (src) {
        const img = document.createElement('img');
        img.src = src;
        img.alt = this.getAttribute('placeholder') || '';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = fit;
        img.style.display = 'block';
        this.appendChild(img);
      }
    }
  });
}
