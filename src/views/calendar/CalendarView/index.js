import React, {
  useCallback,
  useState,
  useRef,
  useEffect
} from 'react';
import moment from 'moment';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timelinePlugin from '@fullcalendar/timeline';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import {
  Box,
  Container,
  Paper,
  useTheme,
  useMediaQuery,
  makeStyles
} from '@material-ui/core';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/list/main.css';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Page from 'src/components/Page';
import Header from './Header';
import Toolbar from './Toolbar';
import AddEditEventModal from './AddEditEventModal';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  calendar: {
    
    '& .fc-unthemed .fc-list-item:hover td': {
      backgroundColor: theme.palette.background.dark
    },
    '& .fc-time-grid .fc-slats td': {
      contentHeight: 'auto',
      height: '3em'
    },
    '& .fc-unthemed .fc-divider': {
      backgroundColor: theme.palette.background.dark
    },
    '& .fc-unthemed .fc-popover .fc-header': {
      backgroundColor: theme.palette.background.dark
    },
    '& .fc-unthemed .fc-list-heading td': {
      backgroundColor: theme.palette.background.dark
    },
    '& .fc-unthemed th': {
      borderColor: theme.palette.divider
    },
    '& .fc-unthemed td': {
      borderColor: theme.palette.divider
    },
    '& .fc-unthemed td.fc-today': {
      backgroundColor: theme.palette.background.dark
    },
    '& .fc-head': {
      backgroundColor: theme.palette.background.dark
    },
    '& .fc-body': {
      backgroundColor: theme.palette.background.default
    },
    '& .fc-axis': {
      ...theme.typography.body2
    },
    '& .fc-list-item-time': {
      ...theme.typography.body2
    },
    '& .fc-list-item-title': {
      ...theme.typography.body1
    },
    '& .fc-list-heading-main': {
      ...theme.typography.h6
    },
    '& .fc-list-heading-alt': {
      ...theme.typography.h6
    },
    '& .fc th': {
      borderColor: theme.palette.divider
    },
    '& .fc-day-header': {
      ...theme.typography.subtitle2,
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.text.secondary,
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.dark
    },
    '& .fc-day-top': {
      ...theme.typography.body2
    },
    '& .fc-highlight': {
      backgroundColor: theme.palette.background.dark
    },
    '& .fc-event': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      borderWidth: 2,
      opacity: 0.9,
      '& .fc-time': {
        ...theme.typography.h6,
        color: 'inherit'
      },
      '& .fc-title': {
        ...theme.typography.body1,
        color: 'inherit'
      }
    },
    '& .fc-list-empty': {
      ...theme.typography.subtitle1
    }
  }
}));

