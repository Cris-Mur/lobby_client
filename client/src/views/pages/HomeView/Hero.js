import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Container,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: 200,
    paddingBottom: 200,
    [theme.breakpoints.down('md')]: {
      paddingTop: 60,
      paddingBottom: 60
    },
    position: 'relative'
  },
  image: {
    perspectiveOrigin: 'left center',
    transformStyle: 'preserve-3d',
    perspective: 1500,
    '& > img': {
      maxWidth: '80%',
      height: 'auto',
      transform: 'rotateY(-35deg) rotateX(15deg)',
      backfaceVisibility: 'hidden',
      boxShadow: theme.shadows[16]
    }
  },
  shape: {
    position: 'absolute',
    top: 0,
    left: 0,
    '& > img': {
      maxWidth: '80%',
      height: 'auto'
    }
  },
  paperContainer: {
    backgroundImage: `url(${"/static/home/Hero.png"})`,
    height: '100vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
    
  }
}));

function Hero({ className, ...rest }) {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
            md={5}
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              height="100%"
            >
              <Typography
                variant="overline"
                color="secondary"
              >
                Introducing
              </Typography>
              <Typography
                variant="h1"
                color="textSecondary"
              >
                Kiwibot Lobbi
              </Typography>
              <Box mt={3}>
                <Typography
                  variant="body1"
                  color="textSecondary"
                >
                  Goodbye Excel, goodbye gdocs; work management gets smart,
                  prettier and cleaner. Color feedback gives you availability
                  information at first sight.
                  Ready to go further, Lobbi goes ahead with material UI components;
                  Lobbi rockets Kiwibot experience

                  Kiwibot is social, Lobbi is social and designed by people for people
                  Kiwibot is tech and Lobbi is prepared for growing
                </Typography>
              </Box>
              <Box mt={3}>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid item>
                    <Typography
                      variant="h1"
                      color="secondary"
                    >
                      5
                    </Typography>
                    <Typography
                      variant="overline"
                      color="textSecondary"
                    >
                      Colorful Themes.
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h1"
                      color="secondary"
                    >
                      UX
                    </Typography>
                    <Typography
                      variant="overline"
                      color="textSecondary"
                    >
                      Adaptative and fully Responsive.
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={7}
          >
            <Box position="relative">
              <div className={classes.shape}>
                <img
                  alt="Shapes"
                  src="/static/home/shapes.svg"
                />
              </div>
              <div className={classes.image}>
                <img
                  alt="Presentation"
                  src="/static/home/Hero.png"
                />
              </div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

Hero.propTypes = {
  className: PropTypes.string
};

export default Hero;
