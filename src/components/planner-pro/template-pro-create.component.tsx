import { Box, Tab, Tabs } from "@mui/material"
import { TabPanel } from "../common/tab-panel.component"
import { useEffect, useState } from "react";
import { TemplatePro } from "../../interfaces/TemplatePro";
import { TemplateDay } from "./template-day.component";
import { useParams } from "react-router-dom";

export const TemplateProCreate = () => {
    const [ selectedTab, setSelectedTab ] = useState(0); 
    const [ template, setTemplate ] = useState<TemplatePro | undefined>(undefined);

    const { templateId } = useParams();

    useEffect(() => {
        getTemplate();
    }, []);
 
       async function getTemplate() {
         const res = await fetch(`http://localhost:3002/api/planner-pro/templates/${ templateId }`);
         const json = await res.json();
         console.log(json);
         setTemplate(json);
       }

    const handleChange = (event: React.SyntheticEvent, newTab: number) => {
        setSelectedTab(newTab);
      };

    const getDays = () => {
        return template!.days.map(day => {
            return {
                value: day.id,
                label: `Day ${day.dayIndex + 1}`
            }
        })
    }

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={ selectedTab } onChange={ handleChange } aria-label="tab container">
                        {
                            template?.days.map(day => (
                                <Tab key={ `day-${day.dayIndex}` } label={ `Day ${ day.dayIndex + 1 }` } id={`day-${day.dayIndex}`  }  />
                            ))
                        }
                    </Tabs>
            </Box>
            { 
                template?.days.map(day => (
                    <TabPanel key={ `panel-${ day.dayIndex }` } value={ selectedTab } index={ day.dayIndex }>
                        <TemplateDay 
                            day={ day }
                            days={ getDays() }
                            handleUpdates={ getTemplate }
                        ></TemplateDay>
                    </TabPanel>
                ))
            }
                
        </>
    )
}