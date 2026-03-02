import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Unhandled app error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white px-6 py-12 text-center">
          <div className="max-w-md">
            <h1 className="text-2xl font-semibold text-gray-900">Seite konnte nicht geladen werden</h1>
            <p className="mt-3 text-sm text-gray-600">
              Ein unerwarteter Fehler ist aufgetreten. Bitte die Seite neu laden.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
