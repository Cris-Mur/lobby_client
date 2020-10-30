import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Container,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    paddingTop: 128,
    paddingBottom: 128
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  },
  center: {
    justifyContent: 'center'
  },
  image: {
    '& > img': {
      perspectiveOrigin: 'left',
      perspective: 1500,
      justifyContent: 'center',
      maxWidth: '100%',
      height: 'auto',
      marginTop: 30,
      marginBottom: 10,
      backfaceVisibility: 'hidden',
      boxShadow: theme.shadows[16]
    }
  },
}));

function Features({ className, ...rest }) {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth="lg">
        <Typography
          component="p"
          variant="overline"
          color="secondary"
          align="center"
        >
          Discover Lobbi By Kiwibot
        </Typography>
        <Typography
          variant="h1"
          align="center"
          color="textPrimary"
        >
          Play with Kiwibots
        </Typography>
        <Box mt={8}>
          <Grid
            container
            spacing={3}
            className={classes.center}
          >
            <Grid
              item
              xs={10}
              md={12}
              center
            >
              <Box display="flex">
                <Avatar className={classes.avatar}>
                  1
                </Avatar>
                <Box ml={2}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    color="textPrimary"
                  >
                    Fully customization
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                  >
                    Light, Coral, Dark, Kiwi and Midnight Blue; Lobbi experience recharged
                  </Typography>
                  </Box>
                </Box>
                  <Box display="flex" className={classes.center}>
                    <div className={classes.image}>
                      <img
                        alt="The dashboard"
                        src="/static/home/Dashboard.png"
                      />
                    </div>
                  </Box>
              <Box/>
            </Grid>
            <Grid
              item
              xs={10}
              md={12}
            >
              <Box display="flex">
                <Avatar className={classes.avatar}>
                  2
                </Avatar>
                <Box ml={2}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    color="textPrimary"
                  >
                    Administrator and Supervisors views
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                  >
                    Two roles, different options, Administrators and supervisors in the same place
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" className={classes.center}>
                    <div className={classes.image}>
                      <img
                        alt="Administrator and supervisor view"
                        src="/static/home/Supervisor.png"
                      />
                    </div>
                  </Box>
            </Grid>
            <Grid
              item
              xs={10}
              md={12}
            >
              <Box display="flex">
                <Avatar className={classes.avatar}>
                  3
                </Avatar>
                <Box ml={2}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    color="textPrimary"
                  >
                    Drag, Drop, Pop and take fun
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    gutterBottom
                  >
                    Create and edit events was never so easy, it works like magic
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" className={classes.center}>
                    <div className={classes.image}>
                      <img
                        alt="Calendar Gif"
                        src="/static/home/Calendar.png"
                      />
                    </div>
                  </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

Features.propTypes = {
  className: PropTypes.string
};

export default Features;
