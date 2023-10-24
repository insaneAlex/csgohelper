import {FC} from 'react';
type Props = {width?: number; height?: number; fill?: string};

export const HamburgerIcon: FC<Props> = ({fill = 'gainsboro', width = 50, height = 50}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width={width} height={height}>
      <path
        fill={fill}
        d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"
      />
    </svg>
  );
};
