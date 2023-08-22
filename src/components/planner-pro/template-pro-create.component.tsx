import { Backdrop, Box, Button, Fade, Modal, Tab, Tabs, Typography } from "@mui/material"
import { TabPanel } from "../common/tab-panel.component"
import { useEffect, useState } from "react";
import { TemplatePro } from "../../interfaces/TemplatePro";
import { TemplateDay } from "./template-day.component";
import { useNavigate, useParams } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { getLocalAuthToken } from "../../utils/auth";

export const TemplateProCreate = () => {
    const [ selectedTab, setSelectedTab ] = useState(0); 
    const [ template, setTemplate ] = useState<TemplatePro | undefined>(undefined);
    const [ showDeleteModal, setShowDeleteModal ] = useState(false);

    const { templateId } = useParams();

    const navigate = useNavigate();

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

    const handleCloseModal = () => {
        setShowDeleteModal(false);
      }

      const handleShowModal = () => {
        setShowDeleteModal(true);
      }

      const handleDelete = async () => {
        const res = await fetch(`http://localhost:3002/api/planner-pro/templates/${ template?.id }`, {
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px}'}}>
                  <Typography sx={{ fontSize: '16px', textTransform: 'uppercase'}}>{ template?.title }</Typography>
                  <DeleteForeverIcon onClick={ handleShowModal } sx={{ fontSize: '30px', cursor: 'pointer', marginLeft: '10px'}} color='action'/>
                </Box>
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
                        <Typography>Are you sure you want to delete { template?.title }?</Typography>
                        <Button onClick={ handleCloseModal }>Cancel</Button>
                        <Button onClick={ handleDelete }>Confirm</Button>
                    </Box>
                </Fade>
            </Modal>   
        </>
    )
}