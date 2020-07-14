import styled, { css } from 'styled-components';
import Card, { CardTitle, CardContent } from 'calcite-react/Card';

const StyledCard = styled(Card)`
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.palette.background};
  }
`;

const StyledCardTitle = styled(CardTitle)`
  font-size: 1.2rem;
  margin: 0 0 0.35rem 0;
`;

const StyledCardContent = styled(CardContent)`
  padding: 0.55rem 1rem;
`;

const IconsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0.5rem 0;
`;

const IconWrapper = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 5px;
  padding: 5px;
  margin-inline-end: 0.3rem;
  background: ${({ theme }) => theme.palette.semantic.inactive};

  ${(props) =>
    props.isActive &&
    css`
      background: ${({ theme }) => theme.palette.semantic.active};
    `};

  svg {
    fill: ${({ theme }) => theme.palette.white};
  }
`;

const StatsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DistanceWrapper = styled.div`
  svg {
    color: #17231e38;
  }
`;

const ElevationWrapper = styled.div`
  svg {
    color: #17231e38;
  }
`;

const StyledTrailDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export {
  StyledCard,
  StyledCardTitle,
  StyledCardContent,
  StyledTrailDetails,
  IconsWrapper,
  IconWrapper,
  StatsWrapper,
  DistanceWrapper,
  ElevationWrapper,
};
