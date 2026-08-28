# Raguraaman V M — DevOps Portfolio

A premium, DevOps/Kubernetes-themed personal portfolio built with React + Vite.
The whole page lives inside a "cluster" metaphor: the hero is a live terminal,
sections are labeled like Kubernetes manifests (`kind: About`, `kind: NodePool`),
skills are node pools, work history is a deployment pipeline, and projects are
running services. A soft purple light source drifts through a field of stars
site-wide, reacting to your cursor like it's illuminating a service mesh.

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a static `dist/`
folder you can deploy anywhere (Vercel, Netlify, GitHub Pages, S3 + CloudFront —
all fitting, given the theme).

## Add your assets

Drop these two files into `public/`:

- `profile.jpg` — your headshot. If it's missing, the hero gracefully falls
  back to an "RV" initials avatar, so nothing breaks without it.
- `Raguraaman_Resume.pdf` — served at `/Raguraaman_Resume.pdf` and linked from
  the nav bar and hero.

## Edit your content

Everything text-based — bio, skills, journey/timeline, projects, links — lives
in one place: **`src/data.js`**. You don't need to touch any component to
update content; just edit the arrays and objects there. The `journey` and
`projects` arrays currently contain realistic placeholder entries (marked with
`[Your ... ]` where relevant) — swap them for your real history and repos.

## The cursor / spatial effect

`src/components/SpatialField.jsx` renders a fixed canvas behind the whole
page: a starfield where a soft purple light source eases toward your cursor
(smoothed, not locked — see the `0.07` lerp factor), brightens nearby stars,
and draws faint connecting lines between stars near the light, like a mesh
lighting up. It automatically:

- goes fully static if the OS-level "reduce motion" setting is on
- switches to a slow, autonomous drift (no pointer tracking) on touch devices
- never renders a hard, distracting circle — the glow is a blurred, additive
  gradient at low opacity

`src/components/TiltCard.jsx` adds the subtle 3D tilt used on the skill and
project cards, and disables itself under the same two conditions.

## Stack

React 18, Vite, Framer Motion (scroll reveals), lucide-react (icons). No CSS
framework — all styling is hand-written in `src/index.css` using CSS custom
properties, so the palette and type scale are easy to retune from the top of
that file.
