
import { useSelector } from "react-redux";

// Navigate — başqa URL-ə yönləndirməni JSX içindən etmək üçün React Router komponenti.
import { Navigate } from "react-router-dom";

// ProtectedRoute — children prop-u alır (qorunacaq komponent/səhifə).
// Məsələn: <ProtectedRoute><ProductsPage /></ProtectedRoute>
export default function ProtectedRoute({ children }) {

  // Redux auth state-indən user dəyərini oxuyuruq.
  // user = null → giriş edilməyib
  // user = {...} → giriş edilib
  const { user } = useSelector((state) => state.auth);

  // Əgər user yoxdursa (null) → /login-ə yönləndir.
  // <Navigate> komponenti render zamanı dərhal yönləndirməni həyata keçirir.
  if (!user) return <Navigate to="/login" />;

  // user varsa → children-i (qorunan səhifəni) render et.
  return children;
}
