import { useState, useEffect, createRef, useContext, useRef } from 'react';
import Controller from './components/Controller';
import History from './components/History';
import Result from './components/caculator/Result';
import InputOperator from './components/caculator/InputOperator';
import ResultCurrency from './components/currency-exchange/ResultCurrency';
import { HISTORY_ACTION } from './store/reducer';
import Context from './store/Context';
import caculate from './libraries/caculateFromString';
import './App.css'
function App() {
  const [current, setCurrent] = useState('')
  const [previous, setPrevious] = useState('')
  const [app, setApp] = useState('CACULATOR')
  const [rates, setRates] = useState(null)
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
  const operators = ['+', '-', 'x', '/']
  const others = ['+/-', 'AC', 'Delete', '.', '=']
  const historyState = createRef()
  const pre = useRef('')
  const [, historyDispatch] = useContext(Context)
  const API_URL = 'https://api.exchangerate.host/latest'
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(json => {
        setRates(json.rates)
      }).catch(e => {
        console.log(e)
      })
  }, [])
  const changeApp = () => {
    if (app === 'CACULATOR') setApp('CURRENCY EXCHANGE')
    else setApp('CACULATOR')
  }
  const handleButtonClick = (e) => {
    if (numbers.includes(e.target.textContent)) {
      setCurrent(pre => pre + e.target.textContent)
    }
    if (operators.includes(e.target.textContent)) {
      setCurrent(pre => pre + e.target.textContent)
    }
    if (others.includes(e.target.textContent)) {
      switch (e.target.textContent) {
        case 'AC':
          setCurrent('')
          setPrevious('')
          break
        case 'Delete': setCurrent(pre => pre.slice(0, -1))
          break
        case '.': setCurrent(pre => pre + e.target.textContent)
          break
        case '=':
          const result = caculate(current).toString()
          setPrevious(current)
          setCurrent(result)
          const payload = `${current} = ${result}`
          if (payload === pre.current) break
          historyDispatch({ type: HISTORY_ACTION.ADD, payload: payload })
          pre.current = payload
          break
        default:
          break;
      }
    }
  }
  return (
    <div className="App">
      <Controller props={{ app, changeApp, historyState }} />
      <History props={historyState} />
      {app === 'CACULATOR' ? <Result props={{ current, previous }} /> : <ResultCurrency rates={rates} />}
      {app === 'CACULATOR' ? <InputOperator props={{ handleButtonClick }} /> : null}
    </div>
  );
}
export default App;