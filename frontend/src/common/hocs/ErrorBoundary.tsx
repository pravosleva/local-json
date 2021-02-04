/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: any
  info?: any
}

class ErrorBoundary extends Component<Props, State> {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(ps: Props | Readonly<Props>) {
    super(ps)
    this.state = {
      hasError: false,
    }
  }

  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('--- ERROR ---')
    console.error('Uncaught error:', error, errorInfo)
    // eslint-disable-next-line react/no-unused-state
    this.setState({ error, info: errorInfo })
  }

  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hasError, error, info } = this.state
    const { children } = this.props

    return hasError ? <h1>Sorry.. there was an error</h1> : children
  }
}

export { ErrorBoundary }
