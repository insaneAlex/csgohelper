import React from 'react';
import {render, screen} from '@testing-library/react';
import {ReduxProvider} from '../provider';
import {store} from '../store';
import {ReactReduxContext} from 'react-redux';

describe('ReduxProvider Component', () => {
  it('renders children with Redux store', () => {
    render(
      <ReduxProvider>
        <div className="test-child">Test Child</div>
      </ReduxProvider>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
  it('passes Redux store to children', () => {
    let passedStore = null;
    const TestComponent = () => {
      passedStore = React.useContext(ReactReduxContext).store;
      return null;
    };
    render(
      <ReduxProvider>
        <TestComponent />
      </ReduxProvider>
    );
    expect(passedStore).toBe(store);
  });
});
