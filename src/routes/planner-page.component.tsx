import { List, ListItem, ListItemText } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { SplitScreen } from '../components/common';

  
export const PlannerPage = () => {

    return (
      <Outlet />
    );
}
  
export default PlannerPage;