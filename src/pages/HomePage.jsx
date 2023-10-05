import { useState } from 'react'
import Welcome      from '../components/Welcome'
import RegisterForm from '../components/RegisterForm'
import LoginForm    from '../components/LoginForm'

export default function HomePage() {
  const [form, setForm] = useState("register")
  return (
    <div className='flex items-center justify-between w-full h-full '>
      {
        form == "register" 
        ? 
        <>
          <Welcome form={form} />
          <RegisterForm form={form} setForm={setForm} /> 
        </>
        : 
        <>
          <LoginForm form={form} setForm={setForm} />
          <Welcome form={form} />
        </>
      }
    </div>
  )
}
