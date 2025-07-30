import { Navigate, Outlet } from "react-router-dom"
import {useInfoUser, useInfoSeller} from "../../hooks/useInfoUser"
import {PropagateLoader} from "react-spinners"

const ProtectedRoutes = () => {
  const { infoUser, status } = useInfoUser()
  const { infoSeller, status: statusSeller } = useInfoSeller()

  console.log(infoUser);
  return status === "pending" || statusSeller === "pending" ? (
    <div>
      <PropagateLoader />
    </div>
  ) : infoUser ? (
    <Outlet />
  ) : infoSeller ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}

export default ProtectedRoutes
