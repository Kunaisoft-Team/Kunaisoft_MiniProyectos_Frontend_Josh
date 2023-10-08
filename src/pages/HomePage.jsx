import { useState }               from 'react'
import { useCookies }             from 'react-cookie'
import { useNavigate }            from 'react-router-dom'
import { useFetch }               from '../hooks/useFetch.js'
import { SERVER_URL, AUTH_ROUTE } from '../utils/consts.js'
import Welcome                    from '../components/Welcome'
import RegisterForm               from '../components/RegisterForm'
import LoginForm                  from '../components/LoginForm'

export default function HomePage() {
  
  const [form, setForm] = useState("register")
  const [token]         = useCookies("access_token")

  const navigate = useNavigate()
  
  useFetch(`${SERVER_URL}${AUTH_ROUTE}?access_token=${token.access_token}`)
  .then(res => {
    if(res?.data) navigate("/tasks")
  })

  return (
    <div className='text-center m-auto md:flex md:items-center md:justify-between h-full z-10'>
    <div className="loading">{form == "register" ? "Creating your account..." : "Logging in..."}</div>
      {
        form == "register" 
        ? 
        <>
          <Welcome form={form} />
          <RegisterForm setForm={setForm} /> 
        </>
        : 
        <>
          <LoginForm setForm={setForm} />
          <Welcome form={form} />
        </>
      }
    </div>
  )
}
