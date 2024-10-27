import { Paper, Box, Typography, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { format } from 'date-fns';

const EventCard = ({ event, onEdit, onDelete }) => {
  return (
    <Paper 
      elevation={1} 
      sx={{ 
        p: 2,
        transition: 'all 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 2
        }
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box flex={1}>
          <Typography variant="h6" component="h2" gutterBottom>
            {event.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {format(new Date(event.startDate), 'PPp')} - 
            {format(new Date(event.endDate), 'PPp')}
          </Typography>
          {event.description && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              {event.description}
            </Typography>
          )}
          {event.reminder && (
            <Typography 
              variant="body2" 
              color="primary" 
              sx={{ mt: 1, display: 'flex', alignItems: 'center' }}
            >
              🔔 Reminder set
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton 
            onClick={() => onEdit(event)}
            size="small"
            sx={{ '&:hover': { color: 'primary.main' } }}
          >
            <EditIcon />
          </IconButton>
          <IconButton 
            onClick={() => onDelete(event._id)}
            size="small"
            sx={{ '&:hover': { color: 'error.main' } }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default EventCard;