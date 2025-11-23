import styled from '@emotion/styled';

const Wrapper = styled.section<{ padding?: string }>`
  padding: ${({ padding }) => (!padding ? '30px' : padding)};
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #222;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  text-align: left;
`;

export default Wrapper;
