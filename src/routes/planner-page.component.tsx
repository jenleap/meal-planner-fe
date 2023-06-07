import { List, ListItem, ListItemText } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { SplitScreen } from '../shared';

  
export const PlannerPage = () => {

    return (
      <SplitScreen leftWeight={1} rightWeight={5}>
         <nav aria-label="secondary mailbox folders">
          <List>
            <ListItem disablePadding>
              <Link to={ "create" }>
                <ListItemText primary="Create New Planner" />
              </Link>
            </ListItem>
          </List>
        </nav>
       <Outlet />
      </SplitScreen>
    );
}
  
export default PlannerPage;