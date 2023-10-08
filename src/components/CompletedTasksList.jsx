import { useNavigate }              from 'react-router-dom'
import { useDispatch }              from 'react-redux'
import { fetchTasks }               from '../utils/redux/features/taskSlice.js'
import { useFetch }                 from '../hooks/useFetch.js'
import { SERVER_URL, TASKS_ROUTE }  from '../utils/consts.js'
import "../static/styles/Tasks.css"

export default function CompletedTasksList({ tasks }) {  
  const completed_tasks = tasks.tasks.some(task => task.completed)
  
  const navigate = useNavigate()
  
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
    navigate("/tasks")
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
          <div className='tasks bg-slate-600 text-slate-100 mx-10 mt-5 p-5 rounded-md' key={task._id}>
            <i 
              className="fa-solid fa-check absolute p-3 text-2xl text-green-400 transition duration-300 cursor-pointer"
              onClick={() => onIncompleted(task)}
            ></i>
            <h1 className='text-2xl font-bold p-3 ml-7'>
              {task.title}
            </h1>
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