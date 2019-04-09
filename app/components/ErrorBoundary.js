import React, { Component } from 'react';

// just a simple error boundary for debugging.
export default class ErrorBoundary extends Component {
  state = {
    error: null,
  };

  componentDidCatch(err, errInfo) {
    if (process.NODE_ENV === 'development') {
      console.warn(err, errInfo);
    }

    this.setState({
      error: err,
    });
  }

  render() {
    const { error } = this.state;
    return error ? (
      <div>
        Something Wrong QQ.
        {' '}
        <code>{this.state.error.message}</code>
      </div>
    ) : (
      this.props.children
    );
  }
}
