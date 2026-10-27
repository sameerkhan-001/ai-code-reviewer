import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import axios from 'axios'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const SAMPLE_CODE = `function sum(a, b) {
  return a + b
}`

function App() {
  const [code, setCode] = useState(SAMPLE_CODE)
  const [review, setReview] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    if (!code.trim()) {
      setError('Please paste some code first.')
      return
    }
    setLoading(true)
    setError('')
    setReview('')
    try {
      const response = await axios.post(`${API_URL}/ai/get-review`, { code })
      setReview(response.data)
    } catch (err) {
      setError('Could not get a review. Please check the server and try again.')
    } finally {
      setLoading(false)
    }
  }

  function clearAll() {
    setCode('')
    setReview('')
    setError('')
  }

  async function copyReview() {
    try {
      await navigator.clipboard.writeText(review)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setError('Copy failed. Please select the text manually.')
    }
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="logo">{'</>'}</span>
          <div>
            <h1>AI Code Reviewer</h1>
            <p>Paste your code and get an instant, senior-level review.</p>
          </div>
        </div>
        <span className="badge">Powered by Gemini</span>
      </header>

      <main>
        <section className="panel left">
          <div className="panel-head">
            <h2>Your Code</h2>
            <div className="actions">
              <button className="btn ghost" onClick={clearAll} disabled={loading}>
                Clear
              </button>
              <button className="btn primary" onClick={reviewCode} disabled={loading}>
                {loading ? (<><span className="spinner" /> Reviewing...</>) : 'Review Code'}
              </button>
            </div>
          </div>
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={16}
              placeholder="// Paste your code here..."
              style={{
                fontFamily: '"Fira Code", "Fira Mono", Consolas, monospace',
                fontSize: 15,
                minHeight: '100%',
              }}
            />
          </div>
        </section>

        <section className="panel right">
          <div className="panel-head">
            <h2>AI Review</h2>
            {review && (
              <button className="btn ghost" onClick={copyReview}>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
          <div className="review-body">
            {error && <div className="error">{error}</div>}

            {loading && (
              <div className="state">
                <span className="spinner big" />
                <p>Analyzing your code...</p>
              </div>
            )}

            {!loading && !review && !error && (
              <div className="state muted">
                <span className="emoji">🔍</span>
                <p>Your review will appear here.</p>
                <small>Paste code on the left and click "Review Code".</small>
              </div>
            )}

            {!loading && review && (
              <div className="markdown">
                <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
