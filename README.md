# Dwiti Thakkar | Portfolio

Personal portfolio for Dwiti Thakkar, Cloud Operations Engineer. Built with React 18 and Vite.

## Run locally

    npm install
    npm run dev

## Production build

    npm run build      # static site in dist/
    npm run preview    # serve the build locally

## Deploy (Vercel)

1. Import this repository in Vercel. It detects Vite automatically (build: `npm run build`, output: `dist`).
2. Add the custom domain under Project > Settings > Domains and set the DNS records Vercel shows.

## Where to edit

- `src/App.jsx`: copy for About, What I take care of, Projects, Experience, Certifications, Contact
- `src/Toolkit.jsx`: toolkit groups and logos
- `src/ProjectViz.jsx`: animated architecture diagrams for the projects
- `src/Resume.jsx`, `public/Dwiti_Thakkar_Resume.pdf`, `src/resumeData.js`: resume section (replace the PDF and regenerate `resumeData.js` when the resume changes)
- `src/index.css`: colours and fonts are CSS variables at the top
