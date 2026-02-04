import { Route, Routes } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import PrivateRoute from "./components/PrivateRoute"
import SharedPage from "./pages/SharedPage"
import Error from "./pages/Error"
import DashBoard from "./components/dashboard/Dashboard"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />}/>
      <Route path="/dashboard" element={
        <PrivateRoute>
          <DashBoard />
        </PrivateRoute>
      }/>
      <Route path="/shared/:shareLink" element={<SharedPage />} />
      <Route path="*" element={<Error />}/>
    </Routes>
  )
}

export default App