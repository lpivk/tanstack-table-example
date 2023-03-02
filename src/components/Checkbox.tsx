import { HTMLProps } from 'react';

export const Checkbox: React.FC<HTMLProps<HTMLInputElement>> = ({ ...props }) => {
  return <input type="checkbox" className={'cursor-pointer'} {...props} />;
};
