import { useEffect } from "react";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { Outlet,useLocation,useNavigate } from "react-router-dom";
import { addUser } from "../utils/UserSlice";
import BASE_URL from "../utils/constants";


const Body=()=>
{
const dispatch=useDispatch();
const navigate=useNavigate();
const location=useLocation();
const user=useSelector((store=>store.user))


const fetchUser=async()=>
{
try{
const response=await axios.get(BASE_URL+"/profile/view",{
withCredentials:true,
});
dispatch(addUser(response.data));
}
catch(err)
{
 if (location.pathname !== "/login") navigate("/login");
}
}

  useEffect(() => {
    if (!user) fetchUser();
  }, []);

  return <Outlet />;
};


export default Body;