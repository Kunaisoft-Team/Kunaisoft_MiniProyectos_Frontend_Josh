import { useSelector }              from 'react-redux'
import Navbar                       from '../components/Navbar'
import TasksList                    from '../components/TasksList'
import CompletedTasksList           from '../components/CompletedTasksList'

export default function TasksPage() {
  const tasks     = useSelector(state => state.task)

  return (
    <>
      <Navbar />
      <div className="bg-slate-300 p-10 m-auto w-2/3 rounded-md flex justify-around">
        {
          tasks.loading 
          ?
          <h1 className='text-4xl font-semibold p-48'>
            Loading tasks...
          </h1>
          :
          <>
            <TasksList          tasks={tasks} />
            <CompletedTasksList tasks={tasks} />
          </>
        }
      </div>
    </>
  )
}
