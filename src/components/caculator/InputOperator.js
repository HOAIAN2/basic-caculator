import { useEffect, useRef } from 'react'
import './InputOperator.css'
function InputOperator({ props }) {
    const buttons = [
        '+/-',
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
    const ref = useRef()
    useEffect(() => {
        const buttonNodes = ref.current.querySelectorAll('button')
        const handleKeyDown = (e) => {
            if (buttons.includes(e.key)) {
                buttonNodes.forEach(node => {
                    if (node.textContent === e.key) node.click()
                })
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    })
    return (
        <div ref={ref} className='input-operator'>
            {buttons.map((button) => {
                if (button === '=') return <button onClick={props.handleButtonClick} className='equal' key={button}>{button}</button>
                else return <button onClick={props.handleButtonClick} key={button}>{button}</button>
            })}
        </div>
    )
}
export default InputOperator