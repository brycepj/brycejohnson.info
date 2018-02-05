import React from "react";
import styled from "styled-components";
import { values, shuffle } from "lodash";

import pictures from "./assets/index";

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

class ImageList extends React.Component {
  constructor(props) {
    super();
    this.pictures = values(pictures);
    this.state = {
      imagesLoaded: 0,
      allImagesLoaded: false
    };
  }
  imageLoaded = () => {
    if (this.state.imagesLoaded === this.pictures.length - 1) {
      this.setState({ allImagesLoaded: true });
    } else {
      this.setState({ imagesLoaded: this.state.imagesLoaded + 1 });
    }
  };
  render() {
    const { showMorePictures } = this.props;
    const picturesSet = showMorePictures
      ? this.pictures
      : this.pictures.slice(0, 3);
    return (
      <Container>
        {picturesSet.map((src, idx) => {
          return <Image key={idx} src={src} onLoad={this.imageLoaded} />;
        })}
      </Container>
    );
  }
}

export default ImageList;
