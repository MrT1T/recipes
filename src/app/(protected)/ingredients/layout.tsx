import { FC, ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

const IngredientsLayout: FC<IProps> = ({ children }) => {
  return <section>{children}</section>;
};

export default IngredientsLayout;
