import * as React from 'react';

const withSuspence = ((Component: React.SFC): React.SFC => {
  const WithSuspence = (props): React.SFC => {
    return <React.Suspence fallback={<h1>Loading...</h1>}>
        <Component {...props} />
    </React.Suspence>;
  };

  return WithSuspence;
});

export default withSuspence;
