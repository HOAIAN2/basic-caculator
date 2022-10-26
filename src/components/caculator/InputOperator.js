import { createRef, useEffect, useRef } from 'react'
import './InputOperator.css'
function InputOperator({ props }) {
    const buttons = [
        'AC',
        'Delete',
        '+',
        '1',
        '2',
        '3',
        '-',
        '4',
        '5',
        '6',
        'x',
        '7',
        '8',
        '9',
        '/',
        '.',
        '0',
        '='
    ]
    const ref = useRef([])
    const handleButtonPress = (e) => {
        for (let i = 0; i < buttons.length; i++) {
            if (ref.current[i].current.textContent === e.key) ref.current[i].current.click()
        }
        if (e.key === 'Delete' && e.repeat === true) ref.current[0].current.click()
        if (e.key === 'Backspace') ref.current[1].current.click()
    }
    /// Cannot use useEffects, ref.current become null after components unmounted
    for (let i = 0; i < buttons.length; i++) {
        ref.current[i] = createRef()
    }
    ///
    useEffect(() => {
        window.addEventListener('keydown', handleButtonPress)
        return () => {
            window.removeEventListener('keydown', handleButtonPress)
        }
    })
    return (
        <div className='input-operator'>
            {buttons.map((button, index) => {
                if (button === '=' || button === 'AC') return <button ref={ref.current[index]} onClick={props.handleButtonClick} className='span2' key={button}>{button}</button>
                else return <button ref={ref.current[index]} onClick={props.handleButtonClick} key={button}>{button}</button>
            })}
        </div>
    )
}
export default InputOperator