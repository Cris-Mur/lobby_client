import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Toolbar,
  Hidden,
  Typography,
  Link,
  makeStyles
} from '@material-ui/core';
import { APP_VERSION } from 'src/config';
import Logo from 'src/components/Logo';
import Settings from '../DashboardLayout/TopBar/Settings';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default
  },
  toolbar: {
    height: 84
  },
  logo: {
    marginRight: theme.spacing(2),
    paddingTop: 0,
    paddingBottom: 0
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium,
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  },
  divider: {
    width: 1,
    height: 32,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  }
}));

function TopBar({ className, ...rest }) {
  const classes = useStyles();

  return (
    <AppBar
      className={clsx(classes.root, className)}
      color="default"
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          <Logo className={classes.logo} />
        </RouterLink>
        <Hidden mdDown>
          <Typography
            variant="caption"
            color="textSecondary"
          >
            Version
            {' '}
            {APP_VERSION}
          </Typography>
        </Hidden>
        <Box flexGrow={1} />
          <Box
            ml={2}
            flexGrow={1}
          />
            <Settings />
        {/* <Link
          className={classes.link}
          color="textSecondary"
          component={RouterLink}
          to="/app"
          underline="none"
          variant="body2"
        >
          Dashboard
        </Link> */}
        <Link
          className={classes.link}
          color="textSecondary"
          component={RouterLink}
          to="/login"
          underline="none"
          variant="body2"
        >
          View The page
        </Link>
        <Divider className={classes.divider} />
        <Button
          color="secondary"
          component="a"
          href="/login"
          variant="contained"
          size="small"
        >
          View the page
          <span role="img" aria-label="Winking_Face">😉</span>
      </Button>
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {
  className: PropTypes.string
};

export default TopBar;
