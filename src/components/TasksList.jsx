import { useState }                 from 'react'
import { useDispatch }              from 'react-redux'
import Swal                         from 'sweetalert2'
import { fetchTasks }               from '../utils/redux/features/taskSlice.js'
import { useFetch }                 from '../hooks/useFetch.js'
import { SERVER_URL, TASKS_ROUTE }  from '../utils/consts.js'
import FormModal        from './FormModal'
import "../static/styles/Tasks.css"

export default function TasksList({ tasks }) {  
  console.log(tasks)
  const incompleted_tasks = tasks.tasks.some(task => !task.completed)

  const dispatch = useDispatch()

  const [data, setData]     = useState({title: "", description: ""})
  const [update, setUpdate] = useState(false)
  const [id, setId]         = useState(false)

  const onUpdate = task => {
    setUpdate(true)
    setId(task._id)
    setData({title: task.title, description: task.description})
    showModal()
  }

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
    console.log(res)
    dispatch(fetchTasks())
  }

  const onDelete = async task => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Sure you want to delete this task?",
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
    })

    if(result.isConfirmed) {
      const res = await useFetch(
        `${SERVER_URL}${TASKS_ROUTE}?id=${task._id}`, 
        { method: "delete" }
      )
      console.log(res)
      dispatch(fetchTasks())
    }
  }
  
  const showModal = () => {
    const modal = document.querySelector(".modal")
    modal.style.opacity     = 100
    modal.style.visibility  = "visible"
  }
  
  return (
    <div>
      {
        tasks.tasks.length &&
        <div className="overflow-auto w-[calc(100vw/3)] h-[calc(100vh/1.5)]">
          <h1 className="text-center text-3xl font-semibold p-2">
            Tasks to do
          </h1>
          {
            incompleted_tasks
            ?
            tasks.tasks.map(task => (
              !task.completed &&
              <div className='tasks bg-slate-600 text-slate-100 mx-10 mt-5 p-5 rounded-md' key={task._id}>
                <h1 className='text-2xl font-bold p-3'>
                  <i 
                    className="fa-solid fa-check p-3 hover:text-green-400 transition duration-300 cursor-pointer"
                    onClick={() => onCompleted(task)}
                  ></i>
                  {task.title}
                </h1>
                <p className='text-md font-bold p-3'>{task.description}</p>
                <div>
                  <button 
                    className='mx-2 p-3 bg-cyan-500 rounded-md hover:bg-cyan-400 transition duration-500'
                    onClick={() => onUpdate(task)}
                  >
                    Update
                  </button>
                  
                  <button 
                    className='mx-2 p-3 bg-red-500 rounded-md hover:bg-red-400 transition duration-500'
                    onClick={() => onDelete(task)}
                  >
                    Delete
                  </button>
                </div>
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
      }
      {
        !tasks.tasks.length && 
        <h1 className="text-center text-lg">
          There's no tasks yet...
        </h1>
      }
    <FormModal data={data} setData={setData} update={update} id={id} />
    </div>
  )
}
