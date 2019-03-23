import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Typography, Grid, Paper, Button,
} from '@material-ui/core';
import config from '@/config';

const StyledPaper = styled(Paper)`
  padding: 24px;
`;

const ContentWrapper = styled.div`
  width: 95%;
  max-width: 1280px;
  margin: 1em auto;
`;

const BackgroundImg = styled.div`
  width: 100%;
  padding-bottom: 250px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${props => `${config.assetPath}/${props.image}`});
`;

export default function HomePage() {
  return (
    <ContentWrapper>
      <Grid container spacing={16}>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <span>COLLECTIONS</span>
            <Typography variant="h4">前端特輯</Typography>
            <Typography variant="body1">
              一起來探索 Web Audio 吧！這裏是 Kalan 的實驗室，因為 audio
              很好玩，也因此有相當多的函式庫， 這裏會放一些我使用 Web Audio 製作的小作品。
              前端有許多好玩的領域，除了 UI 以外還有很多值得探索的地方。
            </Typography>
          </StyledPaper>
        </Grid>
      </Grid>
      <Grid container spacing={16}>
        {config.projects.map(project => (
          <Grid key={project.name} item xs={12} md={6}>
            <BackgroundImg image={project.image} />
            <Typography variant="headline">{project.name}</Typography>
            <Typography variant="body2">{project.description}</Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={project.path}
            >
              Go to Project
            </Button>
          </Grid>
        ))}
      </Grid>
    </ContentWrapper>
  );
}
