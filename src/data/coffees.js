// Stancraft Coffee — current offerings, supplied by Tyler (October 2026).
//
// This list replaces the July 2026 spreadsheet transcription. It is not a
// re-tagging of that lineup: five coffees left (Brazilian Alta Mogiana,
// Colombia Huila Pitalito, Ethiopia Yirgacheffe Koke, Yemen Sharqui Haraz, and
// the old Chechele lot) and two Guji coffees arrived.
//
// `organic` drives the Organic / Non-Organic filters and comes from the two
// headings the list was given under — it is not inferred from `grade` or from
// the Guatemala row's "Fair-Trade Organic" process note, which only happens to
// agree.
//
// One price per coffee, as supplied. The old 12 oz / 2 lb / 5 lb ladder is
// gone: the source list quotes a single figure, and inventing the bulk tiers
// would be publishing numbers nobody confirmed. `sizeNote` is set only where
// the list restricts the size.

export const COFFEES = [
  // --- Organic offerings ---
  {
    id: 'guji-qabballe',
    name: 'Ethiopia Guji Qabballe',
    origin: 'Ethiopia',
    process: 'Natural Process',
    grade: 'Grade 1',
    organic: true,
    notes: 'Notes of Blueberry, Hops, Lavender, and Lime.',
    price: 24,
  },
  {
    id: 'chelbessa',
    name: 'Ethiopia Yirgacheffe Chelbessa',
    origin: 'Ethiopia',
    process: 'Washed',
    grade: 'Grade 1',
    organic: true,
    notes: 'Notes of Citrus, Very Floral, Brown Sugar Sweetness.',
    price: 23,
  },
  {
    id: 'chelchele',
    name: 'Ethiopia Yirgacheffe Chelchele',
    origin: 'Ethiopia',
    process: 'Natural',
    grade: 'Grade 2',
    organic: true,
    notes: 'Notes of Dried Dark Berries, Black Tea, Dark Chocolate, and Vanilla.',
    price: 22,
  },
  {
    id: 'huehuetenango',
    name: 'Guatemala Huehuetenango',
    origin: 'Guatemala',
    process: 'Washed',
    grade: 'Fair-Trade Organic',
    organic: true,
    notes: 'Notes of Chocolate, Graham Cracker, Citrus, and Brown Sugar.',
    price: 20,
  },

  // --- Non-organic offerings ---
  {
    id: 'nyeri-gatomboya',
    name: 'Kenya Nyeri Gatomboya',
    origin: 'Kenya',
    process: 'Washed',
    organic: false,
    roastersFav: true,
    notes:
      'A WONDERFUL COFFEE! Dynamic flavor profile of blackberry jam, delicate ' +
      'florals, with a lingering sweetness throughout the cup.',
    price: 24,
  },
  {
    id: 'mundo-maya',
    name: 'Mexico Mundo Maya',
    origin: 'Mexico',
    process: 'Natural',
    organic: false,
    notes:
      'Super funky coffee. Very winey and fruit-forward, with prominent ' +
      'fermentation notes. Cranberry and raspberry are at the front the entire time.',
    price: 25,
  },
  {
    // The source list gives no process for this one. Left unset; CoffeeCard
    // falls back to "Single Origin" for the tile, pending Tyler's correction.
    id: 'dambi-uddo',
    name: 'Ethiopia Guji Dambi Uddo',
    origin: 'Ethiopia',
    organic: false,
    notes:
      'Ripe berry notes, dark, caramelized sweetness. Blueberry and blackberry, ' +
      'juicy acidity, clove oil, fresh mint, fragrant floral note, soft bittersweetness.',
    price: 25,
  },
  {
    id: 'strawberry',
    name: 'Colombia Strawberry Co-ferment',
    origin: 'Colombia',
    process: 'Co-Ferment',
    organic: false,
    sizeNote: '8 oz only',
    notes:
      'Limited supply, from our friends over at Forest Coffee. One of the wildest ' +
      'coffees I have tried. Notes of chocolate-covered strawberries, tangy ' +
      'sweet-and-sour strawberry candy, and bright acidity weave between one ' +
      'another in the cup.',
    price: 28,
  },
  {
    id: 'banana',
    name: 'Colombia Pink Bourbon Cake, Banana Co-Ferment',
    origin: 'Colombia',
    process: 'Co-Ferment',
    organic: false,
    sizeNote: '8 oz only',
    notes:
      'Another limited supply coffee we have the privilege of carrying, thanks to ' +
      'Forest Coffee. This one is wild. Notes of original bubblegum, wedding cake ' +
      'snow-cone, and banana Laffy Taffy come through the cup. This one has such a ' +
      'candy-like sweetness, it makes you wonder if it’s actually coffee you’re sipping on!',
    price: 28,
  },
];
