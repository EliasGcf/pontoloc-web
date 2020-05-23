import React, { ButtonHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: React.ComponentType<IconBaseProps>;
};

const IconButton: React.FC<ButtonProps> = ({ icon: Icon, ...rest }) => {
  return (
    <Container {...rest} type="submit">
      <Icon size={24} />
    </Container>
  );
};

export default IconButton;
