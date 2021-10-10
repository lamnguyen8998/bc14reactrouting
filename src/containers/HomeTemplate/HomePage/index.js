import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const Title = styled.h1`
  font-size: 1.5 em;
  text-align: center;
  color: ${(props) => (props.primary ? "blue" : "palevioletred")};
`;

export default function HomePage() {
  return (
    <Wrapper>
      <Title>HomePage</Title>
      <Title primary>Cyber Soft</Title>
    </Wrapper>
  );
}
