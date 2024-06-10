import Header from '@/components/Header';
import MountainTrails from '@/components/MountainTrails';
import styled from 'styled-components';

const Main = () => {
  return (
    <MainStyle>
      <Header />
      <MountainTrails />
    </MainStyle>
  );
};

const MainStyle = styled.div`

`;

export default Main;
