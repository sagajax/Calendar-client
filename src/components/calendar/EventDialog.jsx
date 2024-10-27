import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Box
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';

const EventDialog = ({ open, onClose, onSave, event }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reminder, setReminder] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description || '');
      setStartDate(new Date(event.startDate));
      setEndDate(new Date(event.endDate));
      setReminder(event.reminder);
    } else {
      resetForm();
    }
  }, [event]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStartDate(new Date());
    setEndDate(new Date());
    setReminder(false);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!startDate) newErrors.startDate = 'Start date is required';
    if (!endDate) newErrors.endDate = 'End date is required';
    if (startDate && endDate && startDate > endDate) {
      newErrors.endDate = 'End date must be after start date';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        title,
        description,
        startDate,
        endDate,
        reminder
      });
      resetForm();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{event ? 'Edit Event' : 'Create Event'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={!!errors.title}
              helperText={errors.title}
              fullWidth
              required
            />
            
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={3}
              fullWidth
            />

            <DateTimePicker
              label="Start Date & Time"
              value={startDate}
              onChange={setStartDate}
              slotProps={{
                textField: {
                  error: !!errors.startDate,
                  helperText: errors.startDate
                }
              }}
            />

            <DateTimePicker
              label="End Date & Time"
              value={endDate}
              onChange={setEndDate}
              slotProps={{
                textField: {
                  error: !!errors.endDate,
                  helperText: errors.endDate
                }
              }}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={reminder}
                  onChange={(e) => setReminder(e.target.checked)}
                  color="primary"
                />
              }
              label="Set Reminder"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {event ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EventDialog;