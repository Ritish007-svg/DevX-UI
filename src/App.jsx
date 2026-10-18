import Hero from "./Hero"
import {Route,Routes} from "react-router-dom"
import Login from "./components/Login"
import Body from "./components/Body"
import Feed from "./components/Feed"
function App() {
  return(
    <Routes>
      <Route path="/" element={<><Hero/></>}/>
       <Route element={<Body />}>
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
      </Route>
    </Routes>

  );
  
}

export default App;