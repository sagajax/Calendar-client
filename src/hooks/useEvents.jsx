import { useState, useCallback } from 'react';
import api from '../services/api';

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/events');
      setEvents(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  }, []);

  const createEvent = async (eventData) => {
    try {
      await api.post('/events', eventData);
      await fetchEvents();
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create event');
      return false;
    }
  };

  const updateEvent = async (id, eventData) => {
    try {
      await api.put(`/events/${id}`, eventData);
      await fetchEvents();
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update event');
      return false;
    }
  };

  const deleteEvent = async (id) => {
    try {
      await api.delete(`/events/${id}`);
      await fetchEvents();
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete event');
      return false;
    }
  };

  return {
    events,
    loading,
    error,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  };
};


