import { FC, ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

const AboutLayout: FC<IProps> = ({ children }) => {
  return <section>{children}</section>;
};

export default AboutLayout;
