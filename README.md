# Ecommerce Modernization Project

A high-performance, fully responsive ecommerce web application built with **Next.js 15** and **React 19**. 

This project represents a complete architectural transformation, migrating a traditional multi-page static site (HTML/JS/CSS) into a modern, component-based **Single Page Application (SPA)**.

## 🚀 Features

### **1. Core Functionality**
- **Dynamic Catalog**: Interactive product listing with real-time filtering by category, brand, features, condition, and star rating.
- **Advanced Search**: Global search functionality in the navbar that provides instant results on the catalog page.
- **Product Details**: Dynamic routing (`/webdetail?id=...`) that loads comprehensive product information, including deterministic supplier selection and related product recommendations.
- **Shopping Cart**: Full cart lifecycle management including item addition/removal, "Save for Later" functionality, and automatic calculation of subtotals, taxes, and shipping.
- **Persistent Wishlist**: A dedicated "Saved Items" section that persists user preferences using `localStorage`.

### **2. Modern Architecture**
- **Next.js App Router**: Utilizes the latest Next.js 15 routing for optimized performance and SEO.
- **Component-Based UI**: Highly modular React components (`Navbar`, `Footer`, `Weblist`, etc.) with encapsulated styling.
- **Client-Side Navigation**: Instant transitions between pages using the Next.js `Link` component and `useRouter` hook, eliminating page reloads.

### **3. Design & Responsiveness**
- **Pixel-Perfect Desktop View**: Preserves the original high-fidelity design for large screens (1440px+).
- **Fully Responsive**: Custom-tailored layouts for tablets and mobile devices using CSS Grid, Flexbox, and fluid typography.
- **Touch-Friendly UI**: Optimized button sizes and interactive elements for mobile users.

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Library**: [React 19](https://react.js.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Standard CSS (within components) & [Tailwind CSS](https://tailwindcss.com/)
- **Persistence**: Browser `localStorage` API

## 📂 Project Structure (my-app)

```text
my-app/
├── app/
│   ├── components/       # Modular React components (Navbar, Weblist, etc.)
│   ├── saved/            # Wishlist route
│   ├── webcart/          # Shopping cart route
│   ├── webdetail/        # Product detail route
│   ├── weblist/          # Product catalog route
│   ├── globals.css       # Global styles and Tailwind imports
│   ├── layout.tsx        # Root layout with Navbar/Footer integration
│   └── page.tsx          # Home page content
├── public/               # Static assets (images, logos, svgs)
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## 🚦 Getting Started

### **1. Prerequisites**
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### **2. Installation**
Navigate to the project directory and install the dependencies:
```bash
cd my-app
npm install
```

### **3. Run Development Server**
Start the application in development mode:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📝 Modernization Summary

The migration process involved:
1. **Component Extraction**: Breaking down monolithic HTML files into reusable React components.
2. **Logic Migration**: Porting imperative JavaScript (DOM manipulation) into declarative React state management (`useState`, `useMemo`, `useEffect`).
3. **Routing Setup**: Implementing a clean, dynamic URL structure using Next.js file-based routing.
4. **Asset Optimization**: Moving all static images to the `public/` directory and updating paths for optimized loading.
5. **Responsive Overhaul**: Adding comprehensive media queries to ensure a seamless experience on all device types.

---
*Created as part of the Ecommerce App Modernization effort.*
