import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Protected                        from './components/Protected'
import HomePage                         from './pages/HomePage'
import HistoryPage                      from './pages/HistoryPage'
import TasksPage                        from './pages/TasksPage'
import TaskPage                         from './pages/TaskPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'         element={<HomePage />}                          />
        <Route path='/tasks'    element={<Protected><TasksPage/></Protected>}   />
        <Route path='/task/:id' element={<Protected><TaskPage/></Protected>}    />
        <Route path='/history'  element={<Protected><HistoryPage/></Protected>} />
      </Routes>
    </BrowserRouter>
  )
}
