import { Navigate } from "react-router-dom";
import { useRouteBlockStore } from "../../src/store/blockedRoute";
import LoginUser from "../../src/auth/page/LoginAcount";
import CreateAcount from "../../src/auth/page/CreateAcount";

const AuthRouteDecider = ({isLogin}: {isLogin: boolean}) => {
  const isBlock = useRouteBlockStore((state) => state.authBlocked);
  console.log(isBlock);
  
  if (isBlock) {
    return <Navigate to="/" replace />;
  }
  
  if (isLogin) {
    return <LoginUser />;
  }

  return <CreateAcount />;
};

export default AuthRouteDecider;
