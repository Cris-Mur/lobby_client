import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  FormHelperText,
  SvgIcon,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import { Trash as TrashIcon } from 'react-feather';
import wait from 'src/utils/wait';
import axios from 'src/utils/axios';
const useStyles = makeStyles((theme) => ({
  root: {},
  confirmButton: {
    marginLeft: theme.spacing(2)
  }
}));

function AddEditEventForm({
  event,
  mode,
  onAdd,
  onCancel,
  onDelete,
  onEdit
}) {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useSelector((state) => state.account);
  const subscriptores = event.suscriptors || []
  const classes = useStyles();
  
  const GenerateTemplate = () => {
    if (user.role === 'USER_ROLE') {
      return (
          <Formik
            initialValues={{
              start: event.start || 852076800000,
              id: event._id || null,
            }}
            onSubmit={async (values, {
              resetForm,
              setErrors,
              setStatus,
              setSubmitting
            }) => {
              try {
                const data = {
                  ...values
                };
                // console.log(data);
                // Make API request depending on mode type
                // If editting an event, here should make a patch request
                // else a post request
                await wait(200);

                // On post request server should return an ID
                if (mode === 'edit') {
                  axios.patch(`${process.env.REACT_APP_LOCALHOST}/calendars/events/${data.id}`)
                    .then(function (success) {
                      if (success.status === 200 || 201) {
                        console.log(success)
                        enqueueSnackbar('Sub success', {
                                        variant: 'success'
                          });
                      }
                    })
                    .catch(function (error) {
                      if (error.response) {
                        enqueueSnackbar(`You are already subscribe, ${user.username}!`, {
                                        variant: 'error'
                          });
                      }
                    });
                } else {
                  enqueueSnackbar(`Can't do this, ${user.username}!`, {
                                  variant: 'error'
                  }
                );
                }
                resetForm();
                setStatus({ success: true });
                setSubmitting(false);

                if (mode === 'edit') {
                  onEdit(data);
                }
              } catch (error) {
                setStatus({ success: false });
                setErrors({ submit: error.message });
                setSubmitting(false);
                enqueueSnackbar('Can\'t save nothing', {
                  variant: 'error'
                });
              }
            }}
          >
            {({
              errors,
              handleSubmit,
              isSubmitting,
              setFieldTouched,
              setFieldValue,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box p={3}>
                  <Typography
                    align="center"
                    gutterBottom
                    variant="h3"
                    color="textPrimary"
                  >
                    {mode === 'edit' ? 'Subscribe 😀' : 'Subscribe 😀'}
                  </Typography>
                </Box>
                <Box p={3}>
                  <Box mt={2}>
                    <DateTimePicker
                      fullWidth
                      inputVariant="outlined"
                      label="Date"
                      name="start"
                      onClick={() => setFieldTouched('end')}
                      onChange={(date) => setFieldValue('start', date)}
                      value={values.start}
                      minutesStep={60}
                      disablePast='false'
                      readOnly={true}
                    />
                  </Box>
                  <Box mt={2}>
                    <List dense className={classes.root}>
                      {
                        Object.values(subscriptores).map((l, i) => (
                          <ListItem key={i} button>
                            <ListItemAvatar>
                              <Avatar className={classes.avatar} src={l.avatar} />
                            </ListItemAvatar>
                          <ListItemText primary={`${l.username} has suscribed`} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                  {Boolean(touched.end && errors.end) && (
                    <Box mt={2}>
                      <FormHelperText error>
                        {errors.end}
                      </FormHelperText>
                    </Box>
                  )}
                </Box>
                <Divider />
                <Box
                  p={2}
                  display="flex"
                  alignItems="center"
                >
                  {mode === 'edit' && (
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.confirmButton}
                      onClick={() => onDelete(event._id)}
                    >
                      UnSubscribe
                    </Button>
                  )}
                  <Box flexGrow={1} />
                  <Button onClick={onCancel}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                    color="secondary"
                    className={classes.confirmButton}
                  >
                    Subscribe
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        );
    }
    else {
      return (
          <Formik
            initialValues={{
              color: event.color || '',
              limit: event.limit || '',
              end: event.end || moment(),
              start: event.start || 852076800000,
              title: event.title || '',
              id: event._id || null,
            }}
            validationSchema={Yup.object().shape({
              limit: Yup.string().max(3),
            })}
            onSubmit={async (values, {
              resetForm,
              setErrors,
              setStatus,
              setSubmitting
            }) => {
              try {
                const data = {
                  ...values
                };
                console.log(data);
                // Make API request depending on mode type
                // If editting an event, here should make a patch request
                // else a post request
                await wait(200);

                // On post request server should return an ID
                const token = 'Bearer ' + window.localStorage.getItem('accessToken');
                if (mode === 'add') {
                  const date_S = new Date(data.start);
                  const date_E = new Date(data.end);
                  console.log(data.start);
                  data.start = date_S.getTime();
                  data.end = date_E.getTime();
                  console.log(data.limit)
                  axios.post(`${process.env.REACT_APP_LOCALHOST}/calendars/events`, data, { headers: { accessToken: token } })
                    .then(function (success) {
                      if (success.status === 200 || 201) {
                        console.log(success)
                        enqueueSnackbar('Save Success', {
                                        variant: 'success'
                          });
                      }
                    })
                    .catch(function (error) {
                      if (error.response) {
                        enqueueSnackbar(`Can't do this, ${user.username}!`, {
                                        variant: 'error'
                          });
                      }
                    });
                } else {
                  console.log(data.start);
                  axios.patch(`${process.env.REACT_APP_LOCALHOST}/calendars/events`, data, {headers: {accessToken: token}})
                    .then(function (success) {
                      if (success.status === 200 || 201) {
                        console.log(success)
                        enqueueSnackbar('Save Success', {
                                        variant: 'success'
                          });
                      }
                    })
                    .catch(function (error) {
                      if (error.response) {
                        enqueueSnackbar(`Can't do this, ${user.username}!`, {
                                        variant: 'error'
                          });
                      }
                    });
                }
                resetForm();
                setStatus({ success: true });
                setSubmitting(false);

                if (mode === 'add') {
                  onAdd(data);
                } else {
                  onEdit(data);
                }
              } catch (error) {
                setStatus({ success: false });
                setErrors({ submit: error.message });
                setSubmitting(false);
                enqueueSnackbar('Can\'t save nothing', {
                  variant: 'error'
                });
              }
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              setFieldTouched,
              setFieldValue,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box p={3}>
                  <Typography
                    align="center"
                    gutterBottom
                    variant="h3"
                    color="textPrimary"
                  >
                  </Typography>
                  <Typography
                    align="center"
                    gutterBottom
                    variant="h3"
                    color="textPrimary"
                  >
                    {mode === 'add' ? 'Add block hour ⏰' : 'Edit block hour ⏰'}
                  </Typography>
                </Box>
                <Box p={3}>
                  <Box mt={2}>
                    <TextField
                      error={Boolean(touched.limit && errors.limit)}
                      fullWidth
                      helperText={touched.limit && errors.limit}
                      label="Limit"
                      name="limit"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Box>
                  <Box mt={2}>
                  </Box>
                  <Box mt={2}>
                    <DateTimePicker
                      fullWidth
                      inputVariant="outlined"
                      label="Socket Start"
                      name="start"
                      onClick={() => setFieldTouched('end')}
                      onChange={(date) => setFieldValue('start', date)}
                      value={values.start}
                      minutesStep={60}
                      disablePast= 'false'
                    />
                  </Box>
                  <Box mt={2}>
                    <List dense className={classes.root}>
                      {
                        Object.values(subscriptores).map((l, i) => (
                          <ListItem key={i} button>
                            <ListItemAvatar>
                              <Avatar className={classes.avatar} src={l.avatar} />
                            </ListItemAvatar>
                          <ListItemText primary={`${l.username} has suscribed`} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                  {Boolean(touched.end && errors.end) && (
                    <Box mt={2}>
                      <FormHelperText error>
                        {errors.end}
                      </FormHelperText>
                    </Box>
                  )}
                </Box>
                <Divider />
                <Box
                  p={2}
                  display="flex"
                  alignItems="center"
                >
                  {mode === 'edit' && (
                    <IconButton onClick={() => onDelete(event._id)}>
                      <SvgIcon>
                        <TrashIcon />
                      </SvgIcon>
                    </IconButton>
                  )}
                  <Box flexGrow={1} />
                  <Button onClick={onCancel}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                    color="secondary"
                    className={classes.confirmButton}
                  >
                    Confirm
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        );
    }
  }
  return <GenerateTemplate/>

}

AddEditEventForm.propTypes = {
  event: PropTypes.object,
  mode: PropTypes.oneOf(['add', 'edit']).isRequired,
  onAdd: PropTypes.func,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func
};

AddEditEventForm.defaultProps = {
  event: {},
  onAdd: () => {},
  onCancel: () => {},
  onDelete: () => {},
  onEdit: () => {}
};

export default AddEditEventForm;
