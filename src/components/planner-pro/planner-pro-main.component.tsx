import { Accordion, AccordionDetails, AccordionSummary, Backdrop, Box, Button, Divider, Fade, FormControl, InputLabel, List, ListItem, MenuItem, Modal, Paper, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { getLocalAuthToken } from "../../utils/auth";
import { daysArray } from "../../utils/constants";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, redirect, useNavigate } from "react-router-dom";
import { TemplatePro } from "../../interfaces/TemplatePro";
import { PlanPro } from "../../interfaces/PlanPro";


export const PlannerProMain = () => {
    const [ showPlanList, setShowPlanList ] = useState(false);
    const [ plans, setPlans ] = useState<PlanPro[]>([]);
    const [ showTemplateList, setShowTemplateList ] = useState(false);
    const [ templates, setTemplates ] = useState<TemplatePro[]>([]);
    const [ showModal, setShowModal ] = useState(false);
    const [title, setTitle] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getTemplates();
        getPlans();
    }, []);
 
    async function getTemplates() {
        const res = await fetch(`http://localhost:3002/api/planner-pro/templates`);
        const json = await res.json();
        setTemplates(json.templates);
    }

    async function getPlans() {
        const res = await fetch(`http://localhost:3002/api/planner-pro`);
        const json = await res.json();
        setPlans(json.plans);
    }

    const openTemplateModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handlePlanClick = () => {
        setShowPlanList(true);
    }

    const handleTemplateClick = () => {
        setShowTemplateList(true);
    }

    const selectPlan = (id: number) => {
        navigate(`/planner-pro/${ id }`)
    }

    const selectTemplate = (id: number) => {
        navigate(`/planner-pro/template/${ id }`)
    }

    const handleCreateTemplate = async () => {
        const newTemplate = {
            title,
            days: daysArray.map((day, index) => {
                return {
                    dayIndex: index,
                    meals: []
                }
            })
        }

        const res = await fetch("http://localhost:3002/api/planner-pro/templates", {
            method: 'POST',
            headers: {
            'Authorization': 'Bearer' + getLocalAuthToken(),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTemplate)
        });

        const data = await res.json();
        
        console.log(data); 

        setTitle("");

        handleCloseModal();
        return navigate(`/create/${ data.id }`);
    };

    return (
        <>
            <Paper sx={{ padding: '15px', marginTop: '20px'}}>
                <Typography onClick={ handlePlanClick } sx={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '0.8rem'}}>Plans</Typography>
                <Typography onClick={ handlePlanClick }>View Plans</Typography>
                {(showPlanList) && 
                     <List>
                     { plans.map(plan => (
                         <ListItem key={ `plan-${ plan.id }`}>
                             <Typography onClick={ () => selectPlan(plan.id) }>{ plan.title }</Typography>
                         </ListItem>
                     ))}
                 </List>
                }
                
                <Link to="/planner-pro/create">
                    <Typography>Create a Plan</Typography>
                </Link>
            </Paper>
            <Paper sx={{ padding: '15px', marginTop: '20px'}}>
                <Typography sx={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '0.8rem'}}>Templates</Typography>
                <Typography onClick={ handleTemplateClick }>View Templates</Typography>
                {(showTemplateList) && 
                    <List>
                        { templates.map(template => (
                            <ListItem key={ `template-${template.id}` }>
                                <Typography onClick={ () => selectTemplate(template.id) }>{ template.title }</Typography>
                            </ListItem>
                        ))}
                    </List>
                }
                <Button onClick={ openTemplateModal }>Create a Template</Button>
            </Paper>
            
            <Modal
                open={ showModal }
                onClose={ handleCloseModal }
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={ showModal }>
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
                    <TextField 
                        key="title"  
                        label="Title" 
                        variant="outlined" 
                        value={ title }
                        onChange={ e => setTitle(e.target.value)}
                    />
                    <Button onClick={handleCreateTemplate}>Create Template</Button>
                </Box>
            </Fade>
        </Modal>
        </>
    )
}