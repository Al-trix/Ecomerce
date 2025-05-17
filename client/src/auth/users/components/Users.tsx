import { useAppSelector } from "../../hooks/store.ts";
const users = () => {
  const users = useAppSelector((state) => state.products);
  console.log(users);
  
  console.log(users);
  return (
    <div>
      
    </div>
  )
}

export default users
