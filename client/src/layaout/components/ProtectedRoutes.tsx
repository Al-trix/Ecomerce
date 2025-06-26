import { Navigate, Outlet } from "react-router-dom"
import useInfoUser from "../../hooks/useInfoUser"
import {PropagateLoader} from "react-spinners"

const ProtectedRoutes = () => {
  const { infoUser, isLoading } = useInfoUser()

  console.log(infoUser);
  return isLoading ? (
    <div>
      <PropagateLoader />
    </div>
  ) : infoUser ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}

export default ProtectedRoutes
