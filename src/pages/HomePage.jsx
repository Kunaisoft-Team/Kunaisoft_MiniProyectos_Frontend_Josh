import { useState } from 'react'
import Welcome      from '../components/Welcome'
import RegisterForm from '../components/RegisterForm'
import LoginForm    from '../components/LoginForm'

export default function HomePage() {
  const [form, setForm] = useState("register")
  return (
    <div className='flex items-center justify-between w-full h-full z-10'>
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
