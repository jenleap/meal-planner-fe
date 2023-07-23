import { FormControl, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { fractionConst } from '../../utils/constants';

type FractionSelectProps = {
    decimalNum: number;
    amountChanged: (ammount: number) => void
}

const FractionSelect = ({ decimalNum, amountChanged }: FractionSelectProps) => {
    const [wholeNum, setWholeNum] = useState(0);
    const [decNum, setDecNum] = useState("0");

    useEffect(() => {
        convertDecimal();
    }, []);

    const convertDecimal = () => {
        setWholeNum(Math.floor(decimalNum));
        setDecNum((decimalNum - Math.floor(decimalNum)).toString());
    }

    const updateWhole = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setWholeNum(parseInt(e.target.value));
        console.log(e, decimalNum);
        amountChanged(parseFloat(e.target.value) + parseFloat(decNum));
    }

    const updateFraction = (e: SelectChangeEvent<string>) => {
        setDecNum(e.target.value);
        amountChanged(wholeNum + parseFloat(e.target.value));
    }

    return (
        <Stack direction="row">
            <TextField 
                sx={{width: '60px' }} 
                variant="outlined" 
                onChange={updateWhole} 
            />
            <FormControl sx={{ marginLeft: '5px'}}>
                <Select
                    id="fraction-select"
                    sx={{ width: '80px'}}
                    value={ decNum }
                    onChange={updateFraction}
                >
                    {
                        fractionConst.map(f => (
                            <MenuItem value={ f.numeric }>{ f.label }</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </Stack>
    )
}

export default FractionSelect;
