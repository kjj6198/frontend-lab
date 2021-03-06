import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader/root';
import {
  BrowserRouter, Switch, Route, Link,
} from 'react-router-dom';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, Typography } from '@material-ui/core';

import HomePageLoadable from '@/pages/HomePage/loadable';
import PianoRollLoadable from '@/projects/piano-roll/loadable';
import WaveformVisualizerLoadable from '@/projects/waveform-visualizer/loadable';
import SobelArtLodable from '@/projects/sobel-art/loadable';
// This is whole app entry, with hot module reload.
// react-hot-loader will automatically handle production.

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex-grow: 1;
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const App = () => (
  <BrowserRouter>
    <Container>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            <StyledLink to="/">
              {'Kalan\'s Frontend Lab'}
            </StyledLink>
          </Typography>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route exact path="/" component={HomePageLoadable} />
        <Route path="/piano-roll" component={PianoRollLoadable} />
        <Route path="/waveform-visualizer" component={WaveformVisualizerLoadable} />
        <Route path="/sobel-art" component={SobelArtLodable} />
      </Switch>
    </Container>
  </BrowserRouter>
);

export default hot(App);
