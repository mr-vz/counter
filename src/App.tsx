import React, {useEffect, useState} from 'react';
import './App.css';
import {Button} from "./Button";
import {Counter} from "./Counter";

function App() {
    let [max, setMax] = useState(5)
    let [start, setStart] = useState(0)

    useEffect(() => {
        let valueMaxFromLS = localStorage.getItem("maxCount")
        if(valueMaxFromLS) {
            let newValue = JSON.parse(valueMaxFromLS)
            setMax(newValue)
        }
        let valueStartFromLS = localStorage.getItem("startCount")
        if(valueStartFromLS) {
            let newValue = JSON.parse(valueStartFromLS)
            setStart(newValue)
        }
    }, []);

    let [maxCount, setMaxCount] = useState(max)
    let [startCount, setStartCount] = useState(start)
    let [stateButtonSet, setStateButtonSet] = useState(true)
    let [stateButtonInc, setStateButtonInc] = useState(false)
    let [stateButtonReset, setStateButtonReset] = useState(true)
    let [counterTitle, setCounterTitle] = useState('')
    let [incorrectMax, setIncorrectMax] = useState(false)
    let [incorrectStart, setIncorrectStart] = useState(false)

    const countInc = (count: number) => {
        setStartCount(count + 1)
        setStateButtonReset(false)
    }

    const reset = () => {
        startCount = start
        setStartCount(startCount)
        setStateButtonReset(true)
    }

    const updateSets = (currentValue: number, divid: string) => {
        if(divid === 'maxValue') {
            if(currentValue >= 0 && currentValue > start) {
                setCounterTitle('')
                setMax(currentValue)
                setStateButtonSet(false)
                setStateButtonInc(true)
                setIncorrectMax(false)
                setIncorrectStart(false)
                setCounterTitle('Press "set"')
            }
            else if(currentValue === start) {
                setStateButtonSet(true)
                setMax(currentValue)
                setIncorrectStart(true)
                setIncorrectMax(true)
                setCounterTitle('Incorrect!')
            }
            else {
                setMax(currentValue)
                setCounterTitle('Incorrect!')
                setIncorrectMax(true)
                setStateButtonSet(true)
                setStateButtonInc(true)
            }
        } else if(divid === 'startValue') {
            if(currentValue >= 0 && currentValue < max) {
                setCounterTitle('')
                setStart(currentValue)
                setStateButtonSet(false)
                setStateButtonInc(true)
                setIncorrectMax(false)
                setIncorrectStart(false)
                setCounterTitle('Press "set"')
            }
            else if (currentValue === max) {
                setStateButtonSet(true)
                setStart(currentValue)
                setIncorrectStart(true)
                setIncorrectMax(true)
                setCounterTitle('Incorrect!')
            }
            else {
                setStart(currentValue)
                setCounterTitle('Incorrect!')
                setIncorrectStart(true)
                setStateButtonSet(true)
                setStateButtonInc(true)
            }
        }
    }

    return (
        <div className="App">

            <div className={'main'}>
                <div className={'countdiv'}>
                    <div className={'inputClass'}>max value <input id={'maxValue'} className={incorrectMax ? 'incorrect' : ''} value={max} type="number" onChange={(e) => {
                        updateSets(+e.currentTarget.value, e.currentTarget.id)
                        // let currentValue = +e.currentTarget.value
                        // if(currentValue >= 0 && currentValue > start) {
                        //     setCounterTitle('')
                        //     setMax(currentValue)
                        //     setStateButtonSet(false)
                        //     setStateButtonInc(true)
                        //     setCounterTitle('Enter values and press "set"')
                        // } else {
                        //     setMax(currentValue)
                        //     setCounterTitle('Incorrect value!')
                        //     setStateButtonSet(true)
                        //     setStateButtonInc(true)
                        // }
                    }}/></div>
                    <div className={'inputClass'}>start value <input id={'startValue'} className={incorrectStart ? 'incorrect' : ''} value={start} type="number" onChange={(e) => {
                        //debugger
                        updateSets(+e.currentTarget.value, e.currentTarget.id)
                        // let currentValue = +e.currentTarget.value
                        // if(currentValue >= 0 && currentValue < max) {
                        //     setCounterTitle('')
                        //     setStart(currentValue)
                        //     setStateButtonSet(false)
                        //     setStateButtonInc(true)
                        //     setCounterTitle('Enter values and press "set"')
                        // } else {
                        //     setStart(currentValue)
                        //     setCounterTitle('Incorrect value!')
                        //     setStateButtonSet(true)
                        //     setStateButtonInc(true)
                        // }
                    }}/></div>
                </div>

                <div className={'buttons'}>
                    <Button title={'set'} onClick={() => {

                        maxCount = max
                        localStorage.setItem("maxCount", JSON.stringify(maxCount))
                        setMaxCount(maxCount)

                        startCount = start
                        localStorage.setItem("startCount", JSON.stringify(startCount))
                        setStartCount(startCount)

                        setStateButtonSet(true)
                        setStateButtonReset(true)
                        setStateButtonInc(false)
                        setCounterTitle('')
                    }} disabled={stateButtonSet}></Button>
                </div>
            </div>

            <div className={'main'}>

                <div className={'countdiv'}>
                    <Counter classCount={'countColor'} count={startCount} amount={maxCount} title={counterTitle}/>
                </div>

                <div className={'buttons'}>
                    <Button title={'inc'} onClick={() => countInc(startCount)} disabled={startCount === maxCount ? !stateButtonInc : stateButtonInc}></Button>
                    <Button title={'reset'} onClick={() => reset()} disabled={stateButtonReset}></Button>
                </div>

            </div>

        </div>
    );
}

export default App;
