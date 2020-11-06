import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    '& dt': {
      marginTop: theme.spacing(2)
    }
  }
}));

function FAQS({ className, ...rest }) {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h1"
          color="textPrimary"
        >
          About Hollow knights Team
        </Typography>
        <Box my={3}>
          <Divider />
        </Box>
        <Grid
          container
          spacing={3}
          component="dl"
        >
          <Grid
            item
            xs={12}
            md={6}
          >
            <Typography
              variant="overline"
              color="secondary"
            >
              What inspired us to make lobbi 
            </Typography>
            <Box mt={6}>
              <dd>
                <Typography
                  variant="h4"
                  color="textPrimary"
                >
                  Believing in design
                </Typography>
              </dd>
              <dt>
                <Typography
                  variant="body1"
                  color="textSecondary"
                >
                  We are strongly focused on doing great software experiences
                  instead of just okay software
                </Typography>
              </dt>
            </Box>
            <Box mt={6}>
              <dd>
                <Typography
                  variant="h4"
                  color="textPrimary"
                >
                  Learning to work with the right resources
                </Typography>
              </dd>
              <dt>
                <Typography
                  variant="body1"
                  color="textSecondary"
                >
                  Hollow knights is inspired by taking part of the big tech
                  globalization world, we know this is not the time for doing
                  all the stuff from zero, so Lobbi is the right opportunity to
                  learn how to merge with the best supported technologies
                </Typography>
              </dt>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <Typography
              variant="overline"
              color="secondary"
            >
              React is the way
            </Typography>
            <Box mt={6}>
              <dd>
                <Typography
                  variant="h4"
                  color="textPrimary"
                >
                  "Hollow knights is inspired by making beautiful products and React
                  is the perfect companion for this.
                  After following exhaustive searching for the best tools we found
                  React and Material Design as the best alternative for development
                  And further scaling"
                </Typography>
              </dd>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

FAQS.propTypes = {
  className: PropTypes.string
};

export default FAQS;
