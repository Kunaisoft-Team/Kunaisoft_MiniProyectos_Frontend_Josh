import { useState }                 from 'react'
import { useDispatch }              from 'react-redux'
import { useNavigate }              from 'react-router-dom'
import Swal                         from 'sweetalert2'
import { fetchTasks }               from '../utils/redux/features/taskSlice.js'
import { useFetch }                 from '../hooks/useFetch.js'
import { SERVER_URL, TASKS_ROUTE }  from '../utils/consts.js'
import FormModal                    from './FormModal'

export default function History({ tasks }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [data, setData]     = useState({title: "", description: ""})
  const [update, setUpdate] = useState(false)
  const [id, setId]         = useState(false)

  const showModal = () => {
    const modal = document.querySelector(".modal")
    modal.style.opacity     = 100
    modal.style.visibility  = "visible"
  }

  const hideModal = () => {
    const modal = document.querySelector(".modal")
    modal.style.opacity     = 0
    modal.style.visibility  = "hidden"
  }
  
  const onUpdate = task => {
    setUpdate(true)
    setId(task._id)
    setData({title: task.title, description: task.description})
    showModal()
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
      dispatch(fetchTasks())
      hideModal()
      navigate("/tasks")
    }
  }

  return (
    <div className="overflow-auto w-[calc(100vw/3)] h-[calc(100vh/1.5)]">
      <h1 className="text-center text-3xl font-semibold p-2">
        History
      </h1>
      {
        tasks.length 
        ?
        tasks.map(task => (
          <div className='tasks bg-slate-600 text-slate-100 mx-10 mt-5 p-5 rounded-md' key={task._id}>
            <h1 className='text-2xl font-bold p-3'>
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
            <FormModal data={data} setData={setData} update={update} task_id={id} />
          </div>
        ))
        :
        <h1 className="text-justify text-lg mx-10 mt-5">
          There's nothing on your history yet... Create a task and see your tasks created!
        </h1>
      }
    </div>
  )
}
