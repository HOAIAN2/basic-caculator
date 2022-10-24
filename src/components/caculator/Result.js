import './Result.css'
function Result({ props }) {
    return (
        <div className="result">
            <span className='previous'>{props.previous}</span>
            <span className='current'>{props.current}</span>
        </div>
    )
}
export default Result