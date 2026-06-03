# ArtByCarita — Website Setup Guide

Welcome! This file explains everything you need to know to edit and launch your website. 🎨

---

## 📁 File Structure

```
ArtByCarita/
├── index.html        ← All the website content (sections, text, links)
├── styles.css        ← All the styling, colours, and layout
├── script.js         ← Animations, dark mode, sparkles, form logic
├── README.md         ← This guide!
└── assets/
    └── images/       ← Put all your artwork images here
```

---

## 🖼️ Adding Your Artwork

### Hero Character Image
1. Save your character illustration as `hero-character.png` (transparent background PNG works best)
2. Put it in `assets/images/`
3. In `index.html`, find the comment `<!-- Replace with: <img src=...` near the hero section and uncomment that line

### Portfolio Images
- Save each artwork as a JPG or PNG in `assets/images/portfolio/`
- In `index.html`, find each `.port-placeholder` div and replace it with:
  ```html
  <img src="assets/images/portfolio/your-image-name.jpg" alt="Description of artwork" />
  ```

### Shop Product Images
- Save product photos in `assets/images/shop/`
- Same process: replace the `.product-placeholder` div with an `<img>` tag

---

## ✏️ Editing Text Content

All the main text is in `index.html`. Search for `<!-- EDIT:` comments — these mark every place you'll want to customise.

Key things to update:
- Your bio in the About section
- Commission prices and tier names
- Shop product names and prices
- Event dates, names, and locations
- Social media URLs (search for `href="#"` and update each one)
- Email address (search for `hello@artbycarita.com`)
- Copyright year in the footer

---

## 🔗 Social Media Links

Search for `<!-- EDIT: Replace # with your` in index.html to find all the social links.

Update the `href="#"` with your real URLs:
- Instagram: `https://instagram.com/ArtByCarita`
- TikTok: `https://tiktok.com/@ArtByCarita`
- Artistree: your Artistree profile URL
- Email: `mailto:your@email.com`

---

## 📬 Setting Up the Contact Form

The form currently shows a demo submission. To make it actually send emails:

**Option 1 — Formspree (free, easy):**
1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form and copy your Form ID
3. In `index.html`, change the form tag to:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. Remove the `id="contact-form"` attribute (or keep both — it's fine)

**Option 2 — EmailJS (free tier available):**
See [emailjs.com](https://emailjs.com) for setup — works great with vanilla JS.

---

## 🛍️ Connecting Your Shop

Find `<!-- EDIT: Update href to your actual shop URL` in index.html.

Update the shop buttons to link to:
- Etsy: `https://etsy.com/shop/ArtByCarita`
- Ko-fi: `https://ko-fi.com/ArtByCarita/shop`
- Your own Shopify/BigCartel, etc.

---

## 🌙 Dark Mode

The dark mode toggle is built in! It saves the user's preference in their browser using localStorage. No extra setup needed.

---

## 🎨 Changing Colours

All colours are in `styles.css` at the very top inside `:root { }`.

```css
:root {
  --primary:    #314EBC;   /* Main blue */
  --secondary:  #5E79E8;   /* Lighter blue */
  --light-blue: #DDE8FF;   /* Backgrounds */
  /* etc. */
}
```

Just change the hex codes to update the whole site!

---

## 🚀 Launching the Website

**Free hosting options:**
- **GitHub Pages** — free, just upload to a GitHub repo and enable Pages in settings
- **Netlify** — drag and drop your folder at [netlify.com/drop](https://netlify.com/drop), done!
- **Vercel** — similar to Netlify, very fast

**Custom domain:**
Once hosted, you can connect `artbycarita.com` (or similar) through your hosting provider's domain settings.

---

## ❓ Need Help?

All the code is commented to explain what each part does. Look for `/* EDIT:` and `<!-- EDIT:` notes throughout the files.

Good luck! ✦ — Made with love for ArtByCarita
