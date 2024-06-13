import styled from 'styled-components';
import { GiCampingTent } from "react-icons/gi";

const Header = () => {
  return (
    <HeaderStyle>
      <HeaderTitleContainer>
        <GiCampingTent size={40} />
        <h4>ITRA</h4>
      </HeaderTitleContainer>
    </HeaderStyle>
  );
};

const HeaderStyle = styled.div`
  font-family: 'Pretendard700';
`;

const HeaderTitleContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.green};

  h4 {
    margin-left: 10px;
  }
`;

export default Header;
