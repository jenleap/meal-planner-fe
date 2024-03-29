import { List, ListItem, ListItemText } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { SplitScreen } from '../components/common';

  
export const FoodPage = () => {

    return (
      <SplitScreen leftWeight={1} rightWeight={5}>
         <nav aria-label="secondary mailbox folders">
          <List>
            <ListItem disablePadding>
              <Link to={ "create" }>
                <ListItemText primary="Create New Food" />
              </Link>
            </ListItem>
          </List>
        </nav>
       <Outlet />
      </SplitScreen>
    );
}
  
export default FoodPage;