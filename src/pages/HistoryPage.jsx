import { useState }     from 'react'
import { useSelector }  from 'react-redux'
import History          from '../components/History'
import Navbar           from '../components/Navbar'

export default function HistoryPage() {

  const tasksOnHistory = useSelector(state => state.history.value)
  
  return (
    <>
      <Navbar />
      <div className="bg-slate-300 p-10 m-auto w-2/3 rounded-md flex justify-around">
        <History tasks={tasksOnHistory} />
      </div>
    </>
  )
}
