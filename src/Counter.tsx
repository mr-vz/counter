import * as React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "./app/store";


type CounterPropsType = {
    classCount: string
    max: number
    title: string
}

export const Counter = ({classCount, max, title}: CounterPropsType) => {
    const count = useSelector<RootState, number>(state => state.countR.count) // достали countR из стейта
     return (
        <div className={((count === max && count !== 0 && title !== 'Press "set"') || title === 'Incorrect!') ? classCount : ''}>{title === '' ? count : title}</div>
     );
};