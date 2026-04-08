# 🚀 Gushwork Web Developer Assignment
### Submitted by **Tajammul Khan** · Associate Developer @ Tibil Solutions · Frontend Developer

---

## 🔗 Live Preview

> 💼 [My Portfolio](https://tajammulkhan-portfolio.vercel.app/) &nbsp;|&nbsp; 🐙 [GitHub](https://github.com/TajammulKhan957) &nbsp;|&nbsp; 🔗 [LinkedIn](https://linkedin.com/in/tajammul-khan-a81bb0200)

---

## 📌 Overview

This project is a **pixel-perfect, fully responsive** web page built as part of the Gushwork Web Developer technical assessment. The implementation faithfully follows the provided Figma design specifications while delivering clean, maintainable, and performant vanilla code — **zero frameworks, zero libraries**.

I bring **2+ year of production frontend experience** at Tibil Solutions, where I've built and shipped real-world applications including a government platform ([kisanemitra.gov.in](https://kisanemitra.gov.in)) used at scale. This assignment reflects the same standard of quality I apply on the job every day.

---

## 🎯 Features Implemented

### 🔒 Sticky Header
- Appears **only** when the user scrolls past the first fold
- Sits **above** the navigation bar with correct z-index stacking
- Smoothly **disappears** when scrolling back to the top
- Uses `IntersectionObserver` API for performant, jank-free detection — no heavy scroll event listeners

### 🖼️ Image Carousel with Zoom
- Fully interactive carousel built from scratch — no libraries
- **Hover-to-zoom** preview matching exact Figma specifications
- Smooth CSS transitions on all hover and focus states
- Keyboard-accessible navigation
- Responsive layout across all screen sizes

### 📱 Fully Responsive Design
- **Mobile-first** CSS methodology
- Tested across: Desktop (1440px), Tablet (768px), Mobile (375px)
- Fluid layouts using CSS Flexbox and Grid
- No layout breaking at any viewport width

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| **HTML5** | Semantic, accessible markup |
| **CSS3** | Flexbox, Grid, Custom Properties, Transitions |
| **Vanilla JavaScript** | DOM manipulation, IntersectionObserver, carousel logic |
| **No Frameworks** | 100% native browser APIs — as per requirements |

> In my day-to-day work I use **React.js, Next.js, Node.js, and Express.js** — but I'm equally comfortable at the fundamentals level, which this assignment demonstrates.

---

## 📁 Project Structure

```
gushwork-assignment/
│
├── index.html          # Semantic HTML structure
├── styles.css          # Component-organized CSS with custom properties
├── script.js           # Sticky header + carousel logic
└── README.md           # Project documentation
```

---

## 🧠 Technical Approach & Decisions

### Sticky Header — `IntersectionObserver` over Scroll Events
In production work (including at Tibil Solutions), I always prefer performance-first approaches. Using `IntersectionObserver` avoids firing on every scroll frame, keeping the main thread free.

```js
// Observing the hero section to trigger sticky header
const observer = new IntersectionObserver((entries) => {
  stickyHeader.classList.toggle('visible', !entries[0].isIntersecting);
}, { threshold: 0 });

observer.observe(heroSection);
```

### Carousel Zoom — CSS-first
The zoom effect uses CSS `transform: scale()` with `overflow: hidden` on the container — constraining the zoomed image within bounds without any JavaScript. This keeps the interaction silky smooth and dependency-free.

### CSS Architecture
- CSS Custom Properties (`--variables`) for consistent theming and easy maintenance
- BEM-inspired class naming for readability
- Styles ordered: Reset → Layout → Components → Utilities → Responsive breakpoints

---

## 🚀 How to Run Locally

```bash
# Clone the repository
git clone https://github.com/TajammulKhan957/gushwork-assignment.git

# Navigate into the project
cd gushwork-assignment

# Open directly in any modern browser — no build step needed
open index.html
```

---

## 🌐 Cross-Browser Compatibility

Tested and verified on:
- ✅ Google Chrome (latest)
- ✅ Mozilla Firefox (latest)
- ✅ Microsoft Edge (latest)
- ✅ Safari (latest)

*(Cross-browser compatibility is a core part of my work at Tibil Solutions — I ensure this on every delivery.)*

---

## ♿ Accessibility

- Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- `alt` attributes on all images
- Keyboard-navigable carousel
- Visible focus states on all interactive elements
- Sufficient color contrast ratios

---

## 📐 Figma Reference

Design followed from:
🎨 [Gushwork Assignment — Figma File](https://www.figma.com/design/DOv07H7C2tA5UrVLhmfwfW/Gushwork-Assignment?node-id=490-8785&t=Z0PPuWCdxPbNLcSw-1)

---

## 👨‍💻 About Me

I'm **Tajammul Khan**, an Associate Developer at **Tibil Solutions, Bangalore** with 1+ year of hands-on experience building production-grade web applications.

**Highlights:**
- 🏆 **Best Employee of the Month — January 2025** at Tibil Solutions
- 🌾 Contributed to **kisanemitra.gov.in** — a live government platform serving farmers across India
- 🤖 Built an **Agentic AI chatbot** using Azure OpenAI for real business requirements
- 📡 Full-stack exposure: React.js, Next.js, Node.js, Express.js, PostgreSQL
- 🤝 Experienced in **direct client communication**, requirements gathering, and iterative feedback integration
- 🏅 **Rajya Puraskar Award** — The Bharat Scouts and Guides (2022)

I take pride in writing clean, purposeful code and delivering pixel-perfect UI that performs as well as it looks. Every project — whether for a government client or a technical assessment — gets the same level of care and commitment.

**Open to the right opportunity — let's build something great together.**

📧 tajammulkhan957@gmail.com  
📞 +91 9916399131  
🌐 [tajammulkhan-portfolio.vercel.app](https://tajammulkhan-portfolio.vercel.app/)  
🔗 [linkedin.com/in/tajammul-khan-a81bb0200](https://linkedin.com/in/tajammul-khan-a81bb0200)  
🐙 [github.com/TajammulKhan957](https://github.com/TajammulKhan957)

---

*Submitted as part of the Gushwork Web Developer hiring process.*
