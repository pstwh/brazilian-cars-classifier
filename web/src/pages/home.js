import React, { Component } from "react";
import axios from "axios";

import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Button, CircularProgress } from "@material-ui/core";

import DriveEta from "@material-ui/icons/DriveEta";

import PhotoList from "../components/photolist";

const styles = theme => ({
  root: {
    flexGrow: 1
  },

  current: {
    marginTop: "10px",
    height: "500px",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block"
  },

  float: {
    position: "fixed",
    width: "64px",
    height: "64px",
    bottom: "48px",
    right: "64px"
  },

  uploader: {
    display: "none"
  }
});

class Home extends Component {
  constructor() {
    super();

    this.state = {
      file: null,
      lastImages: [],
      loading: false
    };
  }

  formChangeHandler = e => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("images", file, file.name);

    this.setState({
      ...this.state,
      loading: true
    });

    axios
      .post("http://localhost:3333/predict", formData)
      .then(resp => resp.data)
      .then(content => {
        if (content.predictions.length != 0) {
          this.setState(state => ({
            lastImages: [
              ...state.lastImages,
              {
                name: file.name,
                image: window.URL.createObjectURL(file),
                car: content.predictions[0].car,
                brand: content.predictions[0].brand
              }
            ],
            loading: false
          }));
        } else {
          this.setState(state => ({
            loading: false
          }));
        }
      });
  };

  render() {
    const { lastImages, loading } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Grid className={classes.root}>
          <input
            type="file"
            ref={fileInput => (this.fileInput = fileInput)}
            className={classes.uploader}
            onChange={this.formChangeHandler}
          />
          <PhotoList photos={lastImages} />
        </Grid>
        <Button
          variant="fab"
          color="primary"
          aria-label="Add"
          disabled={loading}
          onClick={() => this.fileInput.click()}
          className={classes.float}
        >
          <DriveEta />
        </Button>
        {loading && <CircularProgress size={68} className={classes.float} />}
      </div>
    );
  }
}

export default withStyles(styles)(Home);
