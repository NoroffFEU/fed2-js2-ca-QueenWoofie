# Noroff FED2 - JavaScript 2 CA
## Noroff Socials

This is my course assignment for the JavaScript 2 module at Noroff. The task was to build a basic social media app front-end using [Noroff’s API](https://docs.noroff.dev/docs/v2). I’ve gone with a fun design based on my love for F1. 

### 🔗 Live Site:
[https://noroffsocials.netlify.app](https://noroffsocials.netlify.app)

### 🔗 Repository: 
[https://github.com/NoroffFEU/fed2-js2-ca-QueenWoofie](https://github.com/NoroffFEU/fed2-js2-ca-QueenWoofie)

> NB: The **single post page** doesn’t show up properly on desktop — but weirdly it **does work on mobile**. I’ve tried a bunch of stuff to fix it.

---

## Features

- Login and register pages
- Profile page with bio, avatar, banner updates
- Create, edit, delete, and view posts
- Feed and single post views*
- Search posts by title, body, tags or author
- Follow/unfollow other users
- Profile display of users followed and following
- "Cute" custom alerts instead of browser defaults (color designed to fit Ferrarri and Lando Norris' colors)
- Responsive layout

---

## Tech Used

- JavaScript
- HTML + CSS
- Noroff Social API v2
- Hosted on Netlify
- VSCode

- postimg.cc (for adding my own pics to the site)

---

## Run Project Locally

1. Clone the repository:

```bash
git clone https://github.com/NoroffFEU/fed2-js2-ca-QueenWoofie.git
```
2. Open the folder in VSCode - or another code editor

3. Open your terminal and install the required packages:
```
npm install
```
and run the app:

```bash
npm run dev
```

---

## Known Issues

### Single Post Page Not Loading on Desktop

- Clicking post titles goes to `/post/?id=xxxx`
- This works on mobile, but not desktop (even though the console shows it routing correctly)

### Things I Tried to Fix It

- Stripped query string in `router/index.js`
- Verified path `/post/` and route are correct
- Included `post/index.html` in `vite.config.js`
- Page works perfectly with `npm run dev`
- Ensured Netlify build has all script files
- Tested with `_redirects` from Netlify
- Attempted to ask teacher

Still didn’t solve it. If anyone figures it out, I’d love to hear it! 😅


---

## Final Notes

This was a big project and a lot of fun, although also very stressful. I focused on writing clean modular code, with simple styling and a cozy F1-inspired vibe inbetween some panic attacks.

Built by **Thea (QueenWoofie)** 🐾