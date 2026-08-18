/**
 * Menu data and pricing.
 *
 * Source of truth: "MENU BOOK - OFFICIAL (3)", dated 18 August 2026. These are
 * the restaurant's direct prices, not the marked-up delivery-platform prices.
 *
 * Some dishes are priced by the option chosen rather than by a flat figure —
 * a Jollof Rice costs $25 with chicken and $30 with fried fish — so an item's
 * price can come from its options. Prices are always derived here, never
 * accepted from the browser.
 */

export type MenuOptionChoice = {
  id: string;
  label: string;
  /** Used when the group sets the price outright. */
  priceCents?: number;
  /** Used when the group adds to the running total. */
  extraCents?: number;
};

export type MenuOptionGroup = {
  id: string;
  label: string;
  /** Short hint shown under the group heading. */
  hint?: string;
  /**
   * 'sets-price' — the chosen option becomes the item price.
   * 'adds-cost'  — the chosen option adds to the item price.
   * 'no-cost'    — a preference with no price effect.
   */
  effect: 'sets-price' | 'adds-cost' | 'no-cost';
  choices: MenuOptionChoice[];
};

type MenuItemInput = {
  name: string;
  price?: string;
  description: string;
  image: string | null;
  /** Every group requires a choice; optional extras are modelled as a "without" choice. */
  options?: MenuOptionGroup[];
};

export type MenuItem = Omit<MenuItemInput, 'price'> & {
  id: string;
  sectionId: string;
  /** Flat price in cents, or null when a 'sets-price' option group decides it. */
  priceCents: number | null;
};

export type MenuSection = {
  id: string;
  label: string;
  items: MenuItem[];
};

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const toCents = (price: string | undefined): number | null => {
  if (!price) return null;
  const match = /^\$(\d+)\.(\d{2})$/.exec(price);
  if (!match) return null;
  return Number(match[1]) * 100 + Number(match[2]);
};

export const formatCents = (cents: number): string => `$${(cents / 100).toFixed(2)}`;

const buildSection = (sectionId: string, items: MenuItemInput[]): MenuItem[] =>
  items.map(({ price, ...rest }) => ({
    ...rest,
    sectionId,
    id: `${sectionId}-${slugify(rest.name)}`,
    priceCents: toCents(price),
  }));

/* ------------------------------------------------------------------ */
/* Shared option groups                                                */
/* ------------------------------------------------------------------ */

/** Proteins offered with Jollof Rice and Fried Rice. */
const RICE_PROTEIN: MenuOptionGroup = {
  id: 'protein',
  label: 'Choose your protein',
  effect: 'sets-price',
  choices: [
    { id: 'chicken', label: 'Fried chicken', priceCents: 2500 },
    { id: 'grilled-chicken', label: 'Grilled chicken', priceCents: 2800 },
    { id: 'beef-stew', label: 'Beef stew', priceCents: 2800 },
    { id: 'lamb-chops', label: 'Lamb chops', priceCents: 2800 },
    { id: 'turkey', label: 'Turkey', priceCents: 2800 },
    { id: 'fried-fish', label: 'Fried fish', priceCents: 3000 },
  ],
};

/** The swallow served alongside a soup. Included in the soup price. */
const SWALLOW_CHOICE: MenuOptionGroup = {
  id: 'swallow',
  label: 'Choose your swallow',
  hint: 'Included with your soup',
  effect: 'no-cost',
  choices: [
    { id: 'fufu', label: 'Fufu' },
    { id: 'semolina-fufu', label: 'Semolina fufu' },
    { id: 'omotuo', label: 'Omotuo (rice balls)' },
    { id: 'pounded-yam', label: 'Pounded yam' },
    { id: 'eba', label: 'Eba' },
    { id: 'banku', label: 'Banku' },
    { id: 'kenkey', label: 'Kenkey' },
  ],
};

/** Light Soup and Peanut Soup share the same protein pricing. */
const SOUP_PROTEIN: MenuOptionGroup = {
  id: 'protein',
  label: 'Choose your protein',
  effect: 'sets-price',
  choices: [
    { id: 'beef', label: 'Beef', priceCents: 2800 },
    { id: 'chicken', label: 'Chicken', priceCents: 2800 },
    { id: 'goat', label: 'Goat', priceCents: 3000 },
  ],
};

