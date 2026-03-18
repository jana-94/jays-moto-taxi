# Muse Business — Next.js App Router Template

A full-featured business website built with Next.js (App Router), React, Tailwind CSS, Framer Motion, and React Icons. It replicates the structure and feel of the Muse Demo “Business” template from Nunforest: hero, services, about, portfolio, testimonials, team, contact, and footer.

## Features
- App Router with typed components
- Sticky navbar with smooth anchor scroll and active section highlighting
- Full-screen hero with parallax overlay and motion animations
- Services grid, About section, Portfolio cards with hover animations
- Testimonial slider, Team profiles
- Functional Contact form via API route (SMTP optional)
- Next.js Metadata (SEO, Open Graph, Twitter), sitemap and robots
- Responsive design with Tailwind

## Tech Stack
- Next.js 14+
- React 18
- Tailwind CSS
- Framer Motion (animations)
- React Icons
- Zod (validation)
- Nodemailer (SMTP email, optional)

## Getting Started
1. Install dependencies
   ```bash
   npm install
   ```
2. Run the dev server
   ```bash
   npm run dev
   ```
3. Open http://localhost:3000

## Environment Variables (Optional)
To enable email sending in the contact form, set the following in `.env.local`:
```
SMTP_HOST=your_host
SMTP_PORT=587
SMTP_USER=your_user
SMTP_PASS=your_pass
CONTACT_TO=destination@example.com
```
Without these, the API will respond `ok:true` without sending an email.

## Deployment
- Vercel: push the repo and import; ensure Environment Variables are set
- Netlify: use Next on Netlify adapter or SSR support; configure env vars

## Project Structure
```
app/
  api/contact/route.ts     # API route for contact form
  privacy/page.tsx         # Privacy page
  terms/page.tsx           # Terms page
  robots.ts                # Robots config
  sitemap.ts               # Sitemap entries
  layout.tsx               # Root layout and Metadata
  page.tsx                 # Homepage with sections
components/
  Navbar.tsx               # Sticky navbar with scroll spy
  Hero.tsx                 # Parallax hero with CTA
  ServicesCard.tsx         # Service item component
  PortfolioCard.tsx        # Portfolio item with hover animation
  TeamCard.tsx             # Team profile card
  TestimonialSlider.tsx    # Auto-advancing slider
  ContactForm.tsx          # Zod validation, API submit
lib/
  useScrollSpy.ts          # Active section hook
tailwind.config.ts         # Tailwind setup with brand palette
postcss.config.js          # PostCSS config
next.config.mjs            # Next.js config (image remote patterns)
tsconfig.json              # TypeScript config
app/globals.css            # Global Tailwind styles
```

## Notes on Design
- Color palette uses brand yellow/orange on dark neutrals to echo Muse demo
- Typography uses Inter and Poppins; spacing and grid mirror corporate aesthetics
- Animations: fade/slide in on scroll; parallax hero overlay

## License
This is a demo template. Replace content, images, and policies before production.
