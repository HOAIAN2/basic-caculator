import { useReducer } from 'react'
import Context from './Context'
import reducer from './reducer'
function Provider({ children }) {
    const [history, historyDispatch] = useReducer(reducer, [])
    return (
        <Context.Provider value={[history, historyDispatch]}>
            {children}
        </Context.Provider>
    )
}
export default Provider