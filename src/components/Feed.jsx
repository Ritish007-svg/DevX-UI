import { useSelector } from "react-redux";

function Feed() {
  const user=useSelector((store)=>store.user); 
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <h1 className="text-3xl">Welcome {user?.firstName}</h1>
    </div>
  );
}

export default Feed;