import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Protected                        from './components/Protected'
import HomePage                         from './pages/HomePage'
import TasksPage                        from './pages/TasksPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'       element={<HomePage />} />
        <Route path='/tasks'  element={<Protected><TasksPage/></Protected>} />
      </Routes>
    </BrowserRouter>
  )
}
