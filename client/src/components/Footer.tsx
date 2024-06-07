import styled from 'styled-components';
import { GoHome } from "react-icons/go";
import { BsSearch } from "react-icons/bs";
import { RiStore2Fill } from "react-icons/ri";
import { PiNewspaperClippingBold } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";

const data = [
  {
    icon: <GoHome size={20} />,
    title: '홈',
  },
  {
    icon: <BsSearch size={20} />,
    title: '캠핑장 검색',
  },
  {
    icon: <RiStore2Fill size={20} />,
    title: '스토어',
  },
  {
    icon: <PiNewspaperClippingBold size={20} />,
    title: '캠핑 리뷰',
  },
  {
    icon: <FaRegUserCircle size={20} />,
    title: '마이',
  },
]

const Footer = () => {
  return (
    <FooterStyle>
      {data.map((item, index) => (
        <FooterIconContainer key={index}>
          {item.icon}
          <p>{item.title}</p>
        </FooterIconContainer>
      ))}
    </FooterStyle>
  );
};

const FooterStyle = styled.div`
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  border-top: 2px solid ${({ theme }) => theme.color.grayNormalActive};
  background-color: ${({ theme }) => theme.color.white};
  font-family: 'Pretendard700';
`;

const FooterIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;

  p {
    margin-top: 5px;
  }
`;

export default Footer;
