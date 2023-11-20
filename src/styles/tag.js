import styled from "@emotion/styled";

// 리액트 emotion 태그정의
export const SlideSection = styled.section`
  position: relative;
  display: block;
  width: 50%;
  margin: 0 auto;
  height: ${props => (props.h ? props.h + "px" : null)};
  background: ${props => (props.bg ? props.bg : "orange")};
`;
export const ComunitySection = styled.section`
  position: relative;
  display: block;
  width: 80%;
  height: 400px;
  background: blue;
`;
