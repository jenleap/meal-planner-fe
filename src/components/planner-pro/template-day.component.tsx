import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Popover, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import styled from 'styled-components';
import { SplitScreen } from "../common";
import SmallNutrientDisplay from "../common/SmallNutrientDisplay";
import { FormEvent, useRef, useState } from "react";
import { TemplateProDay } from "../../interfaces/TemplatePro";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

type DaySelect = {
    value: number;
    label: string;
}

type TemplateDayProps = {
    day: TemplateProDay;
    days: DaySelect[];
    handleUpdates: () => void;
}

const DivWrapper = styled.div`
    margin-bottom: 20px;
    display: flex;
    gap: 20px;
`;

const PopoverDiv = styled.div`
    padding: 15px;
    width: 200px;
`;

export const TemplateDay = ({ day, days, handleUpdates }: TemplateDayProps) => {
    const [ error, setError ] = useState("");
    const [ copyToDay, setCopyToDay ] = useState("");
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const formRef = useRef<HTMLFormElement>(null);

    

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const popoverId = openPopover ? 'simple-popover' : undefined;

    const handleSelectChange = (event: SelectChangeEvent) => {
        setCopyToDay(event.target.value);
    }

    const handleCopy = async () => {
        const copyMeals = day.meals.map(m => {
            return {
                label: m.label,
                order: m.order,
                carbs: m.goalMacros.carbs,
                protein: m.goalMacros.protein,
                fat: m.goalMacros.fat
            }
        })
        const res = await fetch(`http://localhost:3002/api/planner-pro/templates/copy-day/${ copyToDay }`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(copyMeals)
            });
        console.log(res);

        handleUpdates();
    }

    const mealExists = (label: string) => {
        const existingLabel = day.meals.filter(m => m.label === label);
        return existingLabel.length > 0;
    }

    const addMeal = async (event: FormEvent<HTMLDivElement>) => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            mealLabel: { value: string };
            protein: { value: string };
            carbs: { value: string };
            fat: { value: string };
        };

        const newMeal = {
            label: target.mealLabel.value,
            protein: Number(target.protein.value),
            carbs: Number(target.carbs.value),
            fat: Number(target.fat.value),
            order: day.meals.length
        };

        if ( mealExists(newMeal.label)) {
            setError("Meal already exists with this label.")
        } else {
            setError("")
            
            const res = await fetch(`http://localhost:3002/api/planner-pro/templates/${ day.id }`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newMeal)
            });
            console.log(res);

            handleUpdates();

            if (formRef.current) {
                formRef.current.reset();
            }
        } 
    }

    return (
        <Box>
                <Typography>{ `Day ${ day.dayIndex + 1}` }</Typography>
                <DivWrapper>
                    <SmallNutrientDisplay macros={ day.dailyMacros} />
                    <Button onClick={ handleClick }>
                        <ContentCopyIcon />
                    </Button>
                    <Popover
                        id={ popoverId }
                        open={openPopover}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <PopoverDiv>
                            <Typography>Copy day to:</Typography>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Day</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={ copyToDay }
                                    label="Day"
                                    onChange={handleSelectChange}
                                >
                                {
                                    days.map(d => (
                                        <MenuItem key={ `${day.id}-${d.value}`} value={d.value}>{ d.label }</MenuItem>
                                    ))
                                }
                                </Select>
                                <Button onClick={ handleCopy }>Copy</Button>
                            </FormControl>
                        </PopoverDiv>
                    </Popover>
                </DivWrapper>

                <SplitScreen leftWeight={3} rightWeight={ 1 }>
                    <>
                        { day.meals.map(meal => (
                            <div key={ meal.label + day.dayIndex }>
                                <Typography>{ meal.label }</Typography>
                                <SmallNutrientDisplay macros={ meal.goalMacros }></SmallNutrientDisplay>
                            </div>
                        ))
                        }
                    </>
                    <Paper sx={{ marginLeft: '15px', padding: '15px'}} elevation={2}>
                        <Box
                            component="form"
                            sx={{
                                flex: 1
                            }}
                            ref={ formRef }
                            onSubmit={addMeal}
                        >

                            {(error.length > 0) && (
                                <Typography>{ error }</Typography>
                            )}

                            <Box
                                component="div"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    margin: '10px',
                                    gap: '10px',
                                }}
                            >
                                <TextField id="mealLabel" label="Meal Label" variant="outlined" />
                                <TextField id="protein" label="Protein" variant="outlined" />
                                <TextField id="carbs" label="Carbs" variant="outlined" />
                                <TextField id="fat" label="Fat" variant="outlined" />
                            </Box>
                
                            <Button sx={{ marginLeft: '10px'}} variant="outlined" type='submit'>Add Meal</Button>
                        </Box>
                    </Paper>

                </SplitScreen>
            </Box>
    )
}