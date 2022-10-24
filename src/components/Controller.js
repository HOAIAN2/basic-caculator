import './Controller.css'
function Controller({props}) {
  return (
    <div className="controller">
        <span onClick={props.changeApp}>{props.app}</span>
        <i onClick={props.handleHistoryClick} className="fa fa-history"></i>
    </div>
  )
}
export default Controller