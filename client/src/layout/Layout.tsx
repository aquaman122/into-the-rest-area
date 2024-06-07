import { media } from '@/styles/theme';
import styled from 'styled-components';
import backgroundImage from '@/assets/images/background-image.jpg';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutStyle>
      <LayoutInnerStyle>
        {children}
      </LayoutInnerStyle>
    </LayoutStyle>
  );
};

export const LayoutStyle = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  opacity: 0.5;
  z-index: -1000;
`;

export const LayoutInnerStyle = styled.div`
  position: absolute;
  top: 50%;
  left: 65%;
  transform: translate(-50%, -50%);
  width: 530px;
  height: 100%;
  background-color: white;
  ${media.custom(1000)} {
    padding: 0 1rem;
    left: 50%;
  }
`;

export default Layout;