/* ------------------------------------------------------------------ */
/* Menu                                                                */
/* ------------------------------------------------------------------ */

export const menuData: Record<string, MenuItem[]> = {
  appetizers: buildSection('appetizers', [
    { name: 'Chinchinga (Suya/Kebab)', price: '$12.00', description: 'Tender chunks of beef or chicken grilled to perfection, coated in a smoky, spicy rub. Ghanaian street food at its best.', image: '/media/kebab.jpg' },
    {
      name: 'Kelewele (Spiced Plantain)', price: '$10.00', image: '/media/beans-plantain.jpg',
      description: 'Ripe plantains marinated in ginger, pepper and aromatic spices, fried until golden. Sweet, spicy and fragrant.',
      options: [
        {
          id: 'peanuts', label: 'Peanuts on the side', effect: 'adds-cost',
          choices: [
            { id: 'without', label: 'Without peanuts', extraCents: 0 },
            { id: 'with', label: 'With peanuts', extraCents: 200 },
          ],
        },
      ],
    },
    { name: 'Spring Rolls', price: '$7.00', description: 'Golden rolls packed with seasoned vegetables and local spices, served with a tangy chilli dipping sauce.', image: '/media/spring-rolls.jpg' },
    { name: 'Kosua ne Meko', price: '$5.00', description: 'A boiled egg paired with fiery Ghanaian chilli sauce. Creamy richness followed by a spicy kick.', image: '/media/egg-chilli.jpg' },
    {
      name: 'Fried Yam or Cassava Chips', price: '$10.00', image: null,
      description: 'Thick-cut slices fried to a golden crisp, served with a zesty dipping sauce.',
      options: [
        {
          id: 'cut', label: 'Yam or cassava?', effect: 'no-cost',
          choices: [
            { id: 'yam', label: 'Yam' },
            { id: 'cassava', label: 'Cassava' },
          ],
        },
      ],
    },
    {
      name: 'Fried Yam or Cassava Chips + Chilli Turkey', price: '$18.00', image: null,
      description: 'Golden chips paired with turkey wings seasoned in Ghanaian herbs, slow-cooked then flame-grilled, with our signature spicy dipping sauce.',
      options: [
        {
          id: 'cut', label: 'Yam or cassava?', effect: 'no-cost',
          choices: [
            { id: 'yam', label: 'Yam' },
            { id: 'cassava', label: 'Cassava' },
          ],
        },
      ],
    },
    { name: 'Suya Spiced Mini Drumettes (6)', price: '$12.00', description: 'Chicken drumettes marinated in authentic suya spices — ground peanuts, paprika and Ghanaian herbs — grilled until smoky and crisp. Contains nuts.', image: null },
    { name: 'Sweet Potato Chips', price: '$10.00', description: 'Crispy golden sweet potato fries, lightly seasoned, with a warm caramel-like sweetness and our house dipping sauce.', image: null },
  ]),

  mains: buildSection('mains', [
    { name: 'Waakye (Rice + Beans)', price: '$28.00', description: 'Rice and black-eyed beans slow-cooked to an earthy blend, served with gari, spaghetti, beef stew, shito and fresh salad.', image: '/media/waakye.jpg' },
    { name: 'Jollof Rice', description: 'Rice cooked in a rich, spiced tomato sauce with peppers, onions and herbs, served with a fresh garden salad.', image: '/media/jollof-chicken.jpg', options: [RICE_PROTEIN] },
    { name: 'Fried Rice', description: 'Fragrant rice stir-fried with colourful vegetables and local spices, served with a side of green chilli.', image: '/media/fried-rice.jpg', options: [RICE_PROTEIN] },
    {
      name: 'Rice + Stew', image: null,
      description: 'Jasmine rice with tender protein simmered in a rich tomato sauce, served with a crisp garden salad.',
      options: [
        {
          id: 'protein', label: 'Choose your protein', effect: 'sets-price',
          choices: [
            { id: 'chicken-stew', label: 'Chicken stew', priceCents: 2500 },
            { id: 'beef-stew', label: 'Beef stew', priceCents: 2800 },
            { id: 'goat', label: 'Goat', priceCents: 3000 },
          ],
        },
      ],
    },
    { name: 'Angwa Moo (Braised Rice)', price: '$25.00', description: 'Traditional Ghanaian braised rice cooked in aromatic oil with onions, warm and deeply comforting.', image: null },
    { name: 'Ampesi + Kontomire', price: '$35.00', description: 'Boiled yam or plantain served with a hearty spinach stew cooked with beef, eggs, melon seeds and spices.', image: null },
    { name: 'Red Red (Kokko + Beans)', price: '$25.00', description: 'Sweet ripe plantains fried until caramelised, served with a rich black-eyed beans stew in a spiced tomato base.', image: null },
    { name: 'Sadza / Ugali', price: '$28.00', description: 'Finely ground white maize cooked to a smooth, firm consistency, served with rich meat stew and sautéed greens.', image: null },
  ]),

  soups: buildSection('soups', [
    { name: 'Light Soup', description: 'A classic Ghanaian broth of tomatoes, onions, fresh herbs and warming spices, slow-simmered until clean and aromatic.', image: '/media/fufu.jpg', options: [SWALLOW_CHOICE, SOUP_PROTEIN] },
    { name: 'Peanut Soup', description: 'Rich and creamy, made from ground peanuts simmered with tomatoes and spices. Contains nuts.', image: null, options: [SWALLOW_CHOICE, SOUP_PROTEIN] },
    {
      name: 'Okra Soup', image: null,
      description: 'Ghanaian-style okra stew with fresh okra, tomatoes, peppers and aromatic spices, slow-simmered to a silky texture.',
      options: [
        SWALLOW_CHOICE,
        {
          id: 'protein', label: 'Choose your protein', effect: 'sets-price',
          choices: [
            { id: 'beef', label: 'Beef', priceCents: 3000 },
            { id: 'fish', label: 'Fish', priceCents: 3200 },
            { id: 'assorted', label: 'Assorted meat', priceCents: 3500 },
          ],
        },
      ],
    },
    {
      name: 'Tilapia or Catfish Soup', price: '$30.00', image: null,
      description: 'Fresh tilapia or catfish simmered in a rich, spicy tomato and pepper broth with local herbs and a touch of palm oil.',
      options: [
        SWALLOW_CHOICE,
        {
          id: 'fish', label: 'Choose your fish', effect: 'no-cost',
          choices: [
            { id: 'tilapia', label: 'Tilapia' },
            { id: 'catfish', label: 'Catfish' },
          ],
        },
      ],
    },
    { name: 'Egusi Stew', price: '$30.00', description: 'Ground melon seeds simmered into a thick, nutty stew with tomatoes, peppers, leafy greens and tender meat or fish.', image: null, options: [SWALLOW_CHOICE] },
  ]),

  grill: buildSection('grill', [
    { name: 'Grilled Tilapia', price: '$25.00', description: 'Whole tilapia marinated in herbs, spices, garlic and ginger, then grilled to smoky perfection. Crispy outside, tender within.', image: '/media/banku-tilapia.jpg' },
    { name: 'Grilled Barramundi', price: '$35.00', description: 'Fresh barramundi seasoned with herbs and spices and grilled until crisp outside and juicy inside.', image: null },
  ]),

  desserts: buildSection('desserts', [
    {
      name: 'Waffles', price: '$12.00', image: '/media/waffles.jpg',
      description: 'Warm waffles served with a scoop of ice cream.',
      options: [
        {
          id: 'flavour', label: 'Choose your flavour', effect: 'no-cost',
          choices: [
            { id: 'cookies-cream', label: 'Cookies & cream + ice cream' },
            { id: 'dubai-chocolate', label: 'Dubai chocolate + ice cream' },
            { id: 'biscwhite', label: 'Biscwhite + ice cream' },
            { id: 'strawberry-banana', label: 'Strawberries, bananas & chocolate + ice cream' },
          ],
        },
      ],
    },
    {
      name: 'Puff Puff (Boflot)', price: '$12.00', image: null,
      description: 'Light, fluffy fried dough balls with a hint of sweetness.',
      options: [
        {
          id: 'flavour', label: 'Choose your flavour', effect: 'no-cost',
          choices: [
            { id: 'cookies-cream', label: 'Cookies & cream' },
            { id: 'dubai-chocolate', label: 'Dubai chocolate' },
            { id: 'biscoff', label: 'Biscoff' },
            { id: 'cinnamon-sugar', label: 'Cinnamon sugar' },
          ],
        },
      ],
    },
    { name: 'Meat Pie', price: '$10.00', description: 'Flaky golden pastry filled with savoury minced beef, onions and spices.', image: null },
    { name: 'Ghana Condensed Toffee & Nut Toffee', price: '$5.00', description: 'Sweet, creamy toffee made from condensed milk, layered with caramelised nuts. Contains nuts.', image: null },
  ]),

  addons: buildSection('addons', [
    { name: 'Fried Chicken', price: '$10.00', description: 'Golden, crispy chicken pieces, juicy inside with a satisfying crunch.', image: null },
    { name: 'Grilled Chicken', price: '$10.00', description: 'Tender chicken marinated in rich spices and flame-grilled for a smoky finish.', image: null },
    { name: 'Mini Drumettes (6)', price: '$12.00', description: 'Bite-sized chicken wings coated in bold spices and cooked until crisp.', image: null },
    { name: 'Turkey', price: '$10.00', description: 'Succulent turkey pieces seasoned with traditional spices and slow-cooked for tenderness.', image: null },
    { name: 'Goat', price: '$10.00', description: 'Rich, slow-cooked goat meat infused with aromatic spices.', image: null },
    { name: 'Beef', price: '$7.00', description: 'Tender, well-seasoned beef cooked to bring out a bold, savoury richness.', image: null },
    { name: 'Fried Fish', price: '$15.00', description: 'Crispy, golden fish with a seasoned coating and flaky, tender inside.', image: null },
    { name: 'Tilapia', price: '$25.00', description: 'Fresh, flavourful tilapia cooked to perfection — juicy, tender and lightly seasoned.', image: null },
    { name: 'Barramundi', price: '$35.00', description: 'Grilled barramundi seasoned with herbs and spices, smoky with a tender, flaky texture.', image: null },
    { name: 'Lamb Cutlet', price: '$15.00', description: 'Juicy, tender lamb cutlet marinated in aromatic spices and grilled.', image: null },
    { name: 'Fried Plantain', price: '$10.00', description: 'Sweet ripe plantains fried until golden and caramelised.', image: null },
    { name: 'Boiled Egg', price: '$3.00', description: 'A perfectly cooked egg, great as a light add-on.', image: null },
  ]),

  drinks: buildSection('drinks', [
    { name: 'Sobolo', price: '$5.00', description: 'A vibrant hibiscus drink flavoured with natural spices. Lightly sweet and cooling.', image: null },
    { name: 'Emudro', price: '$5.00', description: 'Traditional Ghanaian herbal drink brewed with natural roots and spices. Bold and earthy.', image: null },
    { name: 'Malt', price: '$5.00', description: 'A rich, non-alcoholic malt beverage with a smooth, slightly sweet taste.', image: null },
    { name: 'Soft Drink (Can)', price: '$3.00', description: 'Classic canned soft drinks, chilled.', image: null },
    { name: 'Soft Drink (Large)', price: '$4.50', description: 'Your favourite soft drinks in a larger bottle.', image: null },
    { name: 'Bundaberg', price: '$4.50', description: 'Premium brewed soft drink made with real ingredients.', image: null },
    { name: 'Energy Drink', price: '$4.50', description: 'High-energy drink with a bold taste and a caffeine boost.', image: null },
    { name: 'Mount Franklin Water', price: '$3.50', description: 'Australian spring water with a clean, crisp finish.', image: null },
    { name: 'Active Water', price: '$2.00', description: 'Pure, crisp mineral water for everyday refreshment.', image: null },
  ]),
};

