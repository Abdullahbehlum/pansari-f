import { Navigate } from 'react-router-dom';
import {useSelector} from "react-redux"
const ProtectedRoute = ({ children, role }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated); 
  const userRole = useSelector(state => state.auth.userRole);

  if (!isAuthenticated || userRole === "user") {
    return <Navigate to="/signin" replace />; 
  }

  return children; 
};

export default ProtectedRoute;
