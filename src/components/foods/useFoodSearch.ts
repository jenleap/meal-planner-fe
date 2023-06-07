import { useState, useEffect } from 'react';

const localCache: {[key: string]: any} = {};

export default function useFoodSearch(query: string) {
    const [ foodList, setFoodList ] = useState([]);
    const [ status, setStatus ] = useState("unloaded");

    useEffect(() => {
        if (localCache[query]) {
            setFoodList(localCache[query]);
        } else {
            searchFoodList();
        }

        async function searchFoodList() {
            setFoodList([]);
            setStatus("loading");

            const res = await fetch('http://localhost:3000/api/foods');
            const json = await res.json();
            localCache[query] = json.foods || [];

            setFoodList(localCache[query]);
            setStatus("loaded");
        }
    }, [query]);

    return [foodList, status];
}