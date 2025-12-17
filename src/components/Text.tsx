import styled from '@emotion/styled';

export const Heading1 = styled.p<{ color?: string }>`
  font-family: HSSanTokki20-Regular, serif;
  font-size: 1.5rem;
  margin: 10px;
  color:${(props) => (props.color ? props.color : '#800000')};
  white-space: pre-line;
`;

export const Heading2 = styled.p`
  font-size: 1rem;
  margin: 10px;
  white-space: pre-line;
  text-align: center;
`;

export const PointTitle = styled.p`
  font-family: HSSanTokki20-Regular, serif;
  line-height: 1;
  margin: 0;
  color: #800000;
  white-space: pre-line;
`;

export const Paragraph = styled.p`
  line-height: 1.4rem;
  line-height: 150%;
  white-space: pre-line;
  text-align: center;
`;

export const Caption = styled.p<{ textAlign?: string, color?: string }>`
  font-weight: 600;
  text-align: ${(props) => (props.textAlign ? props.textAlign : 'start')};
  color:${(props) => (props.color)};
  white-space: pre-line;
`;

export const BalineseText = styled.p`
  font-family: "Noto Serif Balinese", serif;
  font-weight: 800;
  font-size: 28px;
  font-style: normal;
`;

