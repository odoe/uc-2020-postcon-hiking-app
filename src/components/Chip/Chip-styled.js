import styled, { css } from 'styled-components';

const StyledChip = styled.span`
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
  border-radius: 3px;
  color: ${({ theme }) => theme.palette.white};
  ${(props) =>
    props.difficulty === 'easy' &&
    css`
      background: ${({ theme }) => theme.palette.semantic.easy};
    `};
  ${(props) =>
    props.difficulty === 'moderate' &&
    css`
      background: ${({ theme }) => theme.palette.semantic.moderate};
    `};
  ${(props) =>
    props.difficulty === 'difficult' &&
    css`
      background: ${({ theme }) => theme.palette.semantic.difficult};
    `};
`;

export { StyledChip };
