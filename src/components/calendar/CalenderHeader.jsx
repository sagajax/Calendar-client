import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const CalendarHeader = ({ onAddEvent }) => {
  return (
    <Box
    display="flex" 
      justifyContent="space-between" 
      alignItems="center" 
      mb={3}
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        pb: 2
      }}>
    <Box 
      display="flex" 
      justifyContent="" 
      alignItems="center" 
      mb={3}
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        pb: 2,
      }}
    >
      <Typography variant="h4" component="h1">
        My Calendar
      </Typography>
      
    </Box>  

    <Box display="flex" justifyContent="space-between" mb={3} sx={{
      gap:5
    }}>
      <Button
        variant="contained"
        onClick={()=>{
          localStorage.removeItem('token');
          window.location.href = '/login';
        }}
      >
        Sign Out
      </Button>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAddEvent}
      >
        Add Event
      </Button>
    </Box>
    </Box>
  );
};

export default CalendarHeader;


