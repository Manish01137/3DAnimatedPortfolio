import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('App crashed:', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          minHeight: '100vh', background: '#0a0a0a', color: '#fff',
          fontFamily: 'monospace', padding: '48px', boxSizing: 'border-box',
        }}>
          <h1 style={{ color: '#ec4899', fontSize: 22, marginBottom: 16 }}>
            ⚠ App crashed — here is the error:
          </h1>
          <pre style={{
            whiteSpace: 'pre-wrap', wordBreak: 'break-word',
            background: '#161616', padding: 20, borderRadius: 8,
            fontSize: 13, lineHeight: 1.6, color: '#ffb4b4',
          }}>
            {String(this.state.error?.stack || this.state.error)}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
