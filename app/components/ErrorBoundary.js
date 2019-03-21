import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = {
    error: null,
    info: null,
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
    return error ? <div>Something Wrong QQ</div> : this.props.children;
  }
}
