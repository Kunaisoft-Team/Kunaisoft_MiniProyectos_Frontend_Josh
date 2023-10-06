import { useSelector, useDispatch } from 'react-redux'
import { useState }                 from 'react'
import { setUserData }              from '../utils/redux/features/loginSlice'
import { SERVER_URL, USERS_ROUTE }  from '../utils/consts.js'
import { useFetch }                 from '../hooks/useFetch.js'
import "../static/styles/RegisterForm.css"

export default function RegisterForm({setForm}) {

  const userData = useSelector(state => state.login.value)
  const dispatch = useDispatch()

  const [response, setResponse] = useState({msgs: [], status: 0})
  
  const onChange = e => {
    dispatch(setUserData({key: e.target.name, value: e.target.value}))
  }

  const onSubmit = async e => {
    e.preventDefault()
    const loading = document.querySelector(".loading")

    loading.style.transform     = "scale(1)"
    loading.style.opacity       = 100
    loading.style.visibility    = "visible"

    setResponse({msgs: [], status: 0})
    const res = await useFetch(`${SERVER_URL}${USERS_ROUTE}`, {method: "post", data: userData})
    loading.style.transform     = "scale(0.5)"
    loading.style.opacity       = 0
    loading.style.visibility    = "hidden"
    setResponse(
      {
        msgs: res?.response ? res.response.data.detail : res.data, 
        status: res?.response ? res.response.status : res.status
      }
    )
  }

  let valid_submit = userData.name && userData.email && userData.password
  
  const onLogin = () => {
    const registerForm  = document.querySelector(".register_form")
    const welcome       = document.querySelector(".welcome_register")
    
    registerForm.style.transform  = 'translateX(-50rem)'
    registerForm.style.opacity    = 0
    registerForm.style.visibility = "hidden"
    
    welcome.style.transform  = 'translateX(50rem)'
    welcome.style.opacity    = 0
    welcome.style.visibility = "hidden"
    setTimeout(() => setForm("login"), 500)
  }

  if(response.status == 201) setTimeout(onLogin, 2000)

  return (
    <div className="w-1/2 m-10">
      <form 
        className='register_form block bg-slate-900 text-slate-100 w-full p-20 rounded-lg'
        onSubmit={onSubmit}
      >
        <h1
          className='text-3xl font-bold text-center'
        >
          Sign Up
        </h1>

        <input
          className='p-2 my-3 w-full rounded-md text-md text-gray-900 outline-none transition duration-300 focus:shadow-slate-400 focus:shadow-md placeholder:text-gray-500' 
          type="text"      
          name='name'
          onChange={onChange}     
          placeholder='name' 
          required
        />

        <input
          className='p-2 my-3 w-full rounded-md text-md text-gray-900 outline-none transition duration-300 focus:shadow-slate-400 focus:shadow-md placeholder:text-gray-500' 
          type="email"     
          name='email'
          onChange={onChange}    
          placeholder='email' 
          required
        />

        <input
          className='p-2 my-3 w-full rounded-md text-md text-gray-900 outline-none transition duration-300 focus:shadow-slate-400 focus:shadow-md placeholder:text-gray-500' 
          type="password"  
          name='password'
          onChange={onChange} 
          placeholder='password' 
          required
        />

        <button
          className='m-auto w-full p-2 text-base rounded-md'
          type="button"
          onClick={onLogin}
        >
          Already have an account? <b>Login here!</b>
        </button>

        <button
          className='m-auto w-full p-3 text-base rounded-md hover:bg-slate-400 hover:text-slate-800 transition duration-300 disabled:bg-gray-600 disabled:pointer-events-none'
          type="submit"
          disabled={!valid_submit}
        >
          Register now
        </button>

        {
          !!response.msgs?.length
          ?
          response.msgs.map((msg) => (
            <p 
              className={`${response.status != 201 ? "text-red-500" : "text-green-600"} text-center`}
              key={msg}
            >
              {msg.msg.replace("String", msg.loc[1][0].toUpperCase() + msg.loc[1].substring(1))}
            </p>
          ))
          :
          <p 
            className={`${response.status != 201 ? "text-red-500" : "text-green-600"} text-center p-3`}
          >
            {
              response.msgs.msg
            }
          </p>
        }

      </form>
    </div>
  )
}