export const menuSections: MenuSection[] = [
  { id: 'appetizers', label: 'APPETISERS', items: menuData.appetizers },
  { id: 'mains', label: 'MAIN COURSE', items: menuData.mains },
  { id: 'soups', label: 'SWALLOWS & SOUPS', items: menuData.soups },
  { id: 'grill', label: 'FROM THE GRILL', items: menuData.grill },
  { id: 'desserts', label: 'DESSERTS', items: menuData.desserts },
  { id: 'addons', label: 'ADD ONS', items: menuData.addons },
  { id: 'drinks', label: 'DRINKS', items: menuData.drinks },
];

const itemsById = new Map<string, MenuItem>(
  menuSections.flatMap((section) => section.items.map((item) => [item.id, item]))
);

export const findMenuItem = (id: string): MenuItem | undefined => itemsById.get(id);

/* ------------------------------------------------------------------ */
/* Pricing                                                             */
/* ------------------------------------------------------------------ */

/** A chosen option per group: { groupId: choiceId }. */
export type OptionSelections = Record<string, string>;

export const hasOptions = (item: MenuItem): boolean => (item.options?.length ?? 0) > 0;

/**
 * Price an item for a given set of choices. Returns null when the selection is
 * incomplete or invalid — callers must treat that as "cannot be ordered".
 */
