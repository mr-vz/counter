import * as React from 'react';

type CounterPropsType = {
    classCount: string
    count: number
    max: number
    title: string
}

export const Counter = ({classCount, count, max, title}: CounterPropsType) => {
     return (
        <div className={((count === max && count !== 0 && title !== 'Press "set"') || title === 'Incorrect!') ? classCount : ''}>{title === '' ? count : title}</div>
     );
};