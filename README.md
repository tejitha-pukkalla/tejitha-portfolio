# 🚀 Tejitha Pukkalla — Developer Portfolio

A stunning, production-grade developer portfolio built with **React + Vite**, **Framer Motion**, and **Tailwind CSS**. Designed to impress recruiters in 2026.

---

## ✨ Features

- **Dark, futuristic UI** with acid green / plasma purple / ice blue color system
- **Custom cursor** with smooth lag animation
- **Scroll progress indicator** (gradient bar at top)
- **Typing animation** for role titles in hero
- **Floating tech icons** with parallax animation
- **Animated background orbs** with glow effects
- **Glassmorphism cards** throughout all sections
- **Skill bars** with intersection-observer triggered animations
- **Project cards** with hover reveal, status badges, expand/collapse
- **Interactive experience timeline** (click to expand details)
- **Animated contact form** with simulated submit state
- **Lazy-loaded sections** for performance
- **Fully responsive** (mobile, tablet, desktop)
- **SEO meta tags** in index.html
- **Grid pattern backgrounds** with custom CSS

---

## 📁 Project Structure

```
portfolio/
├── index.html                    # HTML entry point (fonts, SEO meta)
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # Tailwind + custom tokens
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx                  # React entry point
    ├── App.jsx                   # Root component, lazy loading
    ├── index.css                 # Global styles, custom cursor CSS
    ├── data.js                   # All portfolio content (edit this!)
    └── components/
        ├── CustomCursor.jsx      # Animated cursor dot + ring
        ├── ScrollProgress.jsx    # Top gradient progress bar
        ├── Navbar.jsx            # Sticky nav with mobile menu
        ├── Hero.jsx              # Hero + typing + floating icons
        ├── About.jsx             # About me + certifications
        ├── Skills.jsx            # Animated skill cards + bars
        ├── Projects.jsx          # Project grid with filter tabs
        ├── Experience.jsx        # Interactive timeline
        ├── Contact.jsx           # Social links + contact form
        └── Footer.jsx            # Footer with links
```

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Step 1 — Clone or extract the project
```bash
cd portfolio
```

### Step 2 — Install dependencies
```bash
npm install
```

### Step 3 — Start development server
```bash
npm run dev
```

Open **http://localhost:5173** in your browser.

### Step 4 — Build for production
```bash
npm run build
npm run preview  # Preview the production build
```

---

## 📦 Dependencies

```json
{
  "framer-motion": "^11.0.0",      // Animations & transitions
  "lucide-react": "^0.263.1",      // Icons
  "react": "^18.2.0",              // React
  "react-dom": "^18.2.0",          // React DOM
  "react-intersection-observer": "^9.5.3"  // Scroll-triggered animations
}
```

---

## 🎨 Customization Guide

### 1. Update your personal info
Edit **`src/data.js`** — this is the single source of truth for:
- `personalInfo` — name, bio, email, stats, social links
- `skills` — categories, items, proficiency levels
- `projects` — title, description, tags, GitHub/live links
- `experience` — roles, companies, highlights, tech stack
- `techIcons` — floating icons in hero section

### 2. Color System
Custom colors are defined in `tailwind.config.js`:
- `acid` — #00ff94 (primary green accent)
- `plasma` — #7b2fff (purple accent)
- `ice` — #00d4ff (blue accent)
- `ember` — #ff4d6d (red/pink accent)
- `void` — #020408 (background)
- `chrome` — #c8d6e5 (text)

### 3. Fonts
Loaded via Google Fonts in `index.html`:
- **Syne** — Display / headings
- **DM Sans** — Body text
- **JetBrains Mono** — Code labels, badges

### 4. Add your real image
In `About.jsx`, replace the avatar placeholder div with:
```jsx
<img src="/your-photo.jpg" alt="Tejitha" className="w-full h-full object-cover rounded-2xl" />
```
Place the image in the `public/` folder.

### 5. Connect real form submission
In `Contact.jsx`, replace the `setTimeout` mock in `handleSubmit` with your preferred service:
- **EmailJS** (free, client-side)
- **Formspree** (form endpoint)
- **Your own backend API**

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag the `dist/` folder to Netlify dashboard
```

### GitHub Pages
```bash
npm install gh-pages --save-dev
# Add to package.json scripts:
# "deploy": "gh-pages -d dist"
npm run build && npm run deploy
```

---

## 📄 License

MIT — free to use and modify for personal portfolio purposes.

---

**Built by Tejitha Pukkalla** · Full-Stack MERN Developer · 2026
