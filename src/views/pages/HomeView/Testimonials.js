import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Container,
  Typography,
  makeStyles,
  SvgIcon,
  Link
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';


const userlist = [
  {
    subheader: 'Manga',
    items:
      {
        name: 'Manuel Acero',
        job: 'Front-end Developer',
        avatar: 'https://manga08.github.io/potfoliotest/images/HeroImg.jpg',
        href_github: 'https://github.com/Manga08',
        href_twitter: 'https://twitter.com/MangaAcero',
        href_likedin: 'https://www.linkedin.com/in/manuel-acero-acero/'
      }
  },
  {
    subheader: 'Cristian',
    items:
      {
        name: 'Cristian Murcia',
        job: 'Back-end Developer',
        avatar: 'https://avatars3.githubusercontent.com/u/28773000?s=400&u=74a594db642dc5adaff9e068496f96803028aa9a&v=4',
        href_github: 'https://github.com/cris-mur',
        href_twitter: 'https://twitter.com/PecheFeliz',
        href_likedin: 'https://www.linkedin.com/in/cris-mur/'
      }
  },
  {
    subheader: 'Diego',
    items:
      {
        name: 'Diego Romero',
        job: 'Back-end Developer and Designer',
        avatar: 'https://avatars2.githubusercontent.com/u/60360505?s=400&u=af60e7c92610db683ac70c9e0211b9823606dc21&v=4',
        href_github: 'https://github.com/Dev-Loup',
        href_twitter: 'https://twitter.com/Dev_Loup',
        href_likedin: 'https://www.linkedin.com/in/diego-devloup/'
      }
  }
];

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.background.dark,
    backgroundColor: theme.palette.background.default,
    paddingTop: 54,
    paddingBottom: 54,
    // display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    // textAlign: 'center',
  },
  image: {
    width: theme.spacing(40),
    height: theme.spacing(40),
    alignItems: 'center',
    justifyContent: 'center',
    // textAlign: 'center',
    textAlign: '-webkit-center'
  },
  font: {
    fontSize: '2rem'
  },
  icon: {
    fontSize: "3.5rem",
    margin: 10
  },
  center: {
    textAlign: '-webkit-center'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    flexWrap: 'wrap'
  },
  image_container: {
    // flexWrap: "wrap"
    textAlign: 'center'
  },
  title: {
    fontWeight: theme.typography.fontWeightRegular
  }
}));

function Testimonials({ className, ...rest }) {
  const classes = useStyles();
  console.log(userlist[0].items.name)
  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
      display="flex"
    >
        <Box mt={8} p={2} ml={4} className={classes.container}>
            <Typography
              variant="h2"
              align="center"
              color="secondary"
              className={classes.title}
            >
                Our amazing team
            </Typography>
          </Box>
      <Container maxWidth="md" className={classes.container}>
        <Box
            mt={8}
            display="flex"
            justifyContent="center"
            alignItems="center"
            className={classes.container}
          >
            <Box p={2} ml={2}>
              <Avatar src={userlist[0].items.avatar} className={classes.image} />
              <Box ml={2} p={2} center className={classes.image_container}>
                <Typography
                  color="textSecondary"
                  display="inline"
                  component="span"
                  className={classes.font}
                >
                    {userlist[0].items.name}
                </Typography>
              </Box>
                <Box ml={2} p={2} center className={classes.image_container}>
                  <Typography
                    color="textSecondary"
                    display="inline"
                    component="span"
                    className={classes.font}
                  >
                    {userlist[0].items.job}
                  </Typography>
              </Box>
              <Box ml={2} p={2} center className={classes.image_container}>
                <Link href={userlist[0].items.href_github} color="inherit" target="_blank">
                  <SvgIcon
                    color="secondary"
                    className={classes.icon}
                  >
                    <GitHubIcon />
                  </SvgIcon>
                </Link>
                <Link href={userlist[0].items.href_twitter} color="inherit" target="_blank">
                  <SvgIcon
                    color="secondary"
                    className={classes.icon}
                  >
                    <TwitterIcon />
                  </SvgIcon>
                </Link>
                <Link href={userlist[0].items.href_likedin} color="inherit" target="_blank">
                  <SvgIcon
                    color="secondary"
                    className={classes.icon}
                  >
                    <LinkedInIcon />
                  </SvgIcon>
                </Link>
              </Box>
            </Box>
        </Box>
        <Box
          mt={8}
          display="flex"
          justifyContent="center"
          alignItems="center"
          className={classes.container}
        >
          <Box p={2} ml={4}>
            <Avatar src={userlist[1].items.avatar} className={classes.image} />
            <Box ml={2} p={2} center className={classes.image_container}>
              <Typography
                color="textSecondary"
                display="inline"
                component="span"
                className={classes.font}
              >
                  {userlist[1].items.name}
              </Typography>
            </Box>
              <Box ml={2} p={2} center className={classes.image_container}>
                <Typography
                  color="textSecondary"
                  display="inline"
                  component="span"
                  className={classes.font}
                >
                  {userlist[1].items.job}
                </Typography>
            </Box>
            <Box ml={2} p={2} center className={classes.image_container}>
              <Link href={userlist[1].items.href_github} color="inherit" target="_blank">
                <SvgIcon
                  color="secondary"
                  className={classes.icon}
                >
                  <GitHubIcon />
                </SvgIcon>
              </Link>
              <Link href={userlist[1].items.href_twitter} color="inherit" target="_blank">
                <SvgIcon
                  color="secondary"
                  className={classes.icon}
                >
                  <TwitterIcon />
                </SvgIcon>
              </Link>
              <Link href={userlist[1].items.href_likedin} color="inherit" target="_blank">
                <SvgIcon
                  color="secondary"
                  className={classes.icon}
                >
                  <LinkedInIcon />
                </SvgIcon>
              </Link>
            </Box>
          </Box>
        </Box>
        <Box
          mt={8}
          display="flex"
          justifyContent="center"
          alignItems="center"
          className={classes.container}
        >
          <Box p={2} ml={4} className={classes.center}>
            <Avatar src={userlist[2].items.avatar} className={classes.image} />
            <Box ml={2} p={2} center className={classes.image_container}>
              <Typography
                color="textSecondary"
                display="inline"
                component="span"
                className={classes.font}
              >
                  {userlist[2].items.name}
              </Typography>
            </Box>
              <Box ml={2} p={2} center className={classes.image_container}>
                <Typography
                  color="textSecondary"
                  display="inline"
                  component="span"
                  className={classes.font}
                >
                  {userlist[2].items.job}
                </Typography>
            </Box>
            <Box ml={2} p={2} center className={classes.image_container}>
              <Link href={userlist[2].items.href_github} color="inherit" target="_blank">
                <SvgIcon
                  color="secondary"
                  className={classes.icon}
                >
                  <GitHubIcon />
                </SvgIcon>
              </Link>
              <Link href={userlist[2].items.href_twitter} color="inherit" target="_blank">
                <SvgIcon
                  color="secondary"
                  className={classes.icon}
                >
                  <TwitterIcon />
                </SvgIcon>
              </Link>
              <Link href={userlist[2].items.href_likedin} color="inherit" target="_blank">
                <SvgIcon
                  color="secondary"
                  className={classes.icon}
                >
                  <LinkedInIcon />
                </SvgIcon>
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

Testimonials.propTypes = {
  className: PropTypes.string
};

export default Testimonials;
