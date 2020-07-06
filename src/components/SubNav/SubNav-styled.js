import styled from 'styled-components';

const StyledSubNav = styled.div`
  display: flex;
  width: 100%;

  color: rgb(255, 255, 255);
  z-index: 2;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 2px 3px;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  line-height: normal;
  background: ${({ theme }) => theme.palette.Brand_Blue_200};
  flex: 0 0 61px;
`;

export { StyledSubNav };