export const priceSelection = (
  item: MenuItem,
  selections: OptionSelections
): number | null => {
  let base = item.priceCents;
  let extra = 0;

  for (const group of item.options ?? []) {
    const choiceId = selections[group.id];
    const choice = group.choices.find((candidate) => candidate.id === choiceId);
    if (!choice) return null; // every group must be answered
    if (group.effect === 'sets-price') {
      if (choice.priceCents === undefined) return null;
      base = choice.priceCents;
    } else if (group.effect === 'adds-cost') {
      extra += choice.extraCents ?? 0;
    }
  }

  // Reject stray groups that are not on this item.
  const known = new Set((item.options ?? []).map((group) => group.id));
  if (Object.keys(selections).some((key) => !known.has(key))) return null;

  if (base === null) return null;
  return base + extra;
};

/** Cheapest price an item can be ordered for, used for "from $X" labels. */
export const minPriceCents = (item: MenuItem): number | null => {
  let base = item.priceCents;
  for (const group of item.options ?? []) {
    if (group.effect !== 'sets-price') continue;
    const prices = group.choices
      .map((choice) => choice.priceCents)
      .filter((value): value is number => value !== undefined);
    if (prices.length === 0) return null;
    base = Math.min(...prices);
  }
  return base;
};

/** Price as shown on a menu card. */
export const displayPrice = (item: MenuItem): string => {
  const min = minPriceCents(item);
  if (min === null) return 'Ask in store';
  const varies = (item.options ?? []).some((group) => group.effect === 'sets-price');
  return varies ? `from ${formatCents(min)}` : formatCents(min);
};

/** Human-readable summary of a selection, e.g. "Fufu · Goat". */
export const describeSelections = (
  item: MenuItem,
  selections: OptionSelections
): string =>
  (item.options ?? [])
    .map((group) => group.choices.find((choice) => choice.id === selections[group.id])?.label)
    .filter((label): label is string => Boolean(label))
    .join(' · ');

/**
 * Dishes highlighted in the popular-items teaser.
 * Scoped to mains, appetisers and soups so duplicate names elsewhere
 * (Tilapia and Grilled Chicken also appear under Add Ons) cannot be matched.
 */
const POPULAR_ITEM_NAMES = ['Jollof Rice', 'Waakye (Rice + Beans)', 'Chinchinga (Suya/Kebab)', 'Light Soup'];

const popularSearchPool: MenuItem[] = [
  ...menuData.mains,
  ...menuData.appetizers,
  ...menuData.soups,
];

export const popularItems: MenuItem[] = POPULAR_ITEM_NAMES.map((name) =>
  popularSearchPool.find((item) => item.name === name)
).filter((item): item is MenuItem => item !== undefined);
