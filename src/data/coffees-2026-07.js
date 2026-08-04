// Stancraft Coffee — current offerings, transcribed from the RETAIL sheet of
// docs/Stancraft_Coffee_Co._Prices_July_2026.xlsx (July 2026).
//
// `profile` is the sheet's own "Flavor Profile" column — mellow / curious /
// funky — which is what the Coffees section filters on.
//
// `sizes` is the variant ladder. Nine coffees ship in three sizes; the two
// co-ferments ship only as an 8 oz "ULTRA". Retail prices only — the sheet's
// three wholesale tiers are private and must never render.
//
// Size labels: 227 g = 8 oz, 340 g = 12 oz, 907 g = 2 lb, 2268 g = 5 lb.

const THREE = (a, b, c) => [
  { label: '12 oz', price: a },
  { label: '2 lb', price: b },
  { label: '5 lb', price: c },
];

const ULTRA = [{ label: '8 oz', price: 28 }];

export const COFFEES = [
  // --- Mellow ---
  { id: 'alta-mogiana', name: 'Brazilian Alta Mogiana', origin: 'Brazil',
    process: 'Natural', profile: 'mellow', sizes: THREE(16, 36, 82) },
  { id: 'huehuetenango', name: 'Guatemala Huehuetenango', origin: 'Guatemala',
    process: 'Washed', profile: 'mellow', sizes: THREE(20, 40, 92) },

  // --- Curious ---
  { id: 'colombia-washed', name: 'Colombia', origin: 'Colombia',
    process: 'Washed', profile: 'curious', sizes: THREE(18, 38, 88) },
  { id: 'chechele', name: 'Ethiopia Yirgacheffe (Chechele)', origin: 'Ethiopia',
    process: 'Natural', profile: 'curious', sizes: THREE(22, 44, 100) },
  { id: 'chelbessa', name: 'Ethiopia Yirgacheffe (Chelbessa)', origin: 'Ethiopia',
    process: 'Washed', profile: 'curious', sizes: THREE(22, 44, 100) },
  { id: 'nyeri', name: 'Kenya Nyeri', origin: 'Kenya',
    process: 'Washed', profile: 'curious', sizes: THREE(23, 46, 104) },
  // Process not given in the sheet; carried over from the previous data file.
  { id: 'haraz', name: 'Yemen Sharqui Haraz', origin: 'Yemen',
    process: 'Natural', profile: 'curious', sizes: THREE(32, 68, 148) },

  // --- Funky ---
  { id: 'koke', name: 'Ethiopia Yirgacheffe (Koke)', origin: 'Ethiopia',
    process: 'Honey', profile: 'funky', sizes: THREE(24, 48, 108) },
  { id: 'mundo-maya', name: 'Mexico Mundo Maya', origin: 'Mexico',
    process: 'Natural', profile: 'funky', sizes: THREE(25, 52, 116) },
  { id: 'banana', name: 'Colombia Pink Bourbon Cake Banana', origin: 'Colombia',
    process: 'Co-Ferment', profile: 'funky', sizes: ULTRA },
  { id: 'strawberry', name: 'Colombia Juicy Strawberry', origin: 'Colombia',
    process: 'Co-Ferment', profile: 'funky', sizes: ULTRA },
];
