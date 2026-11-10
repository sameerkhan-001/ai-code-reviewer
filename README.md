# 🔍 AI Code Reviewer

A full-stack web app that reviews your code with Google Gemini. Paste code in any language and get a short, structured review with issues, a recommended fix and improvements.

I built this project end to end: the React interface, the Express backend, the Gemini integration, and the error handling and retry logic that keeps it reliable.

---

## ✨ Features

- **Instant AI review** for code in any language
- **Structured output**: Issues, Recommended Fix and Improvements
- **Code editor with syntax highlighting** (JavaScript, TypeScript, Python, Java, C, C++, SQL, Bash, JSON)
- **Formatted results**: review rendered as Markdown with highlighted code blocks
- **Reliable backend**: input validation, error handling, and automatic retry with backoff when the AI service is busy (503 / 429)
- **Clean UX**: loading spinner, clear error messages, Copy and Clear buttons, responsive dark layout

---

## 🧰 Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 19, Vite, Axios, react-markdown, PrismJS, CSS3 |
| Backend | Node.js, Express, CORS, dotenv |
| AI | Google Gemini API |

---

## 🏗️ How It Works

```
React UI → POST /ai/get-review → Express (route → controller → service) → Gemini API
   ↑                                                                          │
   └───────────────────────── Markdown review ←──────────────────────────────┘
```

1. User pastes code and clicks **Review Code**.
2. The frontend sends it to `POST /ai/get-review`.
3. The controller validates the input (`400` if empty) and calls the service.
4. The service asks Gemini for a review and retries up to 3 times if the model is busy.
5. The review is returned and shown as formatted Markdown.

---

## 🚀 Getting Started

**Prerequisites:** Node.js 18+ and a free Gemini API key from [Google AI Studio](https://aistudio.google.com/).

**1. Backend**

```bash
cd BackEnd
npm install
```

Create a `.env` file (see `.env.example`):

```env
GOOGLE_GEMINI_KEY=your_api_key_here
```

```bash
npm start
```

Runs at `http://localhost:3000`.

**2. Frontend** (new terminal)

```bash
cd Frontend
npm install
npm run dev
```

Open the URL shown by Vite (usually `http://localhost:5173`).

---

## ⚙️ Environment Variables

| Variable | Where | Required | Description |
| --- | --- | --- | --- |
| `GOOGLE_GEMINI_KEY` | Backend | Yes | Gemini API key |
| `GEMINI_MODEL` | Backend | No | Model name (default: `gemini-flash-lite-latest`) |
| `PORT` | Backend | No | Server port (default: `3000`) |
| `VITE_API_URL` | Frontend | No | Backend URL (default: `http://localhost:3000`) |

> 🔒 Never commit your `.env` file.

---

👤 Author

Sameer

⭐ If you like this project, give it a star. Feedback and suggestions are always welcome!
