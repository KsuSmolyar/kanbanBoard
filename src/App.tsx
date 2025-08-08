import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { BoardPage } from './pages/BoardPage'
import { TaskDetailsPage } from './pages/TaskDetailsPage'
import { BoardProvider } from './store/boardStore/provider'
import "./styles/palette.css";
import { Header } from './components/Header'
import { AuthContextProvider } from './store/authStore/provider'
import { ProtectedRoute } from './components/ProtectedRoute'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'

function App() {

  return (
    <AuthContextProvider>
      <BoardProvider>
          <Header/>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route path="/" element={<ProtectedRoute><BoardPage /></ProtectedRoute>} />
              <Route path="/task/:taskId" element={<ProtectedRoute><TaskDetailsPage /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
      </BoardProvider>
    </AuthContextProvider>
  )
}

export default App
