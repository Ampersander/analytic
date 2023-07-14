import { Route, Navigate } from "react-router-dom";
import AuthService from "services/auth.service";

export function ProtectedRoute({ element: Component, ...rest }) {
  const { isAuthenticated } = AuthService.useAuth();

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to="/login" replace />}
    />
  );
}
