import { useState, useContext } from 'react'
import Context from '../../store/Context'
import { HISTORY_ACTION } from '../../store/reducer'

function ResultCurrency(rates) {
    const [currency0, setCurrency0] = useState('USD')
    const [currency1, setCurrency1] = useState('VND')
    const [amount, setAmount] = useState('')
    const [result, setResult] = useState('')
    const [, historyDispatch] = useContext(Context)
    const handleConvert = () => {
        const realRate = rates.rates[currency1] / rates.rates[currency0]
        const result = (realRate * amount).toFixed(2)
        const payload = `${amount} ${currency0} = ${result} ${currency1}`
        setResult(result)
        historyDispatch({ type: HISTORY_ACTION.ADD, payload: payload })
    }
    return (
        <div className="result result-currency">
            <div>
                <span>From</span>
                <select value={currency0} onChange={e => { setCurrency0(e.target.value) }}>
                    {Object.keys(rates.rates).map(rate => {
                        return <option key={rate}>{rate}</option>
                    })}
                </select>
            </div>
            <div>
                <span>To</span>
                <select value={currency1} onChange={e => { setCurrency1(e.target.value) }}>
                    {Object.keys(rates.rates).map(rate => {
                        return <option key={rate}>{rate}</option>
                    })}
                </select>
            </div>
            <div>
                <span>Amount</span>
                <input type='number' value={amount} onChange={e => { setAmount(e.target.value) }} />
            </div>
            <div>
                <span>Result</span>
                <input style={{ outline: 'none', border: 'none', fontSize: '24px', background: 'none' }}
                    readOnly value={result} />
            </div>
            <div>
                <button onClick={handleConvert}>Convert</button>
            </div>
        </div>
    )
}
export default ResultCurrency