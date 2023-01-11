import { useContext } from 'react'
import Context from '../store/Context'
import { HISTORY_ACTION } from '../store/reducer'
import './History.css'
function History(props) {
    const [history, historyDispatch] = useContext(Context)
    function handleClear() {
        historyDispatch({ type: HISTORY_ACTION.CLEAR })
    }
    return (
        <div ref={props.props} className='history hide'>
            <div>
                {history.map((history, index) => {
                    return <div key={index}>{history}</div>
                })}
            </div>
            {history.length !== 0 && <i onClick={handleClear} className="fa fa-trash-o"></i>}
        </div>
    )
}
export default History