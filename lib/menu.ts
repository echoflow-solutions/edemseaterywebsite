/**
 * Menu data, extracted from the Menu component so that other sections
 * (the popular-items teaser in particular) read the same prices instead of
 * hard-coding their own copies that silently drift out of date.
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
    { name: 'Chinchinga (Suya/Kebab)(3pcs)', price: '$10.00', description: 'Ghanaian-style beef or chicken skewers seasoned and served with a spicy sauce', image: '/media/kebab.jpg' },
    { name: 'Yam Chips (6pcs)', price: '$10.00', description: 'Thick-cut yam slices fried until golden, served with a spicy dipping sauce', image: null },
    { name: 'Spring Rolls (5pcs)', price: '$7.00', description: 'Crispy spring rolls stuffed with seasoned vegetables and a hint of local spices', image: '/media/spring-rolls.jpg' },
    { name: 'Kelewele', price: '$10.00', description: 'Spiced fried ripped plantain', image: '/media/beans-plantain.jpg' },
    { name: 'Kosua ne Meko', price: '$5.00', description: 'Boiled egg with chilli', image: '/media/egg-chilli.jpg' },
  ],
  kidsMenu: [
    { name: 'Chips', price: '$8.00', description: 'Crispy fried potato chips', image: null },
    { name: 'Chicken + Chips', price: '$15.00', description: 'Crispy fried potato chips + Fried chicken', image: null },
  ],
  mains: [
    { name: 'Jollof Rice', price: '$25.00', description: 'Ghanaian style tomato rice infused with local spices, served with garden salad', image: '/media/jollof-chicken.jpg' },
    { name: 'Fried Rice', price: '$25.00', description: 'Ghanaian-style fried rice contains vegetables and a hint of local spices', image: '/media/fried-rice.jpg' },
    { name: 'Waakye (Rice + Beans)', price: '$28.00', description: 'A unique Ghanaian rice and bean dish. Served with gari, spaghetti, beef stew', image: '/media/waakye.jpg' },
    { name: 'Banku', price: '$28.00', description: 'Fermented corn and cassava dough meal, served with a selected side of your choice', image: '/media/banku-tilapia.jpg' },
    { name: 'Kenkey', price: '$28.00', description: 'Kenkey is a fermented maize dough that is a staple food in Ghana, served with fish and pepper', image: null },
    { name: 'Fufu', price: '$28.00', description: 'Pounded cassava and plantain, served with a selected soup of choice', image: '/media/fufu.jpg' },
    { name: 'Ampesi + Kontomire', price: '$35.00', description: 'Kontomire stew is a popular and healthy Ghanaian dish made with cocoyam leaves', image: null },
    { name: 'Omotuo', price: '$28.00', description: 'Soft, sticky rice balls served with a rich side of your choice', image: null },
    { name: 'Red Red (Kokoo + Beans)', price: '$25.00', description: 'Fried ripped plantain served with black eyed peas stew (sauce)', image: null },
    { name: 'Sadza/Ugali', price: '$28.00', description: 'A staple African dish made from finely ground white maize, cooked to a smooth consistency', image: null },
    { name: 'Semolina Fufu + Egusi Stew', price: '$30.00', description: 'Semolina fufu is a thick, dough-like dish made from semolina flour and water', image: null },
    { name: 'Eba + Egusi Stew', price: '$30.00', description: 'Eba (garri) is a starchy food made from dried cassava. Spiced spinach is cooked with egusi', image: null },
    { name: 'Pounded Yam + Egusi Stew', price: '$30.00', description: 'Traditional Nigerian dish with pounded yam and egusi, a savory melon seed stew', image: null },
    { name: 'White Rice + Beef Stew', price: '$28.00', description: 'Jazmine rice served with beef stew + garden salad', image: null },
  ],
  proteins: [
    { name: 'Boiled Egg', price: '$3.00', description: 'Perfect protein addition to any meal', image: null },
    { name: 'Chicken', price: '$10.00', description: 'Succulent grilled or fried chicken', image: null },
    { name: 'Beef Stew', price: '$7.00', description: 'Rich and flavorful beef stew', image: null },
    { name: 'Goat', price: '$10.00', description: 'Tender goat meat', image: null },
    { name: 'Lamb Cutlets', price: '$15.00', description: 'Juicy lamb cutlets grilled to perfection', image: null },
    { name: 'Ghanaian Meat Pie', price: '$10.00', description: 'Savory pastry filled with spiced meat', image: null },
    { name: 'Fried Fish', price: '$15.00', description: 'Crispy fried fish fillet', image: null },
    { name: 'Grilled Tilapia', price: '$25.00', description: 'Fresh tilapia grilled with Ghanaian spices', image: null },
    { name: 'Grilled Barramundi', price: '$35.00', description: 'Premium barramundi grilled to perfection', image: null },
  ],
  desserts: [
    { name: 'Boflot (Puff Puff)(3pcs)', price: '$10.00', description: 'Light and fluffy fried dough balls with a hint of sweetness, perfect for dessert', image: null },
    { name: 'Waffles', price: '$12.00', description: 'Golden crispy waffles served with syrup', image: '/media/waffles.jpg' },
  ],
  drinks: [
    { name: 'Water', price: '$2.00', description: 'Refreshing bottled water', image: null },
    { name: 'Softdrink (Cans)', price: '$3.00', description: 'Assorted canned soft drinks', image: null },
    { name: 'Softdrink (Bottle)', price: '$4.50', description: 'Assorted bottled soft drinks', image: null },
    { name: 'Juice', price: '$4.00', description: 'Fresh fruit juice', image: null },
    { name: 'Malt', price: '$4.50', description: 'Rich malt drink', image: null },
    { name: 'Sobolo (Hibiscus Drink)', price: '$4.00', description: 'Traditional hibiscus drink', image: null },
    { name: 'Emudro (Ginger Drink)', price: '$4.00', description: 'Spicy ginger drink', image: null },
  ],
};

export const menuSections: MenuSection[] = [
  { id: 'appetizers', label: 'APPETISERS', items: menuData.appetizers },
  { id: 'kidsMenu', label: 'KIDS MENU', items: menuData.kidsMenu },
  { id: 'mains', label: 'MAIN COURSE', items: menuData.mains },
  { id: 'proteins', label: 'PROTEIN', items: menuData.proteins },
  { id: 'desserts', label: 'DESSERT', items: menuData.desserts },
  { id: 'drinks', label: 'DRINKS', items: menuData.drinks },
];

const allMenuItems: MenuItem[] = Object.values(menuData).flat();

/**
 * Dishes highlighted in the popular-items teaser. Names are resolved against
 * the menu above so the teaser can never advertise a price the menu contradicts.
 */
const POPULAR_ITEM_NAMES = [
  'Grilled Tilapia',
  'Yam Chips (6pcs)',
  'Waakye (Rice + Beans)',
  'Fried Rice',
];

export const popularItems: MenuItem[] = POPULAR_ITEM_NAMES.map((name) =>
  allMenuItems.find((item) => item.name === name)
).filter((item): item is MenuItem => item !== undefined);
