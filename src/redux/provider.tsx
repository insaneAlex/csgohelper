import {FC, ReactNode} from 'react';
import {store} from './store';
import {Provider} from 'react-redux';

export const ReduxProvider: FC<{children: ReactNode}> = ({children}) => {
  return <Provider store={store}>{children}</Provider>;
};
