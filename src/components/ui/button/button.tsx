import React, {forwardRef, MouseEventHandler, ReactNode, Ref} from 'react';
import styles from './button.module.scss';
import classNames from 'classnames';
import {noop} from '@/src/services';

enum ButtonTypes {
  Button = 'button',
  Submit = 'submit'
}

type Props = Readonly<{
  loading?: boolean;
  disabled?: boolean;
  isSubmit?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}>;

export const Button = forwardRef(
  ({children, loading, isSubmit, disabled, onClick = noop, ...restProps}: Props, ref: Ref<HTMLButtonElement>) => {
    const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
      if (!loading) {
        onClick(event);
      }
    };

    return (
      <button
        className={classNames(styles.button, {
          [styles.loading]: loading,
          [styles.disabled]: disabled
        })}
        type={isSubmit ? ButtonTypes.Submit : ButtonTypes.Button}
        onClick={handleClick}
        disabled={disabled}
        ref={ref}
        {...restProps}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
