import React, { Component, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface StateProps {
  hasError: boolean;
  error: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, StateProps> {
  constructor(props: any) {
    super(props);

    // @ts-ignore:next-line
    this.state = { hasError: false, error: {} };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    const { children } = this.props;
    // @ts-ignore:next-line
    const { hasError, error } = this.state;

    if (hasError) return null;

    return children;
  }
}

export default ErrorBoundary;
