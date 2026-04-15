// src/components/Navbar.jsx
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../features/auth/authSlice";
import { supabase } from "../supabaseClient";

export default function Navbar() {
  const { user, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    dispatch(clearUser());
    navigate("/login");
  };


  const displayName = user?.user_metadata?.full_name || user?.email || "";

  return (
    <nav style={styles.nav}>
      <Link to="/products" style={styles.brand}>
        FakeShop
      </Link>
      <div style={styles.links}>
        <Link to="/products" style={styles.link}>
          Products
        </Link>

        {/* Yalnız admin Dashboard görür */}
        {role === "admin" && (
          <Link to="/dashboard" style={styles.link}>
            Dashboard
          </Link>
        )}

        {user ? (
          <>
            <span style={styles.username}>👤 {displayName}</span>
            <button onClick={handleLogout} style={styles.btn}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/signup" style={styles.link}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    background: "#1a1a2e",
    color: "#fff",
    borderBottom: "2px solid #e94560",
  },
  brand: {
    color: "#e94560",
    fontWeight: "bold",
    fontSize: "20px",
    textDecoration: "none",
  },
  links: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },
  link: {
    color: "#eee",
    textDecoration: "none",
    fontSize: "15px",
  },
  username: {
    color: "#aef",
    fontWeight: "600",
  },
  btn: {
    background: "#e94560",
    color: "#fff",
    border: "none",
    padding: "6px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
};
