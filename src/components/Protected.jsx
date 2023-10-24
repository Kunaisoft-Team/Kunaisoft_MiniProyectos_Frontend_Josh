import { useState, useEffect }                  from 'react'
import { useNavigate }                          from 'react-router-dom'
import { useDispatch }                          from 'react-redux'
import { useCookies }                           from 'react-cookie'
import { useFetch }                             from '../hooks/useFetch'
import { SERVER_URL, AUTH_ROUTE, TASKS_ROUTE }  from '../utils/consts.js'
import { fetchTasks }                           from '../utils/redux/features/taskSlice.js'

export default function Protected({children}) {

  const dispatch = useDispatch()
  const [token]  = useCookies("access_token")
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      const user_response = await useFetch(`${SERVER_URL}${AUTH_ROUTE}?access_token=${token.access_token}`)
      console.log(user_response)
      if(!user_response?.data) navigate("/")
      else {
        const task_response = await useFetch(`${SERVER_URL}${TASKS_ROUTE}?user_id=${user_response.data.id}`)
        dispatch(fetchTasks({tasks: task_response.data.tasks, user: user_response.data}))
        setLoading(false)
      }
    }
    getData()
  })


  if(!loading) {
    return (
      <div>
        {children}
      </div>
    )
  }

}
