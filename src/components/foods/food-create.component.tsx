import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { FormEvent, useRef, useState } from 'react';
import styled from 'styled-components';
import { Accordion, AccordionDetails, AccordionSummary, Button, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Measure } from '../../interfaces/Measure';
import { Food } from '../../interfaces/Food';
import SmallNutrientDisplay from './SmallNutrientDisplay';
import { getLocalAuthToken } from '../../utils/auth';

const FoodCreate = () => {
    const [ name, setName ] = useState("");
    const [ brand, setBrand ] = useState("");
    const [ measureList, setMeasureList ] = useState<Measure[]>([]);
    const [ error, setError ] = useState("");

    const formRef = useRef<HTMLFormElement>(null);

    const addMeasure = (event: FormEvent<HTMLDivElement>) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            quantity: { value: string };
            measureLabel: { value: string };
            calories: { value: string };
            protein: { value: string };
            carbs: { value: string };
            fat: { value: string };
        };

        const newMeasure = {
            quantity: Number(target.quantity.value),
            label: target.measureLabel.value,
            calories: Number(target.calories.value),
            protein: Number(target.protein.value),
            carbs: Number(target.carbs.value),
            fat: Number(target.fat.value)
        };

        if (measureExists(newMeasure.label)) {
            setError("Measure already exists with this label.")
        } else {
            setError("")
            setMeasureList((prevMeasures) => [...prevMeasures, newMeasure]);

            if (formRef.current) {
                formRef.current.reset();
            }
        } 
    };

    const measureExists = (measure: string): boolean => {
        return measureList.filter(m => m.label === measure).length > 0;
    }

    const createFood = async () => {
        const newFood: Food = {
            name,
            brand,
            measures: measureList,
            isFood: true
        };

        console.log(newFood);

        const res = await fetch("http://localhost:3000/api/foods", {
            method: 'POST',
            headers: {
            'Authorization': 'Bearer' + getLocalAuthToken(),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFood)
           });
        console.log(res);
    }

    return (
        <>
        <Typography sx={{ margin: '30px 0 0 30px', fontWeight: 'bold'}}>Create New Food</Typography>
        <Box
            component="div"
            sx={{
                display: 'flex',
                padding: '30px'
              }}
        >  
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    flex: '2',
                    flexDirection: 'column',
                    gap: '10px',
                    marginRight: '50px'
                  }}
            >
                <TextField 
                    key="name"  
                    label="Name" 
                    variant="outlined" 
                    value={ name }
                    onChange={ e => setName(e.target.value)}
                />
                <TextField 
                    key="brand"  
                    label="Brand" 
                    variant="outlined" 
                    value={ brand }
                    onChange={ e => setBrand(e.target.value)}
                />

                <Box
                     component="div"
                     sx={{
                         border: '1px solid grey',
                         borderRadius: '2px',
                         padding: '15px',
                       }}
                >
                    <Typography>Serving Measures</Typography>
                    <Stack spacing={2}>
                        {
                            measureList.map((m: Measure) => (
                                <Accordion key={ m.label }>
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    >
                                    <Typography>{ m.quantity } { m.label }</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <SmallNutrientDisplay 
                                            calories={ m.calories }
                                            protein={ m.protein }
                                            carbs={ m.carbs }
                                            fat={ m.fat }
                                        />
                                    </AccordionDetails>
                                </Accordion> 
                            ))
                        }
                    </Stack>
                </Box>
                <Button sx={{ width: '30%'}} variant="outlined" onClick={createFood}>Create Food</Button>
            </Box>
            
            <Box
                component="form"
                sx={{
                    border: '1px solid grey',
                    borderRadius: '2px',
                    padding: '15px',
                    flex: 1
                  }}
                ref={ formRef }
                onSubmit={addMeasure}
            >
                <Box
                    component="div"
                    sx={{
                       margin: '10px',
                       display: 'flex',
                       gap: '10px',
                      }}
                >
                    {
                        (error.length > 0) && (
                            <Typography>{ error }</Typography>
                        )
                    }
                    <TextField sx={{ flex: '1'}} id="quantity" label="Quantity" variant="outlined" />
                    <TextField sx={{ flex: '3'}} id="measureLabel" label="Serving label" variant="outlined" />
                </Box>
                <Box
                    component="div"
                    sx={{
                       display: 'flex',
                       flexDirection: 'column',
                       margin: '10px',
                       gap: '10px',
                      }}
                >
                    <TextField id="calories" label="Calories" variant="outlined" />
                    <TextField id="protein" label="Protein" variant="outlined" />
                    <TextField id="carbs" label="Carbs" variant="outlined" />
                    <TextField id="fat" label="Fat" variant="outlined" />
                </Box>
                
                <Button sx={{ marginLeft: '10px'}} variant="outlined" type='submit'>Add Measure</Button>
            </Box>
       </Box>
       </>
    )
}

export default FoodCreate;