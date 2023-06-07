import { List, ListItem, ListItemText } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { SplitScreen } from '../shared';

export const RecipePage = () => {

    return (
      <SplitScreen leftWeight={1} rightWeight={5}>
         <nav aria-label="secondary mailbox folders">
          <List>
            <ListItem disablePadding>
              <Link to={ "create" }>
                <ListItemText primary="Create New Recipe" />
              </Link>
            </ListItem>
          </List>
        </nav>
       <Outlet />
      </SplitScreen>
    );
}
  
export default RecipePage;