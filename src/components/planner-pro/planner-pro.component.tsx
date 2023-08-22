import { Backdrop, Box, Button, Fade, Modal, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { PlannerDayProComponent } from "./planner-day-pro.component";
import styled from 'styled-components';
import { SplitScreen } from "../common";
import { TabPanel } from "../common/tab-panel.component";
import { useNavigate, useParams } from "react-router-dom";
import { daysArray } from "../../utils/constants";
import { PlanPro } from "../../interfaces/PlanPro";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { getLocalAuthToken } from "../../utils/auth";

  const Item = styled.div`
    padding: 10px;
    text-align: center;
  `;

export const PlannerPro = () => {
    const [ plan, setPlan ] = useState<PlanPro | undefined>(undefined);
    const [ selectedTab, setSelectedTab ] = useState(0);
    const [ showDeleteModal, setShowDeleteModal ] = useState(false);

    const { planId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
       getPlan();
      }, []);

      async function getPlan() {
        const res = await fetch(`http://localhost:3002/api/planner-pro/${ planId }`);
        const json = await res.json();
        console.log(json);
        setPlan(json);
      }

      const handleChange = (event: React.SyntheticEvent, newTab: number) => {
        setSelectedTab(newTab);
      };

      const getRemainingMacros = (actual: number | undefined, goal: number | undefined) => {
        if (actual === undefined || goal === undefined) {
            return 0;
        } else {
            return goal - actual;
        }
      }

      const handleCloseModal = () => {
        setShowDeleteModal(false);
      }

      const handleShowModal = () => {
        setShowDeleteModal(true);
      }

      const handleDelete = async () => {
        const res = await fetch(`http://localhost:3002/api/planner-pro/${ plan?.id }`, {
            method: 'DELETE',
            headers: {
            'Authorization': 'Bearer' + getLocalAuthToken(),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
           });
        console.log(res);
        return navigate('/planner-pro')
      }


    return (
      <>
        <SplitScreen leftWeight={1} rightWeight={5}>
          <Paper sx={{ margin: '20px'}} elevation={3}>
            <Stack direction="column" spacing={1}>
              <Item>
                <Typography sx={{ fontSize: '11px', color: 'grey', textTransform: 'uppercase'}}>Daily Averages</Typography>
              </Item>
              <Item>
                <Typography>Calories</Typography>
                <Typography>{ plan?.dailyMacros.calories }</Typography>
              </Item>
              <Item>
                <Typography>Protein</Typography>
                <Typography>{ plan?.dailyMacros.protein }</Typography>
              </Item>
              <Item>
                  <Typography>Carbs</Typography>
                  <Typography>{ plan?.dailyMacros.carbs }</Typography>
              </Item>
              <Item>
                  <Typography>Fat</Typography>
                  <Typography>{ plan?.dailyMacros.fat }</Typography>
              </Item>
            </Stack>
            </Paper>
            <Box sx={{ width: '100%', padding: '15px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
                  <Typography sx={{ fontSize: '16px', textTransform: 'uppercase'}}>{ plan?.title }</Typography>
                  <DeleteForeverIcon onClick={ handleShowModal } sx={{ fontSize: '30px', cursor: 'pointer', marginLeft: '10px'}} color='action'/>
                </Box>
                
                    
               <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={ selectedTab } onChange={ handleChange } aria-label="tab container">
                      {
                        daysArray.map((day, index) => (
                          <Tab key={ day } label={ day } id={`simple-tab-${index}`}  />
                        ))
                      }
                    </Tabs>
                </Box>
                {
                    plan?.planDays.map(day => (
                        <TabPanel key={ day.id } value={ selectedTab } index={ day.day }>
                            <PlannerDayProComponent
                                day={ day }
                                label= { daysArray[selectedTab] }
                                handleUpdates={ getPlan }
                            />
                        </TabPanel>
                    ))
                }
            </Box>
            
        </SplitScreen>
        <Modal
                open={ showDeleteModal }
                onClose={ handleCloseModal }
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={ showDeleteModal }>
                    <Box sx={{
                        position: 'absolute' as 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4
                    }}>
                    <Typography>Are you sure you want to delete { plan?.title }?</Typography>
                    <Button onClick={ handleCloseModal }>Cancel</Button>
                    <Button onClick={ handleDelete }>Confirm</Button>
                </Box>
            </Fade>
        </Modal>
      </>
    )
}

export default PlannerPro;