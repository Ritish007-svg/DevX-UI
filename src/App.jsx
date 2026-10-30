import Hero from "./Hero"
import {Route,Routes} from "react-router-dom"
import Login from "./components/Login"
import Body from "./components/Body"
import Feed from "./components/Feed"
import Requests from "./components/Requests"
import Connections from "./components/Connections"
import Profile from "./components/userProfile"
function App() {
  return(
    <Routes>
      <Route path="/" element={<><Hero/></>}/>
        <Route path="/login" element={<Login />} />
       <Route element={<Body />}>
      
        <Route path="/feed" element={<Feed />} />
         
  <Route path="/connections" element={<Connections />} />
  <Route path="/requests" element={<Requests />} />
  <Route path="/profile" element={<Profile/>}/>
      </Route>
    </Routes>

  );
  
}

export default App;