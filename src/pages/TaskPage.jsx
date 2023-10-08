import { useParams }                from 'react-router-dom'
import { useSelector }              from 'react-redux'
import Task                         from '../components/Task.jsx'
import Navbar                       from '../components/Navbar.jsx'

export default function TasksPage() {
  
  const { id }    = useParams() 
  const tasks     = useSelector(state => state.task)

  const task = tasks.tasks.find(task => task._id === id)

  return (
    <>
      <Navbar />
      <div className="bg-slate-300 h-[calc(100vh/1.344)] m-10 p-10 md:m-auto md:w-2/3 rounded-md md:flex md:justify-around">
        {
          tasks.loading 
          ?
          <h1 className='text-4xl font-semibold p-48'>
            Loading tasks...
          </h1>
          :
          <Task task={task} />
        }
      </div>
    </>
  )
}
