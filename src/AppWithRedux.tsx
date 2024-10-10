import React, {useEffect, useState} from 'react';
import './App.css';
import {Button} from "./Button";
import {Counter} from "./Counter";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./app/store";
import {incrementCounterAC, resetCounterAC, updateMaxAC, updateStartAC} from "./model/countReducer";

function AppWithRedux() {
    const count = useSelector<RootState, number>(state => state.countR.count)
    const max = useSelector<RootState, number>(state => state.countR.max)
    const start = useSelector<RootState, number>(state => state.countR.start)
    const dispatch = useDispatch()

    let [counterTitle, setCounterTitle] = useState('')
    let [stateButtonSet, setStateButtonSet] = useState(true)

    useEffect(() => {
        let valueMaxFromLS = localStorage.getItem("max")
        if (valueMaxFromLS) {
            let newValue = JSON.parse(valueMaxFromLS)
            dispatch(updateMaxAC(newValue))
        }
        let valueStartFromLS = localStorage.getItem("start")
        if (valueStartFromLS) {
            let newValue = JSON.parse(valueStartFromLS)
            dispatch(updateStartAC(newValue))
        }
        let valueCountFromLS = localStorage.getItem("count")
        if (valueCountFromLS) {
            let newValue = JSON.parse(valueCountFromLS)
            dispatch(resetCounterAC(newValue))
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("count", JSON.stringify(count))
    }, [count]);

    const countInc = () => {
        dispatch(incrementCounterAC(count))
    }

    const reset = () => {
        dispatch(resetCounterAC(start))
    }

    const updateSets = (currentValue: number, divid: string) => {
        if (divid === 'maxValue') {
            if (currentValue >= 0 && currentValue > start) {
                dispatch(updateMaxAC(currentValue))
                setStateButtonSet(false)
                setCounterTitle('Press "set"')
            } else if (currentValue === start) {
                dispatch(updateMaxAC(currentValue))
                setStateButtonSet(true)
                setCounterTitle('Incorrect!')
            } else {
                setCounterTitle('Incorrect!')
                setStateButtonSet(true)
            }
        } else if (divid === 'startValue') {
            if (currentValue >= 0 && currentValue < max) {
                dispatch(updateStartAC(currentValue))
                setStateButtonSet(false)
                setCounterTitle('Press "set"')
            } else if (currentValue === max) {
                dispatch(updateStartAC(currentValue))
                setStateButtonSet(true)
                setCounterTitle('Incorrect!')
            } else if(currentValue === -1) {
                dispatch(updateStartAC(currentValue))
                setCounterTitle('Incorrect!')
                setStateButtonSet(true)
            }
            else {
                setCounterTitle('Incorrect!')
                setStateButtonSet(true)
            }
        }
    }

    const checkmax = max < 0 || max <= start
    const checkstart = start < 0 || start >= max

    return (
        <div className="App">

            <div className={'content'}>
                <h1>Counter</h1>
                <div className={'main'}>
                    <div className={'countdiv'}>
                        <Counter classCount={'countColor'} max={max} title={counterTitle}/>
                    </div>

                    <div className={'buttons'}>
                        <Button title={'inc'} onClick={countInc}
                                disabled={count === max || checkmax || checkstart || counterTitle !== ''}></Button>
                        <Button title={'reset'} onClick={reset}
                                disabled={start === count || counterTitle !== ''}></Button>
                    </div>
                </div>
                <div className={'main'}>
                    <div className={'countdiv'}>
                        <div className={'inputClass'}>max value <input
                            id={'maxValue'}
                            className={checkmax ? 'incorrect' : ''} //определяется класс для css
                            value={max}
                            type="number"
                            onChange={(e) => {
                                updateSets(+e.currentTarget.value, e.currentTarget.id)
                            }
                            }/>
                        </div>
                        <div className={'inputClass'}>start value <input
                            id={'startValue'}
                            className={checkstart ? 'incorrect' : ''}
                            value={start}
                            type="number"
                            onChange={(e) => {
                                updateSets(+e.currentTarget.value, e.currentTarget.id)
                            }
                            }/>
                        </div>
                    </div>

                    <div className={'buttons'}>
                        <Button title={'set'} onClick={() => {
                            localStorage.setItem("max", JSON.stringify(max))
                            dispatch(updateMaxAC(max))
                            localStorage.setItem("start", JSON.stringify(start))
                            dispatch(updateStartAC(start))

                            dispatch(resetCounterAC(start))
                            setStateButtonSet(true)
                            setCounterTitle('')
                        }} disabled={stateButtonSet}></Button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AppWithRedux;
