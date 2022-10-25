import { useState, useEffect } from 'react';
import Controller from './components/Controller';
import History from './components/History';
import Result from './components/caculator/Result';
import InputOperator from './components/caculator/InputOperator';
import ResultCurrency from './components/currencyexchange/ResultCurrency';
import caculate from './libraries/caculateFromString';
import './App.css'
function App() {
  const [current, setCurrent] = useState('')
  const [previous, setPrevious] = useState('')
  const [app, setApp] = useState('CACULATOR')
  const [historyState, setHistoryState] = useState('hide')
  const [historyList, setHistoryList] = useState([])
  const [rates, setRates] = useState(null)
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
  const operators = ['+', '-', 'x', '/']
  const others = ['+/-', 'AC', 'Delete', '.', '=']
  const API_URL = 'https://api.exchangerate.host/latest'
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(blob => {
        setRates(blob.rates)
      })
  }, [])
  useEffect(() => {
    if (current === '' || current === 'NaN') return
    setHistoryList([...historyList, `${previous} = ${current}`])
  }, [previous])
  const changeApp = () => {
    if (app === 'CACULATOR') setApp('CURRENCY EXCHANGE')
    else setApp('CACULATOR')
  }
  const handleHistoryClick = () => {
    if (historyState === 'hide') setHistoryState('show')
    else setHistoryState('hide')
  }
  const clearHistory = () => {
    setHistoryList([])
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
          setPrevious(current)
          setCurrent(caculate(current).toString())
          break
        default:
          break;
      }
    }
  }
  return (
    <div className="App">
      <Controller props={{ app, changeApp, handleHistoryClick }} />
      <History props={{ historyState, historyList, clearHistory }} />
      {app === 'CACULATOR' ? <Result props={{ current, previous }} /> : <ResultCurrency props={{ rates, historyList, setHistoryList }} />}
      {app === 'CACULATOR' ? <InputOperator props={{ handleButtonClick }} /> : null}
    </div>
  );
}
export default App;