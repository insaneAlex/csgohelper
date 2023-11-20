import React from 'react';

export const createStubComponent = () => (props: any) => {
  return Object.keys(props)
    .sort()
    .map((el) => <React.Fragment key={el}>{el}</React.Fragment>);
};
