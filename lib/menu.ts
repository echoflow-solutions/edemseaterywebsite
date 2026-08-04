/**
 * Menu data, extracted from the Menu component so that other sections
 * (the popular-items teaser in particular) read the same prices instead of
 * hard-coding their own copies that silently drift out of date.
 *
 * Source of truth: the Edem's Eatery (Liverpool) storefront on Uber Eats.
 * Section order and item naming follow that listing. Note that these are
 * Uber Eats prices, which carry the platform's markup over direct orders.
 */

export type MenuItem = {
  name: string;
  price: string;
  description: string;
  image: string | null;
};

export type MenuSection = {
  id: string;
  label: string;
  items: MenuItem[];
};

export const menuData: Record<string, MenuItem[]> = {
  appetizers: [
    { name: 'Chinchinga', price: '$15.00', description: 'Three pieces. Made with Ghanaian style beef or chicken skewers seasoned and served with a spicy sauce.', image: '/media/kebab.jpg' },
    { name: 'Fried Yam', price: '$12.00', description: 'Made with thick cut yam slices fried until golden, served with a spicy dipping sauce.', image: null },
    { name: 'Spring Rolls', price: '$8.40', description: 'Three pieces. Crispy spring rolls stuffed with seasoned vegetables and a hint of local spices.', image: '/media/spring-rolls.jpg' },
    { name: 'Kelewele', price: '$12.00', description: 'Spiced fried ripped plantain and served with peanuts. Contains nuts.', image: '/media/beans-plantain.jpg' },
    { name: 'Kokko (Fried Plantain)', price: '$12.00', description: 'Made with plantain slices fried until golden, a classic West African appetiser.', image: null },
  ],
  mains: [
    { name: 'Jollof Rice', price: '$28.00', description: 'Made with Ghanaian style tomato rice infused with local spices, served with a garden salad.', image: '/media/jollof-chicken.jpg' },
    { name: 'Fried Rice', price: '$30.00', description: 'Made with Ghanaian style fried rice, vegetables and a hint of local spices.', image: '/media/fried-rice.jpg' },
    { name: 'Waakye', price: '$33.60', description: 'Made with Ghanaian rice and bean. Served with gari, spaghetti and tomato stew. Spicy.', image: '/media/waakye.jpg' },
    { name: 'Fufu', price: '$33.60', description: 'Made with pounded cassava and plantain, served with your choice of soup.', image: '/media/fufu.jpg' },
    { name: 'Omotuo', price: '$33.60', description: 'Made with soft, sticky rice balls served with a side of your choice.', image: null },
    { name: 'Red Red (Koko and Beans)', price: '$30.00', description: 'Made with fried ripped plantain served with black eyed peas stew sauce.', image: null },
    { name: 'Banku', price: 'Priced by add-ons', description: 'Made with fermented corn and cassava dough meal, served with your choice of side.', image: '/media/banku-tilapia.jpg' },
    { name: 'Sadza', price: '$33.60', description: 'Made with finely ground white maize, cooked to a smooth and thick consistency.', image: null },
    { name: 'Eba and Egusi', price: '$36.00', description: 'Traditional dish with eba and egusi soup, a savoury blend of ground melon seeds.', image: null },
    { name: 'Pounded yam and egusi', price: '$36.00', description: 'Traditional Nigerian dish with pounded yam and egusi, a savoury melon seed stew.', image: null },
    { name: 'Semolina fufu and egusi', price: '$36.00', description: 'Savoury semolina fufu paired with egusi, a rich melon seed stew, for a hearty and satisfying meal.', image: null },
    { name: 'Ampesi', price: '$42.00', description: 'A traditional Ghanaian dish made with boiled yam and plantain.', image: null },
  ],
  proteins: [
    { name: 'Tilapia', price: '$30.00', description: 'Tender tilapia, expertly prepared for a delicious protein-packed meal.', image: null },
    { name: 'Boiled Egg', price: '$3.60', description: 'Hard-boiled egg.', image: null },
    { name: 'Fried Fish', price: '$14.40', description: 'Crispy fish fillet, served hot.', image: null },
    { name: 'Beef', price: '$8.40', description: 'Tender beef, a rich protein choice.', image: null },
    { name: 'Lamb Cutlets', price: '$18.00', description: 'Tender lamb cutlets, full of flavour.', image: null },
    { name: 'Chicken', price: '$12.00', description: 'Tender chicken, expertly prepared for a delicious protein-packed meal.', image: null },
    { name: 'Goat (1)', price: '$12.00', description: 'Tender goat, a rich protein choice, perfect for diverse culinary creations.', image: null },
    { name: 'Grilled Whole Barramundi', price: '$42.00', description: 'Grilled barramundi, expertly prepared for a tender, flavourful experience.', image: null },
  ],
  desserts: [
    { name: 'Boflot (Puff Puff)', price: '$12.00', description: 'Three pieces. Made with light and fluffy fried dough balls with a hint of sweetness.', image: null },
    { name: 'Chocolate Strawberry Waffles', price: '$14.40', description: 'Made with waffles topped with bananas, strawberries and a scoop of vanilla ice cream.', image: '/media/waffles.jpg' },
    { name: 'Bisc White Waffles', price: '$14.40', description: 'Made with waffles topped with bananas, strawberries and a scoop of vanilla ice cream.', image: null },
  ],
  drinks: [
    { name: 'Juice', price: '$6.00', description: 'Refreshing purple juice in a bottle.', image: null },
    { name: 'Water', price: '$2.40', description: 'Refreshing water to accompany any meal.', image: null },
    { name: 'Soft Drink (375 ml)', price: '$5.40', description: 'Refreshing drink in a 375ml bottle.', image: null },
    { name: 'Soft Drink (500 ml)', price: '$5.40', description: 'Chilled 500ml bottle of soft drink, perfect with any meal.', image: null },
    { name: 'Malta', price: '$6.00', description: 'Rich malt drink.', image: null },
  ],
  kidsMenu: [
    { name: 'Chips + Chicken', price: '$18.00', description: "Tender chicken paired with crispy chips, perfect for a delightful kids' meal.", image: null },
    { name: 'Chips', price: '$9.60', description: 'Golden hot chips, crispy outside and fluffy inside, perfect for kids.', image: null },
  ],
  extras: [
    { name: 'Gari', price: '$2.40', description: 'Granulated cassava (gari), a traditional West African staple, ideal as an extra.', image: null },
    { name: 'Banku (1)', price: '$12.00', description: 'A traditional Ghanaian dish made from fermented corn and cassava dough.', image: null },
    { name: 'Extra rice', price: '$6.00', description: 'Perfectly cooked rice to complement any dish, adding a satisfying and filling side.', image: null },
    { name: 'Salad (M)', price: '$6.00', description: 'Fresh and vibrant salad, perfect as an extra to complement your meal.', image: null },
    { name: 'Salad (L)', price: '$8.40', description: 'Large salad, ideal as an extra to complement your meal.', image: null },
    { name: 'Sauce', price: '$2.40', description: 'A side of sauce to complement any dish, great for dipping or drizzling.', image: null },
    { name: 'Fufu (1)', price: '$12.00', description: 'A traditional West African staple, fufu is a smooth, dough-like side dish perfect alongside soups and stews.', image: null },
  ],
  smallTrays: [
    { name: 'Jollof Rice', price: 'Priced by add-ons', description: 'A vibrant rice dish with tomatoes, onions, and spices, offering a taste of Ghana.', image: null },
  ],
  snacks: [
    { name: 'Meat Pie', price: '$12.00', description: 'Minced beef and veggies pie, a savoury delight with a golden crust.', image: null },
  ],
};

