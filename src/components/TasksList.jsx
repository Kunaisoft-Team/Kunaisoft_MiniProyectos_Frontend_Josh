import { useEffect }                from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTasks }               from '../utils/redux/features/taskSlice.js'

export default function TasksList() {
  
  const dispatch  = useDispatch()
  const tasks     = useSelector(state => state.task)
  
  useEffect(() => {
    dispatch(fetchTasks())
  }, [])
  
  return (
    <div>
      
      {
        tasks.loading
        ?
        <h1 className='p-5 text-5xl text-slate-200'>
          Loading tasks...
        </h1>
        :
        <>
          {
            tasks.tasks.map(task => (
              <div className='bg-slate-400 p-5 rounded-md' key={task._id}>
                <h1 className='text-2xl font-bold p-3'>{task.title}</h1>
                <p className='text-md font-bold p-3'>{task.description}</p>
                <div className="flex justify-around">
                  <button className='p-3 bg-cyan-500 rounded-md hover:bg-cyan-400 transition duration-500'>Update</button>
                  <button className='p-3 bg-red-500 rounded-md hover:bg-red-400 transition duration-500'>Delete</button>
                </div>
              </div>
            ))
          }
        </>
      }
    </div>
  )

}
