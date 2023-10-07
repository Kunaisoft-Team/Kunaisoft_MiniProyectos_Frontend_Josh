import { useDispatch }              from 'react-redux'
import { useFetch }                 from '../hooks/useFetch.js'
import { SERVER_URL, TASKS_ROUTE }  from '../utils/consts.js'
import { fetchTasks }               from '../utils/redux/features/taskSlice.js'
import "../static/styles/FormModal.css"

export default function FormModal({data, setData, update = false, id = null}) {
  
  const dispatch  = useDispatch()

  const hideModal = () => {
    setData({title: "", description: ""})
    const modal = document.querySelector(".modal")
    console.log(modal)
    modal.style.opacity     = 0
    modal.style.visibility  = "hidden"
  }

  const onChange = e => {
    setData({...data, [e.target.name]: e.target.value})
  }

  const onSubmit = async () => {
    const res = await useFetch(
      `${SERVER_URL}${TASKS_ROUTE}?id=${id}`, 
      { 
        method: !update ? "post" : "put", 
        data 
      }
    )
    console.log(res)
    dispatch(fetchTasks())
    hideModal()
  }

  return (
    <div className="modal absolute flex justify-center items-center top-0 left-0 right-0 bottom-0 rounded-md w-screen h-screen bg-gray-950 bg-opacity-40 transition-all duration-500">
      <form className="relative bg-slate-700 p-10 rounded-md w-1/2">
        <i 
          className="fa-solid fa-xmark absolute right-5 top-5 text-3xl cursor-pointer text-red-500 hover:text-red-400 transition duration-300"
          onClick={hideModal}
        ></i>
        <h1 className="text-2xl font-semibold text-center text-slate-100">
          {!update ? "Create a new task!" : "Update an existing task!"}
        </h1>
        <input 
          className="p-2 my-3 w-full rounded-md text-md text-gray-900 outline-none transition duration-300 focus:shadow-slate-400 focus:shadow-md placeholder:text-gray-500" 
          type="text"
          placeholder="Title"
          name="title"
          onChange={onChange} 
          value={data.title && data.title}        
        />

        <input 
          className="p-2 my-3 w-full rounded-md text-md text-gray-900 outline-none transition duration-300 focus:shadow-slate-400 focus:shadow-md placeholder:text-gray-500" 
          type="text"
          placeholder="Description"
          name="description"
          onChange={onChange} 
          value={data.description && data.description} 
        />

        <p 
          className="text-slate-100 cursor-pointer p-3 m-auto text-center hover:bg-slate-300 hover:text-slate-900 rounded-md w-32 transition duration-300"
          onClick={onSubmit}
        >
          {!update ? "Create" : "Update"} task
        </p>
      </form>
    </div>
  )
}