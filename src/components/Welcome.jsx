export default function Welcome({form}) {
  return (
    <div className={`${form == "register" ? "welcome_register" : "welcome_login"} p-5 flex flex-col items-center justify-center text-slate-300 font-bold rounded-lg md:w-1/2`}>
      <h1 className="text-3xl my-2">Welcome to the Task App!</h1>
      <p className="text-center text-base">Here you'll be able to handle all your dialy task</p>
      <p className="text-center mb-2 text-base">in a <b>practical</b> and <b>simple</b> way!.</p>
      <p className="text-center text-base">
        {
          form == "register" 
          ? <b>Register now to start to completed all your goals!</b> 
          : <b>Login with an existing account!</b>
        }
      </p>
    </div>
  )
}