function CalendarView() {
  const classes = useStyles();
  const calendarRef = useRef(null);
  const isMountedRef = useIsMountedRef();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const [view, setView] = useState(mobileDevice ? 'dayGridMonth' : 'dayGridMonth');
  const [date, setDate] = useState(moment().toDate());
  const [events, setEvents] = useState(null);
  const [modal, setModal] = useState({
    event: null,
    mode: null,
    open: false
  });

  const { enqueueSnackbar } = useSnackbar();
  const { user } = useSelector((state) => state.account);
  const resetModal = () => {
    setModal({
      event: null,
      mode: null,
      open: false
    });
  };

  const handleDateToday = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  const handleViewChange = (newView) => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.changeView(newView);
      setView(newView);
    }
  };

  const handleDatePrev = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleDateNext = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  const handleEventAddClick = () => {
    setModal({
      mode: 'add',
      open: true,
      event: {
        description: '',
        end: moment().add(30, 'minutes').toDate(),
        start: moment().toDate(),
        title: '',
        _id: '',
      }
    });
  };

  const handleSlotsSelect = (arg) => {
    if (user.role === 'ADMIN_ROLE') {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.unselect();
    }

    setModal({
      event: {
        _id: arg._id,
        description: '',
        end: arg.end,
        start: arg.start,
        title: ''
      },
      mode: 'add',
      open: true
    });
    }
  };

  const handleEventAdd = (event) => {
    setEvents((prevEvents) => [...prevEvents, event]);
    resetModal();
    setEvents(getEvents());
    getEvents();
  };

  const handleEventDelete = (eventId) => {
    // console.log(eventId)
    // eventId = events.find((e) => e._id === eventId);
    //console.log(eventId)
    const token = 'Bearer ' + window.localStorage.getItem('accessToken');
    if (user.role === 'ADMIN_ROLE') {
      axios.delete(`${process.env.REACT_APP_LOCALHOST}/calendars/events`, { data: { _id: eventId }, headers: { accessToken: token } })
      .then(function (success) {
        if (success.status === 200 || 201) {
          enqueueSnackbar('Delete Success', {
            variant: 'success',
          });
        }
      })
      .catch(function (error) {
        if (error.response) {
          enqueueSnackbar(`Can't Delete this, ${user.username}!`, {
            variant: 'error'
          });
        }
      });
    } else {
      console.log(user.role);
      axios.delete(`${process.env.REACT_APP_LOCALHOST}/calendars/events/${eventId}`)
      .then(function (success) {
        if (success.status === 200 || 201) {
          console.log(success)
          enqueueSnackbar('Unsub success', {
                          variant: 'success'
            });
        }
      })
      .catch(function (error) {
        if (error.response) {
          enqueueSnackbar(`You are already unsubscribed, ${user.username}!`, {
                          variant: 'error'
            });
        }
      });
    }
    resetModal();
    setEvents(getEvents());
    getEvents();
  };

  const handleEventSelect = (arg) => {
    const token = 'Bearer ' + window.localStorage.getItem('accessToken');
    axios.get(`${process.env.REACT_APP_LOCALHOST}/accounts/me`, {headers: {accessToken: token}})
    .then(response => {
        const event = events.find((e) => e._id === arg.event._def.extendedProps._id);
        setModal({
          event: {...event},
          mode: 'edit',
          open: true
        });
      }
    ).catch(error => {
      console.log(error);
    });
  };

  const handleEventEdit = (event) => {
    setEvents((prevEvents) => prevEvents.map((prevEvent) => (
      prevEvent._id === event._id ? event : prevEvent
    )));
    resetModal();
    getEvents();
  };

  const handleEventResize = ({ event }) => {
    // Call API to update the event in database
    const hour = 3600000;
    let hours = (event.end - event.start) / 3600000;
    console.log(hours);
    const token = 'Bearer ' + window.localStorage.getItem('accessToken');
    for (let i = (Date.parse(event.start) + hour); i < Date.parse(event.end); i+= hour) {
      const resize = {
        limit: event._def.extendedProps.limit,
        start: i, // zi
      };
      
      axios.post(`${process.env.REACT_APP_LOCALHOST}/calendars/events`, resize, { headers: { accessToken: token } })
        .then(function (success) {
          if (i === Date.parse(event.end) - hour) {
            if (success.status === 200 || 201) {
              enqueueSnackbar(`Resize Success hours created: ${hours}`, {
                variant: 'success',
              });
            }
          }
        })
        .catch(function (error) {
          if (i === Date.parse(event.end) - hour) {
            if (error.response) {
              enqueueSnackbar(`Can't resize this, ${user.username}!`, {
                variant: 'error'
              });
            }
          }
        });
    }
    setEvents(getEvents());
    getEvents();
  };

  const handleEventDrop = ({ event }) => {
    // If you add a droppable area, check if event dropped inside or outside of calendar
    // Call API to update the event in database
    const droped = {
      id: event._def.extendedProps._id,
      start: event.start
    };
    const token = 'Bearer ' + window.localStorage.getItem('accessToken');
    //console.log(event.start);
    if (event.start > Date.now()) {
      axios.patch(`${process.env.REACT_APP_LOCALHOST}/calendars/events`, droped, { headers: { accessToken: token } })
      .then(function (success) {
        if (success.status === 200 || 201) {
          enqueueSnackbar('Edit Success', {
                          variant: 'success'
            });
        }
      })
      .catch(function (error) {
        if (error.response) {
          enqueueSnackbar(`Can't edit this, ${user.username}`, {
                          variant: 'error'
            });
        }
      });
    } else {
      enqueueSnackbar(`Can't edit this, ${user.username}`, {
        variant: 'error'
      });
    }
    
    setEvents((prevEvents) => prevEvents.map((prevEvent) => (prevEvent._id === event._id ? ({
      ...prevEvent,
      start: Date.parse(event.start),
      end: (Date.parse(event.start) + 3600000),
    }) : prevEvent)));
    //console.log(event);
    setEvents(getEvents());
    getEvents();
  };

  const handleModalClose = () => {
    resetModal();
  };

  const getEvents = useCallback(async () => {
    const token = 'Bearer ' + window.localStorage.getItem('accessToken');
    //console.log(token);
    const result = await axios.get(`${process.env.REACT_APP_LOCALHOST}/calendars`,{headers: {accessToken: token}})
    
    if (isMountedRef.current) {
      setEvents(result.data.events);
    }
      
    }, [isMountedRef]);

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  useEffect(() => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = mobileDevice ? 'timeGridWeek' : 'timeGridWeek';

      calendarApi.changeView(newView);
      setView(newView);
    }
  }, [mobileDevice]);

  if (!events) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Calendar"
    >
      <Container maxWidth={false}>
        <Header onEventAdd={handleEventAddClick} />
        <Toolbar
          date={date}
          onDateNext={handleDateNext}
          onDatePrev={handleDatePrev}
          onDateToday={handleDateToday}
          onViewChange={handleViewChange}
          view={view}
        />
        <Paper
          className={classes.calendar}
          component={Box}
          mt={3}
          p={2}
        >
          <FullCalendar
            defaultDate={date}
            defaultView={view}
            droppable
            editable
            eventClick={handleEventSelect}
            eventDrop={handleEventDrop}
            eventLimit
            eventResizableFromStart
            eventResize={handleEventResize}
            events={events}
            header={false}
            height={800}
            weight={50}
            ref={calendarRef}
            rerenderDelay={10}
            select={handleSlotsSelect}
            selectable
            weekends
            allDaySlot={false}
            slotDuration='01:00:00'
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
              timelinePlugin
            ]}
          />
        </Paper>
        <AddEditEventModal
          event={modal.event}
          mode={modal.mode}
          onAdd={handleEventAdd}
          onCancel={handleModalClose}
          onDelete={handleEventDelete}
          onEdit={handleEventEdit}
          open={modal.open}
        />
      </Container>
    </Page>
  );
}

export default CalendarView;
