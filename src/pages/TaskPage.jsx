import { useParams }                from 'react-router-dom'
import { useSelector }              from 'react-redux'
import Task                         from '../components/Task.jsx'

export default function TasksPage() {
  
  const { id }    = useParams() 
  const tasks     = useSelector(state => state.task)

  const task = tasks.tasks.find(task => task._id === id)

  return (
    <div className="bg-slate-300 p-10 mx-5 w-[calc(100vw / 1.1)] rounded-md flex justify-around">
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
  )
}
