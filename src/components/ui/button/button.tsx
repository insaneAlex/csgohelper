import React, {forwardRef, MouseEventHandler, Ref} from 'react';
import styles from './button.module.scss';
import classNames from 'classnames';
import {noop} from '@/src/services';

enum ButtonTypes {
  Button = 'button',
  Submit = 'submit'
}

type Props = Readonly<{
  label: string;
  loading?: boolean;
  disabled?: boolean;
  isSubmit?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}>;

export const Button = forwardRef(
  ({label, loading, isSubmit, disabled, onClick = noop, ...restProps}: Props, ref: Ref<HTMLButtonElement>) => {
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
        ref={ref}
        {...restProps}
      >
        {label}
      </button>
    );
  }
);

Button.displayName = 'Button';
