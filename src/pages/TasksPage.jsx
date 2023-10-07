import { useEffect }                from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTasks }               from '../utils/redux/features/taskSlice.js'
import TasksList                    from '../components/TasksList'
import CompletedTasksList           from '../components/CompletedTasksList'

export default function TasksPage() {
  
  const dispatch  = useDispatch()
  const tasks     = useSelector(state => state.task)
  
  useEffect(() => {
    dispatch(fetchTasks())
  }, [])

  return (
    <div className="bg-slate-300 p-10 mx-5 w-[calc(100vw / 1.1)] rounded-md flex justify-around">
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
  )
}
