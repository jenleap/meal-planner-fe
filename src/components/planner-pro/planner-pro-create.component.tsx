import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { TemplatePro } from "../../interfaces/TemplatePro";
import { getLocalAuthToken } from "../../utils/auth";
import { redirect, useNavigate } from "react-router-dom";

export const PlannerProCreate = () => {
    const [ title, setTitle ] = useState("");
    const [ templates, setTemplates ] = useState<TemplatePro[]>([]);
    const [ selectedTemplate, setSelectedTemplate ] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getTemplates();
    }, []);
 
    async function getTemplates() {
        const res = await fetch(`http://localhost:3002/api/planner-pro/templates`);
        console.log(res);
        const json = await res.json();
        console.log(json);
        setTemplates(json.templates);
    }

    const handleSelectChange = (event: SelectChangeEvent) => {
        setSelectedTemplate(event.target.value);
    }

    const handleCreate = async () => {
        const template = templates.filter(t => t.id === parseInt(selectedTemplate))[0];
        const days = template.days.map(day => {
            return {
                day: day.dayIndex,
                foodBlocks: day.meals.map(meal => {
                    return {
                        order: meal.order,
                        label: meal.label,
                        foodItems: [],
                        goalCarbs: meal.goalMacros.carbs,
                        goalProtein: meal.goalMacros.protein,
                        goalFat: meal.goalMacros.fat
                    }
                })
            }
        });
        const newPlan = {
            title: title,
            planDays: days
        };

        const res = await fetch("http://localhost:3002/api/planner-pro", {
            method: 'POST',
            headers: {
            'Authorization': 'Bearer' + getLocalAuthToken(),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPlan)
        });

        const data = await res.json();

        console.log(data);

        setTitle("");
        return navigate(`/planner-pro/${ data.id }`);
    }

    return (
        <>
            <Typography>Create a New Plan</Typography>
            <TextField 
                        key="title"  
                        label="Title" 
                        variant="outlined" 
                        value={ title }
                        onChange={ e => setTitle(e.target.value)}
                    />
            <Typography>Choose a template:</Typography>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Day</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={ selectedTemplate }
                    label="Day"
                    onChange={handleSelectChange}
                >
                    {
                        templates.map((template: TemplatePro) => (
                            <MenuItem key={ template.id } value={ template.id }>{ template.title }</MenuItem>
                        ))
                    }
                </Select>
                <Button onClick={ handleCreate }>Create</Button>
            </FormControl>
        </>
    )
}