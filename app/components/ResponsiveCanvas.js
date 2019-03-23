// @flow
// ResponsiveCanvas
// listen to resize event if needed. (not implmented yet)
// and can pass ref by forwardRef.
import React, { forwardRef } from 'react';
import styled from 'styled-components';

const Canvas = styled.canvas`
  width: ${props => (props.width / props.scale)}px;
  height: ${props => (props.height / props.scale)}px;
`;

type Props = {
  width: number,
  height: number,
  scale?: number,
};

const ResponsiveCanvas = (props: Props, forwardedRef: React.Ref<*>) => {
  if (forwardedRef) {
    return (
      <Canvas
        ref={forwardedRef}
        width={props.width}
        height={props.height}
        scale={props.scale || 1}
      />
    );
  }

  return (<Canvas {...props} />);
};

export default forwardRef(ResponsiveCanvas);
