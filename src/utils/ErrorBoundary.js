import LogRocket from "logrocket";
import React from "react";

import Button from "components/UI/Button";
import LayoutContainer from "components/UI/LayoutContainer";
import H4 from "components/UI/Typography/H4";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
    LogRocket.captureException(error, { extra: errorInfo });
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <LayoutContainer className='grid-center h-screen'>
          <div className='text-center'>
            <H4 className='mb-10'>An error occurred</H4>
            <Button type='button' onClick={() => this.setState({ hasError: false })} className='mx-auto'>
              Try again?
            </Button>
          </div>
        </LayoutContainer>
      );
    }

    // Return children components in case of no error
    return this.props.children;
  }
}

export default ErrorBoundary;
