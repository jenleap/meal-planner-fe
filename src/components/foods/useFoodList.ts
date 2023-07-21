import { useState, useEffect } from 'react';

export default function useFoodList() {
    const [ foodList, setFoodList ] = useState([]);
    const [ status, setStatus ] = useState("unloaded");

    useEffect(() => {
        getFoods();

        async function getFoods() {
            setFoodList([]);
            setStatus("loading");

            const res = await fetch('http://localhost:3002/api/foods');
            const json = await res.json();

            setFoodList(json.foods);
            setStatus("loaded");
        }
    })
}