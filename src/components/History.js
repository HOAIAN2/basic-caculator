import './History.css'
function History({ props }) {
    const history = `history history-${props.historyState}`
    return (
        <div className={history}>
            <div>
                {props.historyList.map((history, index) => {
                    return <div key={index}>{history}</div>
                })}
            </div>
            {props.historyList.length !== 0 && <i onClick={props.clearHistory} className="fa fa-trash-o"></i>}
        </div>
    )
}
export default History