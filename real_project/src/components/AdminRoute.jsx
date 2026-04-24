
import { useSelector } from "react-redux";

// Navigate — JSX içindən yönləndirmə üçün React Router komponenti.
import { Navigate } from "react-router-dom";

// AdminRoute — children prop-u alır (qorunacaq admin komponenti/səhifəsi).
// Məsələn: <AdminRoute><DashboardPage /></AdminRoute>
export default function AdminRoute({ children }) {

  // Redux auth state-indən həm user, həm də role dəyərini oxuyuruq.
  // user — giriş etmiş istifadəçi obyekti (və ya null)
  // role — istifadəçinin rolu: "admin" və ya "user" (və ya null)
  const { user, role } = useSelector((state) => state.auth);

  // Birinci yoxlama: İstifadəçi giriş etməyibsə → /login-ə yönləndir.
  if (!user) return <Navigate to="/login" />;

  // İkinci yoxlama: İstifadəçi giriş edib amma admin deyilsə → /products-a yönləndir.
  // Bu, adi (user rollu) istifadəçinin dashboard-a girişini maneə törədir.
  if (role !== "admin") return <Navigate to="/products" />;

  return children;
}
