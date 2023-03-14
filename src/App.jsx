import Login from '../pages/Login'
import Reports from '../pages/Reports'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisteredData from '../pages/RegisteredData';
import Activities from '../pages/Activities';


function App() {
  const user = localStorage.getItem("token");
  return (
    <div>
<BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
          {user && <Route path="/activities" element={<Activities />} />}
         <Route path="/reports" element={<Reports />} />
         <Route path="/registered_data" element={<RegisteredData />} />
          {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
</BrowserRouter>
     {/* <Login />
     <MainPage />
     <RegistrationForm /> */}
    </div>
  )
}

export default App