export const menuSections: MenuSection[] = [
  { id: 'appetizers', label: 'APPETISERS', items: menuData.appetizers },
  { id: 'mains', label: 'MAIN COURSE', items: menuData.mains },
  { id: 'proteins', label: 'PROTEIN', items: menuData.proteins },
  { id: 'desserts', label: 'DESSERT', items: menuData.desserts },
  { id: 'drinks', label: 'DRINKS', items: menuData.drinks },
  { id: 'kidsMenu', label: 'KIDS', items: menuData.kidsMenu },
  { id: 'extras', label: 'EXTRAS', items: menuData.extras },
  { id: 'smallTrays', label: 'SMALL TRAYS', items: menuData.smallTrays },
  { id: 'snacks', label: 'SNACKS', items: menuData.snacks },
];

/**
 * Dishes highlighted in the popular-items teaser — the four "most liked"
 * items on the Uber Eats storefront. Names resolve against the menu above so
 * the teaser can never advertise a price the menu contradicts.
 *
 * Only mains and appetisers are searched: "Jollof Rice", "Banku" and "Fufu"
 * also appear under Small Trays and Extras at different prices, and a flat
 * lookup could silently pick the wrong one.
 */
const POPULAR_ITEM_NAMES = ['Jollof Rice', 'Fufu', 'Chinchinga', 'Waakye'];

const popularSearchPool: MenuItem[] = [...menuData.mains, ...menuData.appetizers];

export const popularItems: MenuItem[] = POPULAR_ITEM_NAMES.map((name) =>
  popularSearchPool.find((item) => item.name === name)
).filter((item): item is MenuItem => item !== undefined);
