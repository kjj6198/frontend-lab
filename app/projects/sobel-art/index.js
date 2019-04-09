import React, { createRef, useState } from 'react';
import styled from 'styled-components';
import { Typography, Grid, Paper } from '@material-ui/core';
import useSobelArt from './useSobelArt';
import defaultImage from './defaultImage';

const Image = styled.img`
  width: 85%;
`;

const Canvas = styled.canvas`
  width: 85%;
`;

const Wrapper = styled.div`
  width: 95%;
  max-width: 1280px;
  margin: 0.75rem auto;
`;

const PaddingPaper = styled(Paper)`
  padding: 1rem;
  margin: 1rem 0;
`;


export default function SobelArt() {
  const canvasRef = createRef();
  const imageRef = createRef();
  const [file, setFile] = useState();
  const [image, setImage] = useState(defaultImage);
  const [edgeThreshold, setThreshold] = useState(50);

  useSobelArt({
    canvasRef,
    // recommended value: gte 50
    egdeThreshold: edgeThreshold,
    imageInstance: file || image,
    onFileChange: (imageFile) => { // triggered when file changed and reader has read file.
      setImage(imageFile);
    },
  });

  const title = 'Sobel Art';
  const description = `This is actually originally created on my codepen 2 years ago to visualize
  edge detection in frontend using Sobel.`;

  return (
    <Wrapper>
      <Grid container spacing={12}>
        <Grid item xs={12} md={7}>
          <PaddingPaper elevation={1}>
            <Typography variant="h5" component="h2">
              {title}
            </Typography>
            <Typography component="p">
              {description}
            </Typography>
            <ul>
              <li><a href="https://www.wikiwand.com/zh-tw/%E7%B4%A2%E8%B2%9D%E7%88%BE%E7%AE%97%E5%AD%90">Sobel operator</a></li>
              <li><a href="https://codepen.io/kjj6198/pen/XMQaey">Original Codepen</a></li>
            </ul>
          </PaddingPaper>
        </Grid>
        <Grid item xs={12} md={12}>
          <label htmlFor="image">
            <span>Choose Image: </span>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length !== 0) {
                  setFile(e.target.files[0]);
                }
              }}
            />
          </label>

          <label htmlFor="edgeThreshold">
            <span>Edge Threshold: </span>
            <input
              id="edgeThreshold"
              type="range"
              value={edgeThreshold}
              onChange={e => setThreshold(e.target.value)}
              min={10}
              max={250}
            />
          </label>
        </Grid>
        <Grid item xs={12} md={6}>
          <Image ref={imageRef} src={image} alt="sobel" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Canvas ref={canvasRef} />
        </Grid>
      </Grid>
    </Wrapper>
  );
}
