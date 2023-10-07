import { useNavigate }               from 'react-router-dom'
import { useCookies }             from 'react-cookie'
import { useFetch }               from '../hooks/useFetch'
import { SERVER_URL, AUTH_ROUTE } from '../utils/consts.js'

export default function Protected({children}) {

  const [token]  = useCookies("access_token")
  const navigate = useNavigate()

  useFetch(`${SERVER_URL}${AUTH_ROUTE}?access_token=${token.access_token}`)
  .then(response => {
    if(!response?.data) navigate("/")
  })
  return (
    <div>
      {children}
    </div>
  )
}
