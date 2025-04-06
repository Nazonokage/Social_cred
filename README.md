# 🇨🇳💳 Social Credit System (Chinese-Themed) — Meme Project

> 🧠🧋 *"Built with caffeine, chaos, and confusion."*

---

## 📖✨ Storytime

This was **supposed** to be our final exam project for Ethical Hacking — focused on **defense and offense**.  
But plot twist: **I made this in just 3 days.** 😵‍💫💻☕

### 💥 The Big Exam Day

- We **swapped projects** with our opponents to attack each other’s systems 💣🔄  
- But guess what? **We couldn’t attack theirs**… they went *too deep* 😭  
- End result? **Draw** 🤝

Meanwhile, Big Boss 🧔‍♂️ was expecting a win — but I just told the other team:  
> *“Just enjoy the website ah 😌”*

And every time they tried to hack us, **sound effects** would blast like:
> *“功德 +1!”*  
Had everyone **cry-laughing** 😭🤣

Ser Uy even tried to **hack it live** —  
- Opened dev tools 🛠️  
- Deleted HTML 🤡  
- Said: “Ha?”  
- I was like: **“Encrypted ko pa 'na ya, tapos mu lang ya delete??”** 💀💀💀

---

## 🧠💡 Idea & Motivation

Originally meant to be a **debt tracker**, but somehow mutated into a:

> **SOCIAL CREDIT SYSTEM** — China style 🇨🇳😎💥

Basically made it a **meme + learning platform**.

What I played with:
- ⚛️ **React** (manual in some parts)
- 🧵 Monorepo structure
- 🔐 Tried **Argon2** (but didn’t go deep)
- 🔑 Used **randomized primary keys** (for funsies 😎)

---

## 🧰 Tech Stack

| Layer         | Tech Used                         |
|---------------|-----------------------------------|
| 🎨 Frontend   | React (w/ Vite) ⚡                 |
| ⚙️ Backend    | Express.js 🚀                     |
| 🗄️ Database   | MySQL (via XAMPP) 🐬              |
| 🛡️ Security   | Manual CSRF + Sessions + Middleware 🔐 |

> Monorepo style. Backend & frontend in one roof 🏠

---

## 🧪🛠️ How to Run

1. **Check dependencies** 📦
   ```bash
   npm list
   ```
   If errors show up:
   ```bash
   npm i --verbose
   ```

2. **Start the whole thing** 🚀
   ```bash
   npm run dev
   ```
   🔄 This will run **React + Express** at the same time.

3. **Import the DB** 💽
   - Use `social_credit.sql` 📂
   - Upload via phpMyAdmin or MySQL CLI 💻

---

## 🗂️ Folder Structure

```
/social-credit-system
├── /public          # 🔊 BGM, 🎨 Images, 🔖 Favicon
├── /src
│   ├── /components  # 🧩 React Components
│   ├── /context     # 🌐 Global State
│   ├── /pages       # 📄 Route Pages
│   ├── /services    # 🔗 API Calls
│   └── index.css    # 💅 Styling
├── /server
│   ├── /models      # 🧬 DB Models
│   ├── /middleware  # 🛡️ Auth & Security
│   └── server.js    # 🚪 Entry Point
├── vite.config.js   # ⚙️ Vite Config
└── package.json     # 📦 Dependencies
```

📎 For full structure, check `filesys.txt`.

---

## ⚠️ Disclaimer (lol)

This is a **joke project** with a 🇨🇳 **Chinese social credit theme**.  
It’s just for **memes, tech learning, and vibes** —  
> **Don’t take it seriously. Don’t be offended.**  
The dev is:
> 🔥 *Racist… peacefully* 😂🕊️

