import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import { GridListTile, GridListTileBar } from "@material-ui/core";

import { Stage, Layer, Image } from "react-konva";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500,
    height: 450
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
});

class Photo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: "",
      width: null,
      height: null,
      hover: false
    };
  }

  componentDidMount() {
    const image = new window.Image();
    const { src } = this.props;
    const { width, height } = image;

    image.src = src;
    image.onload = () => {
      this.setState({
        image,
        width,
        height
      });
    };
  }

  render() {
    const { image } = this.state;
    const { car, brand } = this.props;

    const scale = 350 / image.height;

    return (
      <GridListTile>
        <Stage
          width={image.width * scale}
          height={image.height * scale}
          scaleX={scale}
          scaleY={scale}
        >
          <Layer>
            <Image image={image} />
          </Layer>
        </Stage>
        <GridListTileBar title={`Car: ${car}`} subtitle={`Brand: ${brand}`} />
      </GridListTile>
    );
  }
}

export default withStyles(styles)(Photo);
