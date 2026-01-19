import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * FeatureErrorBoundary - Granular error boundary for specific features
 * 
 * Unlike a global error boundary, this allows parts of the app to fail
 * gracefully while keeping other parts functional.
 * 
 * Usage:
 * <FeatureErrorBoundary feature="game" fallback={<GameErrorFallback />}>
 *   <GameArea />
 * </FeatureErrorBoundary>
 */
class FeatureErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    
    // Log to error reporting service
    console.error(`[${this.props.feature}] Error:`, error, errorInfo);
    
    // Call optional onError callback
    if (this.props.onError) {
      this.props.onError(error, errorInfo, this.props.feature);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="error-boundary" role="alert">
          <div className="error-boundary__content">
            <h3>⚠️ {this.props.feature} Error</h3>
            <p>Something went wrong in the {this.props.feature} section.</p>
            {this.props.showDetails && this.state.error && (
              <details className="error-boundary__details">
                <summary>Error Details</summary>
                <pre>{this.state.error.toString()}</pre>
              </details>
            )}
            <button 
              onClick={this.handleRetry}
              className="error-boundary__retry"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

FeatureErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  feature: PropTypes.string.isRequired,
  fallback: PropTypes.node,
  onError: PropTypes.func,
  showDetails: PropTypes.bool,
};

FeatureErrorBoundary.defaultProps = {
  showDetails: process.env.NODE_ENV === 'development',
};

export default FeatureErrorBoundary;

