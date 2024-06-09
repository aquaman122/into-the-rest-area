import { media } from '@/styles/theme';
import styled from 'styled-components';
import backgroundImage from '@/assets/images/background-image.jpg';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutStyle>
      <BackgroundImage />
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
  overflow: hidden;
`;

export const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  opacity: 0.5;
  pointer-events: none;
  z-index: -100;
`

export const LayoutInnerStyle = styled.div`
  position: absolute;
  top: 50%;
  left: 64%;
  transform: translate(-50%, -50%);
  width: 530px;
  height: 100%;
  background-color: white;
  padding: 1rem 2rem;
  z-index: 1;
  pointer-events: auto;
  ${media.custom(1000)} {
    padding: 0 1rem;
    left: 50%;
  }
`;

export default Layout;