import styled from 'styled-components';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <LayoutStyle>{children}</LayoutStyle>;
};

export const LayoutStyle = styled.div`
  
`;

export default Layout;