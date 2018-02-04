import React from "react";
import styled from "styled-components";

import { bryceAndEmmy, rachaelAndEmmy, hikeImage } from "./assets/index";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
`;

const Image = styled.img`
  max-height: 300px;
  margin: 5px;
`;

function ImageList() {
  return (
    <Container>
      <Image src={bryceAndEmmy} alt="Bryce and Emmy" />
      <Image src={rachaelAndEmmy} alt="Rachael and Emmy" />
      <Image src={hikeImage} alt="Rachael, Bryce and Emmy on a hike" />
    </Container>
  );
}

export default ImageList;
