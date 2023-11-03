import React, {forwardRef, MouseEventHandler, ReactNode, Ref} from 'react';
import styles from './button.module.scss';
import classNames from 'classnames';
import {noop} from '@/src/services';

enum ButtonTypes {
  Button = 'button',
  Submit = 'submit'
}

export enum ButtonShape {
  Rounded = 'rounded',
  Straight = 'straight'
}
export enum ButtonColor {
  Light = 'light',
  Dark = 'dark'
}
export enum ButtonSizes {
  Large = 'large',
  Medium = 'medium'
}

type Props = Readonly<{
  loading?: boolean;
  disabled?: boolean;
  isSubmit?: boolean;
  size?: ButtonSizes;
  shape?: ButtonShape;
  color?: ButtonColor;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}>;

export const Button = forwardRef(
  (
    {children, loading, size, isSubmit, color, shape, disabled, onClick = noop, ...restProps}: Props,
    ref: Ref<HTMLButtonElement>
  ) => {
    const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
      if (!loading) {
        onClick(event);
      }
    };

    return (
      <button
        className={classNames(styles.button, {
          [styles.loading]: loading,
          [styles.disabled]: disabled,
          [styles.rounded]: shape === ButtonShape.Rounded,
          [styles.light]: color === ButtonColor.Light,
          [styles.large]: size === ButtonSizes.Large
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
