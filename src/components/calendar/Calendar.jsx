import { useEffect, useState } from 'react';
import { Container, Paper, Grid, Alert, CircularProgress, Box } from '@mui/material';
import CalendarHeader from './CalenderHeader';
import EventDialog from './EventDialog';
import EventCard from './EventCard';
import { useEvents } from '../../hooks/useEvents';

const Calendar = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { 
    events = [], // Provide default empty array
    loading, 
    error, 
    fetchEvents, 
    createEvent, 
    updateEvent, 
    deleteEvent 
  } = useEvents();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Ensure events is always an array
  const safeEvents = Array.isArray(events) ? events : [];

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setOpenDialog(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setOpenDialog(true);
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      await deleteEvent(eventId);
    }
  };

  const handleSaveEvent = async (eventData) => {
    let success;
    if (selectedEvent) {
      success = await updateEvent(selectedEvent._id, eventData);
    } else {
      success = await createEvent(eventData);
    }
    if (success) {
      setOpenDialog(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <CalendarHeader onAddEvent={handleAddEvent} />
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {safeEvents.map((event) => (
              <Grid item xs={12} key={event._id}>
                <EventCard
                  event={event}
                  onEdit={handleEditEvent}
                  onDelete={handleDeleteEvent}
                />
              </Grid>
            ))}
            {safeEvents.length === 0 && !loading && (
              <Grid item xs={12}>
                <Alert severity="info">
                  No events found. Click "Add Event" to create your first event.
                </Alert>
              </Grid>
            )}
          </Grid>
        )}

        <EventDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onSave={handleSaveEvent}
          event={selectedEvent}
        />
      </Paper>
    </Container>
  );
};

export default Calendar;