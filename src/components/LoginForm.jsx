import "../static/styles/LoginForm.css"

export default function LoginForm({setForm}) {
  const onRegister = () => {
    const registerForm  = document.querySelector(".login_form")
    const welcome       = document.querySelector(".welcome_login")
    registerForm.style.transform  = 'translateX(50rem)'
    registerForm.style.opacity    = 0
    registerForm.style.visibility = "hidden"
    
    welcome.style.transform  = 'translateX(-50rem)'
    welcome.style.opacity    = 0
    welcome.style.visibility = "hidden"
    setTimeout(() => setForm("register"), 500)
  }
  return (
    <div className="w-1/2 m-10">
      <form className='login_form block bg-slate-800 text-slate-100 w-full p-20 rounded-lg'>
        <h1
          className='text-3xl font-bold text-center'
        >
          Sign In
        </h1>

        <input
          className='p-2 my-3 w-full rounded-md text-md text-gray-900 outline-none transition duration-300 focus:shadow-slate-400 focus:shadow-md placeholder:text-gray-500' 
          type="email"     
          name='email'    
          placeholder='email' 
          required
        />

        <input
          className='p-2 my-3 w-full rounded-md text-md text-gray-900 outline-none transition duration-300 focus:shadow-slate-400 focus:shadow-md placeholder:text-gray-500' 
          type="password"  
          name='password' 
          placeholder='password' 
          required
        />

        <button
          className='m-auto w-full p-2 text-base rounded-md'
          type="button"
          onClick={onRegister}
        >
          You don't have an account? <b>Register here!</b>
        </button>

        <button
          className='m-auto w-full p-3 text-base rounded-md hover:bg-slate-400 hover:text-slate-800 transition duration-300'
          type="submit"
        >
          Login now
        </button>
      </form>
    </div>
  )
}
