# Edem's Eatery - Restaurant Website

## 🚀 Project Overview
A stunning single-page restaurant website for Edem's Eatery, featuring authentic Ghanaian cuisine in Liverpool, NSW. Built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion for beautiful animations.

## ✨ Features
- **Modern, Responsive Design**: Fully responsive layout that looks great on all devices
- **Shimmer & Glow Effects**: Beautiful visual effects throughout the site
- **Smooth Animations**: Powered by Framer Motion for fluid interactions
- **Interactive Components**: 
  - Sticky navigation with mobile menu
  - Animated hero section with floating particles
  - Tab-based menu system
  - Image gallery with lightbox
  - Auto-rotating review carousel
  - Interactive Google Maps integration
  - Floating order button with pulse animation

## 🛠️ Technologies Used
- **Next.js 15** (with Turbopack)
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Intersection Observer** for scroll animations
- **Lucide React** for icons

## 📦 Installation & Setup

1. **Navigate to the project directory:**
   ```bash
   cd edems-eatery
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:3000
   ```

## 🏗️ Build for Production

To create a production build:
```bash
npm run build
```

To run the production build:
```bash
npm start
```

## 📁 Project Structure
```
edems-eatery/
├── app/
│   ├── globals.css       # Global styles and custom animations
│   ├── layout.tsx        # Root layout with metadata
│   └── page.tsx          # Main page component
├── components/
│   ├── Navigation.tsx    # Sticky navigation bar
│   ├── Hero.tsx          # Hero section with animations
│   ├── About.tsx         # About section
│   ├── Menu.tsx          # Interactive menu with tabs
│   ├── Gallery.tsx       # Image gallery with lightbox
│   ├── Reviews.tsx       # Customer reviews carousel
│   ├── Location.tsx      # Location, hours, and contact
│   ├── Footer.tsx        # Footer with links
│   └── FloatingOrderButton.tsx # Floating CTA button
└── public/               # Static assets
```

## 🎨 Design Features
- **Color Scheme:**
  - Primary: Deep Brown (#3E2723)
  - Secondary: Gold/Yellow (#FFC107)
  - Accent: Green (#4CAF50)
  
- **Animations:**
  - Shimmer effects on hover
  - Glow effects on buttons and text
  - Smooth scroll animations
  - Floating particle effects
  - Page element fade-ins on scroll

## 📱 Mobile Responsive
The website is fully responsive with:
- Mobile-first design approach
- Hamburger menu for mobile navigation
- Touch-friendly interface
- Optimized images and performance

## 🔧 Customization
To customize the website:
1. **Update content:** Edit component files in `/components`
2. **Modify colors:** Update the color scheme in `tailwind.config.ts`
3. **Change animations:** Adjust animation settings in `globals.css`
4. **Update metadata:** Edit SEO information in `app/layout.tsx`

## 📄 License
This project was created for Edem's Eatery restaurant.

## 🌐 Live Demo
Visit the development server at: http://localhost:3000

---

Created with ❤️ for Edem's Eatery - Authentic Ghanaian Cuisine