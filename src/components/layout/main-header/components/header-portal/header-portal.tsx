import {Portal} from '@/src/components/ui';
import {MobileMenu} from '../mobile-menu';
import {FC} from 'react';

type Props = {
  isHidden: boolean;
  onExit: () => void;
  links: {name: string; href: string; renderIcon: () => React.JSX.Element}[];
};

export const HeaderPortal: FC<Props> = ({isHidden, onExit, links}) => {
  return (
    <Portal.Portal isHidden={isHidden} onEscapePressed={onExit}>
      <Portal.Overlay onClick={onExit} />
      <MobileMenu navLinks={links} setIsVisible={onExit} />
    </Portal.Portal>
  );
};
