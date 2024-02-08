import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styles from '../css/LoadingSpinner.module.css';


export default function LoadingSpinner() {
  return (
    <Box sx={{ display: 'flex' }} className={styles.spinner}>
      <CircularProgress />
    </Box>
  );
}