import { useEffect } from 'react';

function getImageData(imageURL /* TODO: url can be blob or string */) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.src = imageURL;
    img.crossOrigin = 'Anonymous';

    img.onload = function loadImage() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      ctx.canvas.width = img.width;
      ctx.canvas.height = img.height;

      ctx.drawImage(img, 0, 0, img.width, img.height);
      resolve(ctx.getImageData(0, 0, img.width, img.height));
    };

    img.onerror = reject;
  });
}

const sobel = (width, height, egdeThreshold) => (imageData) => {
  const bindPixelAt = d => function (x, y, i) {
    i = i || 0;
    return d[((width * y) + x) * 4 + i];
  };

  const pixelAt = bindPixelAt(imageData);
  const sobalData = [];
  const kernelX = [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1],
  ];

  const kernelY = [
    [1, 2, 1],
    [0, 0, 0],
    [-1, -2, -1],
  ];

  // TODO: use matrix operation.
  // see: https://evanw.github.io/lightgl.js/docs/matrix.html
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const X = (
        (kernelX[0][0] * pixelAt(x - 1, y - 1))
        + (kernelX[0][1] * pixelAt(x, y - 1))
        + (kernelX[0][2] * pixelAt(x + 1, y - 1))
        + (kernelX[1][0] * pixelAt(x - 1, y))
        + (kernelX[1][1] * pixelAt(x, y))
        + (kernelX[1][2] * pixelAt(x + 1, y))
        + (kernelX[2][0] * pixelAt(x - 1, y + 1))
        + (kernelX[2][1] * pixelAt(x, y + 1))
        + (kernelX[2][2] * pixelAt(x + 1, y + 1))
      );

      const Y = (
        (kernelY[0][0] * pixelAt(x - 1, y - 1))
        + (kernelY[0][1] * pixelAt(x, y - 1))
        + (kernelY[0][2] * pixelAt(x + 1, y - 1))
        + (kernelY[1][0] * pixelAt(x - 1, y))
        + (kernelY[1][1] * pixelAt(x, y))
        + (kernelY[1][2] * pixelAt(x + 1, y))
        + (kernelY[2][0] * pixelAt(x - 1, y + 1))
        + (kernelY[2][1] * pixelAt(x, y + 1))
        + (kernelY[2][2] * pixelAt(x + 1, y + 1))
      );

      const magnitude = Math.sqrt(Math.pow(X, 2) + Math.pow(Y, 2)) >>> 0;
      const minmax = magnitude > egdeThreshold ? 0 : 255;

      /*                 R          G         B        A  */
      sobalData.push(minmax, minmax, minmax, 255);
    }
  }
  return new Uint8ClampedArray(sobalData);
};

export default function useSobelArt({
  canvasRef,
  egdeThreshold = 50,
  onFileChange,
  imageInstance, // can be file or URL string?
}) {
  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    const drawSobelImage = (imageData) => {
      ctx.canvas.width = imageData.width;
      ctx.canvas.height = imageData.height;
      const sobelPoints = sobel(imageData.width, imageData.height, egdeThreshold)(imageData.data);
      const sobelData = new ImageData(sobelPoints, imageData.width, imageData.height);

      ctx.putImageData(sobelData, 0, 0);
    };

    if (imageInstance instanceof File) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        if (onFileChange) {
          onFileChange(reader.result);
        }
        getImageData(reader.result)
          .then(drawSobelImage)
          .catch(console.error);
      });
      reader.readAsDataURL(imageInstance);
    } else if (typeof imageInstance === 'string') {
      getImageData(imageInstance)
        .then(drawSobelImage)
        .catch(console.error);
    }
  }, [canvasRef, egdeThreshold, imageInstance, onFileChange]);
}
