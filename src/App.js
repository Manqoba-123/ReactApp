import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from  "./pages/Home"
import Profile from  "./pages/Profile"
import Signin from  "./pages/Signin"
import SignUp from  "./pages/SignUp"
import ForgotPassword from  "./pages/ForgotPassword"
import Offers from  "./pages/Offers"

function App() {
  return (
    <>
    //Creating different pages
     <Router>
        <Routes>
          <Route path="/" element={<Home/>} /> 
          <Route path="/profile" element={<Profile/>} /> 
          <Route path="/sign-in" element={<Signin/>} /> 
          <Route path="/sign-up" element={<SignUp/>} /> 
          <Route path="/forgot-password" element={<ForgotPassword/>} /> 
          <Route path="/offers" element={<Offers/>} /> 
        </Routes>
     </Router>
    </>
  );
}

export default App;
