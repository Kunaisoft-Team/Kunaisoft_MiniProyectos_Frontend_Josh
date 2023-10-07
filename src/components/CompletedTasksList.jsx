import { useDispatch }              from 'react-redux'
import { fetchTasks }               from '../utils/redux/features/taskSlice.js'
import { useFetch }                 from '../hooks/useFetch.js'
import { SERVER_URL, TASKS_ROUTE }  from '../utils/consts.js'

export default function CompletedTasksList({ tasks }) {  
  const completed_tasks = tasks.tasks.some(task => task.completed)

  const dispatch = useDispatch()
  
  const onIncompleted = async task => {
    const res = await useFetch(
      `${SERVER_URL}${TASKS_ROUTE}?id=${task._id}`, 
      { 
        method: "put", 
        data: { 
          ...task,
          completed: false
        } 
      }
    )
    console.log(res)
    dispatch(fetchTasks())
  }

  return (
    <div className="overflow-auto w-[calc(100vw/3)] h-[calc(100vh/1.5)]">
      <h1 className="text-center text-3xl font-semibold p-2">
        Completed tasks
      </h1>
      {
        completed_tasks
        ?
        tasks.tasks.map(task => (
          task.completed &&
          <div className='bg-slate-600 text-slate-100 mx-10 mt-5 p-5 rounded-md' key={task._id}>
            <h1 className='text-2xl font-bold p-3'>
              <i 
                className="fa-solid fa-check p-3 text-green-400 cursor-pointer"
                onClick={() => onIncompleted(task)}
              ></i>
              {task.title}
            </h1>
            <p className='text-md font-bold p-3'>{task.description}</p>
            <div>
              <button className='mx-2 p-3 bg-cyan-500 rounded-md hover:bg-cyan-400 transition duration-500'>Update</button>
              <button className='mx-2 p-3 bg-red-500 rounded-md hover:bg-red-400 transition duration-500'>Delete</button>
            </div>
          </div>
        ))
        :
        <h1 className="text-justify text-lg mx-10 mt-5">
          There's no completed tasks yet... Click to the check icon to complete the task and see all your completed goals!
        </h1>
      }
    </div>
  )
}