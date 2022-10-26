import { useEffect, useRef } from 'react'
import './Controller.css'
function Controller({ props }) {
  const ref0 = useRef()
  const ref1 = useRef()
  const handlePress = (e) => {
    if (e.key === 'H') ref1.current.click()
    if (e.key === 'S') ref0.current.click()
  }
  useEffect(() => {
    window.addEventListener('keydown', handlePress)
    return () => {
      window.removeEventListener('keydown', handlePress)
    }
  }, [])
  return (
    <div className="controller">
      <span ref={ref0} onClick={props.changeApp}>{props.app}</span>
      <i ref={ref1} onClick={props.handleHistoryClick} className="fa fa-history"></i>
    </div>
  )
}
export default Controller