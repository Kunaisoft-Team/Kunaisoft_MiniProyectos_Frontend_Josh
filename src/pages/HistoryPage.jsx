import { useSelector }  from 'react-redux'
import History          from '../components/History'
import Navbar           from '../components/Navbar'

export default function HistoryPage() {

  const tasksOnHistory = useSelector(state => state.history.value)

  console.log(tasksOnHistory)
  
  return (
    <>
      <Navbar />
      <div className="bg-slate-300 p-10 md:m-auto h-[calc(100vh/1.344)] m-10 md:w-2/3 rounded-md md:flex md:justify-around">
        <History tasks={tasksOnHistory} />
      </div>
    </>
  )
}
