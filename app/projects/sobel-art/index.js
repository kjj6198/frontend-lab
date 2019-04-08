import React, { createRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import useSobelArt from './useSobelArt';
import defaultImage from './defaultImage';

const Image = styled.img`
  width: 400px;
`;

const Canvas = styled.canvas`
  width: 400px;
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


  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files.length !== 0) {
            setFile(e.target.files[0]);
          }
        }}
      />
      <div>
        <Typography id="edgeThreshold">Edge Threshold (determine value range should be `edge`)</Typography>
        {/* TODO: debounce input */}
        <input type="range" value={edgeThreshold} onChange={e => setThreshold(e.target.value)} />
      </div>
      <Image ref={imageRef} src={image} alt="sobel" />
      <Canvas ref={canvasRef} />
    </div>
  );
}
