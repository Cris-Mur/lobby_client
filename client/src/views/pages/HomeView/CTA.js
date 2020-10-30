import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Container,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.background.default,
    backgroundColor: theme.palette.background.dark,
    paddingTop: 128,
    paddingBottom: 128,
  },
  browseButton: {
    marginLeft: theme.spacing(2)
  },
  center: {
    placeContent: 'center'
  }
}));

function CTA({ className, ...rest }) {
  const classes = useStyles();

  return (
  <Fragment>
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth="lg">
        <Box>
        <Typography
          variant="h1"
          align="center"
          color="textSecondary"
        >
          less bot, more kiwi
        </Typography>
        </Box>
        <Box display="flex" className={classes.center}>
            <div className={classes.image}>
              <video width="750" height="500" controls autoPlay muted>
                  <source src="/static/home/Web Presentation.mp4" type="video/mp4"/>
              </video>
            {/* <video src='/home/manga/All_in_one/kiwi_platform/client/public/static' autoPlay width="1280" height="720" controls /> */}
                {/* <source src="/static/home/kiwi_landing.mp4" type="video/mp4"/> */}
            {/* </video> */}
          </div>
        </Box>
      </Container>
    </div>
  </Fragment>
  );
}

CTA.propTypes = {
  className: PropTypes.string
};

export default CTA;
