import { Box, Divider, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Plan } from "../../interfaces/Plan";
import PlannerDay from "./planner-day.component";
import styled from 'styled-components';
import { SplitScreen } from "../common";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  const Item = styled.div`
    padding: 10px;
    text-align: center;
  `;

export const PlannerCreate = () => {

    const [ plan, setPlan ] = useState<Plan | undefined>(undefined);
    const [ selectedTab, setSelectedTab ] = useState(0);

    useEffect(() => {
       getPlan();
      }, []);

      async function getPlan() {
        const res = await fetch('http://localhost:3002/api/planner/2');
        const json = await res.json();
        console.log(json);
        setPlan(json);
      }

      function tabAttr(index: number) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
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

      const getGoalMacros = () => {
        return {
          calories: plan!.calories,
          carbs: plan!.carbs,
          fat: plan!.fat,
          protein: plan!.protein
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
                <Typography>{ plan?.dailyMacros.calories } / { plan?.calories }</Typography>
              </Item>
              <Item>
                <Typography>Protein</Typography>
                <Typography>{ plan?.dailyMacros.protein } / { plan?.protein }</Typography>
              </Item>
              <Item>
                  <Typography>Carbs</Typography>
                  <Typography>{ plan?.dailyMacros.carbs } / { plan?.carbs }</Typography>
              </Item>
              <Item>
                  <Typography>Fat</Typography>
                  <Typography>{ plan?.dailyMacros.fat } / { plan?.fat }</Typography>
              </Item>
            </Stack>
            </Paper>
            <Box sx={{ width: '100%', padding: '15px' }}>
                <Typography sx={{ fontSize: '16px', textTransform: 'uppercase'}}>{ plan?.title }</Typography>
                    
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={ selectedTab } onChange={ handleChange } aria-label="tab container">
                        <Tab label="Sunday" {...tabAttr(0)} />
                        <Tab label="Monday" {...tabAttr(1)} />
                        <Tab label="Tuesday" {...tabAttr(2)} />
                        <Tab label="Wednesday" {...tabAttr(3)} />
                        <Tab label="Thursday" {...tabAttr(4)} />
                        <Tab label="Friday" {...tabAttr(5)} />
                        <Tab label="Saturday" {...tabAttr(6)} />
                    </Tabs>
                </Box>
                {
                    plan?.plannerDays.map(day => (
                        <TabPanel key={ day.id } value={ selectedTab } index={ day.day }>
                            <PlannerDay
                                foodBlocks={ day.foodBlocks }
                                actualMacros={ day.dailyMacros }
                                goalMacros={ getGoalMacros() }
                                handleUpdates={ getPlan }
                            />
                        </TabPanel>
                    ))
                }
            </Box>
        </SplitScreen>
    )
}

export default PlannerCreate;