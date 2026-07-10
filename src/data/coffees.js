// Stancraft Coffee — real catalog (11 coffees; grouped organic / non-organic).
// Whole bean only. Fields: name, region, process, roast, notes, price, tag (limited/decaf).
window.STANCRAFT_COFFEES = {
  organic: [
    { id: 'chechele', name: 'Yirgacheffe Chechele', region: 'Ethiopia', process: 'Natural', roast: 'Medium-light', price: 24, methods: ['drip', 'cold', 'french'],
      notes: 'Dark chocolate, dried dark berry, vanilla, and black tea.' },
    { id: 'chelbessa', name: 'Yirgacheffe Chelbessa', region: 'Ethiopia', process: 'Washed', roast: 'Medium-light', price: 24, methods: ['drip', 'cold'],
      notes: 'Fresh lemon, cooked berry and dried jasmine, with a tart citric acidity and mild sugary sweetness.' },
    { id: 'quabballe', name: 'Guji Quabballe', region: 'Ethiopia', process: 'Natural', roast: 'Light', price: 25, methods: ['drip', 'cold'],
      notes: 'Blueberry, hops, lavender, and lime.' },
    { id: 'koke', name: 'Yirgacheffe Koke', region: 'Ethiopia', process: 'Honey', roast: 'Light', price: 27, methods: ['drip', 'cold', 'french'],
      notes: 'Intense blueberry and honey-blossom sweetness — a very bright cup.' },
    { id: 'huehue', name: 'Huehuetenango', region: 'Guatemala', process: 'Washed', roast: 'Medium', price: 22, methods: ['drip', 'espresso', 'cold', 'french'],
      notes: 'Fruit and wine, nutty, and chocolatey.' },
  ],
  nonOrganic: [
    { id: 'pitalito', name: 'Huila Pitalito Supremo', region: 'Colombia', process: 'Washed', roast: 'Medium', price: 20, methods: ['drip', 'espresso', 'cold', 'french'],
      notes: 'Chocolate, almond, and cherry.' },
    { id: 'strawberry', name: 'Strawberry Co-Ferment', region: 'Colombia', process: 'Co-ferment', roast: 'Light-medium', price: 31, tag: 'Limited · 8 oz', methods: ['drip', 'cold'],
      notes: 'Intense sour-then-sweet acidity with a candy-like finish — a chocolate-covered strawberry.' },
    { id: 'banana', name: 'Pink Bourbon Cake Banana Co-Ferment', region: 'Colombia', process: 'Co-ferment', roast: 'Light-medium', price: 31, tag: 'Limited · 8 oz', methods: ['drip', 'cold'],
      notes: 'Banana Laffy Taffy, bubblegum, and wedding-cake sno-cone. Intense candy sweetness, no sharpness at all.' },
    { id: 'mundo-maya', name: 'Carlos Cadena Mundo Maya', region: 'Mexico', process: 'Natural · extended ferment', roast: 'Medium', price: 28, methods: ['drip', 'espresso', 'french'],
      notes: 'Cooked cranberry, dark chocolate, clove, and artificial blackberry. Boozy acidity and mild syrupy sweetness.' },
    { id: 'haraz', name: 'Sharqi Haraz', region: 'Yemen', process: 'Natural', roast: 'Medium-dark', price: 34, methods: ['espresso', 'french', 'drip'],
      notes: 'Densely packed cocoa — raw cacao, 82% dark chocolate, cocoa nibs, faint stone fruit, and a tobacco finish.' },
    { id: 'ea-decaf', name: 'EA Decaf', region: 'Colombia', process: 'Decaf', roast: 'Medium-dark', price: 20, tag: 'Decaf', methods: ['drip', 'espresso', 'french'],
      notes: 'Lemon, walnut, and brown sugar. Remarkably clean for a decaf.' },
  ],
};
