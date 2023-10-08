import { useNavigate }  from 'react-router-dom'
import { useCookies }   from 'react-cookie'

export default function Navbar() {  

  const [token, setToken, removeToken]  = useCookies("access_token")
  const navigate                        = useNavigate()

  const onSignOut = () => {
    removeToken("access_token")
    navigate("/")
  }

  const handleOptions = () => {
    const options = document.querySelector(".options")
    if(options.style.opacity == 0) {
      options.style.opacity     = 100
      options.style.visibility  = "visible"
    } else {
      options.style.opacity     = 0
      options.style.visibility  = "hidden"
    }
  }

  return (
    <ul className="p-3 mb-5 flex items-center justify-between w-screen bg-slate-700 text-slate-100">
      <li className="text-3xl font-semibold">Task App</li>
      <li>
        <i 
          className="fa-solid fa-user text-3xl hover:bg-slate-300 hover:text-slate-900 p-3 rounded-full cursor-pointer transition duration-500"
          onClick={handleOptions}
        ></i>
        <ul className="options absolute right-0 bg-slate-700 p-3 rounded-md opacity-0 invisible transition duration-500">
        <li
            className="text-xl text-right cursor-pointer hover:bg-slate-300 hover:text-slate-900 py-3 transition duration-300"
            onClick={() => navigate("/tasks")}
          >
            Your Tasks
          </li>
          <li
            className="text-xl text-right cursor-pointer hover:bg-slate-300 hover:text-slate-900 py-3 transition duration-300"
            onClick={() => navigate("/history")}
          >
            History
          </li>
          <li
            className="text-xl text-right cursor-pointer text-red-300 hover:bg-red-400 hover:text-red-800 py-3 transition duration-300"
            onClick={onSignOut}
          >
            Sign Out
          </li>
        </ul>
      </li>
    </ul>
  )
}
