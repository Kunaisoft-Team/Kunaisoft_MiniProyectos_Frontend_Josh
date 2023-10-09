import "../static/styles/Tasks.css"

export default function History({ tasks }) {  
  return (
    <div className="overflow-auto md:w-[calc(100vw/3)] md:h-[calc(100vh/1.5)]">
      <h1 className="text-center text-3xl font-semibold p-2">
        Tasks to do
      </h1>
      {
        tasks.length > 0
        ?
        tasks.map(task => (
          <div className='tasks relative bg-slate-600 text-slate-100 mx-10 mt-5 p-5 rounded-md' key={task._id}>
            <i 
              className="fa-solid fa-check absolute p-3 text-2xl transition duration-300"
            ></i>
            <h1 
              className='text-2xl font-bold p-3 ml-7'
            >
              {task.title}
            </h1>
          </div>
        ))
        :
        <h1 className="text-justify text-lg mx-10 mt-5">
          There's no tasks on the history. Add a new task and see how many tasks your added!
        </h1>
      }
    </div>
  )
}
