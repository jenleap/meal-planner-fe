import { Box, Divider, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { PlannerDayProComponent } from "./planner-day-pro.component";
import styled from 'styled-components';
import { SplitScreen } from "../common";
import { TabPanel } from "../common/tab-panel.component";
import { useParams } from "react-router-dom";
import { daysArray } from "../../utils/constants";
import { PlanPro } from "../../interfaces/PlanPro";

  const Item = styled.div`
    padding: 10px;
    text-align: center;
  `;

export const PlannerPro = () => {

    const [ plan, setPlan ] = useState<PlanPro | undefined>(undefined);
    const [ selectedTab, setSelectedTab ] = useState(0);

    const { planId } = useParams();

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


    return (
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
                <Typography sx={{ fontSize: '16px', textTransform: 'uppercase'}}>{ plan?.title }</Typography>
                    
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
                                template={ plan.template }
                                handleUpdates={ getPlan }
                            />
                        </TabPanel>
                    ))
                }
            </Box>
        </SplitScreen>
    )
}

export default PlannerPro;