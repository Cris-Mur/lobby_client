import React, { useState, useEffect } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Button,
  Collapse,
  ListItem,
  makeStyles
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import useSettings from 'src/hooks/useSettings';
import { THEMES } from 'src/constants';

const useStyles = makeStyles((theme) => ({
  item: {
    display: 'block',
    paddingTop: 0,
    paddingBottom: 0
  },
  itemLeaf: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: theme.palette.text.secondary,
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%'
  },
  buttonLeaf: {
    color: theme.palette.text.secondary,
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightRegular,
    '&.depth-0': {
      '& $title': {
        fontWeight: theme.typography.fontWeightMedium
      }
    }
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  title: {
    marginRight: 'auto'
  },
  active: {
    color: theme.palette.secondary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium
    },
    '& $icon': {
      color: theme.palette.secondary.main
    }
  }
}));

function NavItem({
  title,
  href,
  depth,
  children,
  icon: Icon,
  className,
  open: openProp,
  info: Info,
  ...rest
}) {
  const settings = useSettings();
  const [fillc, setFill] = useState({ fill_color: '', bcMain: '', bcSecond: ''})

  useEffect(() => {
    if (settings.settings.theme === THEMES.LIGHT) {
      setFill({
        fill_color: '#000000',
        bcMain: '#0082fc',
        bcSecond: '#0082fc'
      })
    }
    else if (settings.settings.theme === THEMES.CORAL) {
      setFill({
        fill_color: '#000000',
        bcMain: '#FF6F73',
        bcSecond: '#FF6F73'
      })
    }
    else if (settings.settings.theme === THEMES.DARK){
      setFill({
        fill_color: '#000000',
        bcMain: '#3EE1D8',
        bcSecond: '#3EE1D8'
      })
    }
    else if (settings.settings.theme === THEMES.KIWI){
      setFill({
        fill_color: '#000000',
        bcMain: '#5F5CFE',
        bcSecond: '#5F5CFE'
      })
    }
    else {
      setFill({
        fill_color: '#100782',
        bcMain: '#0082fc',
        bcSecond: '#0082fc'
      })
    }
  }, [settings]);
  const classes = useStyles();
  const [open, setOpen] = useState(openProp);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  let paddingLeft = 8;

  if (depth > 0) {
    paddingLeft = 32 + 8 * depth;
  }

  const style = { paddingLeft };

  if (children) {
    return (
      <ListItem
        className={clsx(classes.item, className)}
        disableGutters
        key={title}
        {...rest}
      >
        <Button
          className={classes.button}
          onClick={handleToggle}
          style={style}
        >
          {Icon && (
            <Icon
              className={classes.icon}
              size="20"
              fill={fillc.fill_color}
            />
          )}
          <span className={classes.title}>
            {title}
          </span>
          {open ? (
            <ExpandLessIcon
              size="small"
              color="inherit"
            />
          ) : (
            <ExpandMoreIcon
              size="small"
              color="inherit"
            />
          )}
        </Button>
        <Collapse in={open}>
          {children}
        </Collapse>
      </ListItem>
    );
  }

  return (
    <ListItem
      className={clsx(classes.itemLeaf, className)}
      disableGutters
      key={title}
      {...rest}
    >
      <Button
        activeClassName={classes.active}
        className={clsx(classes.buttonLeaf, `depth-${depth}`)}
        component={RouterLink}
        exact
        style={style}
        to={href}
      >
        {Icon && (
          <Icon
            className={classes.icon}
            size="20"
            fill={fillc.fill_color}
            bcmain={fillc.bcMain}
            bcsecond={fillc.bcSecond}
          />
        )}
        <span className={classes.title}>
          {title}
        </span>
        {Info && <Info className={classes.info} />}
      </Button>
    </ListItem>
  );
}

NavItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  depth: PropTypes.number.isRequired,
  href: PropTypes.string,
  icon: PropTypes.any,
  info: PropTypes.any,
  open: PropTypes.bool,
  title: PropTypes.string.isRequired
};

NavItem.defaultProps = {
  open: false
};

export default NavItem;
