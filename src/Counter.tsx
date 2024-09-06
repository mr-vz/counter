// @flow
import * as React from 'react';

type CounterPropsType = {
    classCount: string
    count: number
    amount: number
    title: string
}

export const Counter = ({classCount, count, amount, title}: CounterPropsType) => {

     return (
        <div className={((count === amount && count !== 0 && title !== 'Press "set"') || title === 'Incorrect!') ? classCount : ''}>{title === '' ? count : title}</div>
     );
};