import { useEffect, useState }      from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate }              from 'react-router-dom'
import { fetchTasks }               from '../utils/redux/features/taskSlice.js'
import { useFetch }                 from '../hooks/useFetch.js'
import { SERVER_URL, TASKS_ROUTE }  from '../utils/consts.js'
import FormModal                    from './FormModal'
import "../static/styles/Tasks.css"

export default function TasksList({ tasks }) {  
  const incompleted_tasks = tasks.tasks.some(task => !task.completed)

  const dispatch          = useDispatch()
  const navigate          = useNavigate()
  const [data, setData]   = useState({title: "", description: ""})

  const user              = useSelector(state => state.task.user)

  const onCompleted = async task => {
    const res = await useFetch(
      `${SERVER_URL}${TASKS_ROUTE}?id=${task._id}`, 
      { 
        method: "put", 
        data: { 
          ...task,
          completed: true 
        } 
      }
    )
    navigate("/tasks")
  }
  
  const showModal = () => {
    const modal = document.querySelector(".modal")
    modal.style.opacity     = 100
    modal.style.visibility  = "visible"
  }
  
  return (
    <div>
    <div className="overflow-auto w-[calc(100vw/3)] h-[calc(100vh/1.5)]">
      <h1 className="text-center text-3xl font-semibold p-2">
        Tasks to do
      </h1>
      {
        incompleted_tasks
        ?
        tasks.tasks.map(task => (
          !task.completed &&
          <div className='tasks relative bg-slate-600 text-slate-100 mx-10 mt-5 p-5 rounded-md' key={task._id}>
            <i 
              className="fa-solid fa-check absolute p-3 text-2xl hover:text-green-400 transition duration-300 cursor-pointer"
              onClick={() => onCompleted(task)}
            ></i>
            <h1 
              className='text-2xl font-bold p-3 ml-7 cursor-pointer'
              onClick={() => navigate(`/task/${task._id}`)}
            >
              {task.title}
            </h1>
          </div>
        ))
        :
        <h1 className="text-justify text-lg mx-10 mt-5">
          There's no pending tasks yet... Keep listing all your daily task to organize your daily life!
        </h1>
      }
      <p 
        className="text-center text-1xl text-slate-100 bg-green-600 hover:bg-green-500 m-auto mt-5 p-3 cursor-pointer w-32 rounded-md transition duration-300"
        onClick={showModal}
      >
        Add task
      </p>
    </div>
    <FormModal data={data} setData={setData} user_id={user._id} />
    </div>
  )
}
