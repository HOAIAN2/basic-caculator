import { useState, useEffect } from 'react'
function ResultCurrency({ props }) {
    const [currency0, setCurrency0] = useState('USD')
    const [currency1, setCurrency1] = useState('VND')
    const [amount, setAmount] = useState('')
    const [result, setResult] = useState('')
    const [latest, setLatest] = useState('')
    const rates = []
    props.rates && Object.keys(props.rates).forEach(rate => {
        rates.push(rate)
    })
    const handleConvert = () => {
        const realRate = props.rates[currency1] / props.rates[currency0]
        setResult((realRate * amount).toFixed(2))
    }
    useEffect(() => {
        if (amount === '' || result === '' || latest.includes(result)) return
        setLatest(`${amount} ${currency0} = ${result} ${currency1}`)
    }, [amount, currency0, currency1, result, latest])
    useEffect(() => {
        if (latest !== props.historyList[props.historyList.length - 1])
            props.setHistoryList([...props.historyList, latest])
    }, [latest])
    return (
        <div className="result result-currency">
            <div>
                <span>From</span>
                <select value={currency0} onChange={(e) => {
                    setCurrency0(e.target.value)
                }}>
                    {rates.map(rate => {
                        return <option key={rate}>{rate}</option>
                    })}
                </select>
            </div>
            <div>
                <span>To</span>
                <select value={currency1} onChange={(e) => {
                    setCurrency1(e.target.value)
                }}>
                    {rates.map(rate => {
                        return <option key={rate}>{rate}</option>
                    })}
                </select>
            </div>
            <div>
                <span>Amount</span>
                <input type="number" value={amount} onInput={(e) => { setAmount(e.target.value) }} />
            </div>
            <div>
                <div>
                    <span>Result: </span>
                    <span>{result}</span>
                </div>
                <button onClick={handleConvert}>Convert</button>
            </div>
        </div>
    )
}
export default ResultCurrency