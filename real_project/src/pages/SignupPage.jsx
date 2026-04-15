// src/pages/SignupPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // "user" | "admin"
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const { error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role, 
        },
      },
    });

    if (signupError) {
      setError(signupError.message);
      setLoading(false);
      return;
    }

    setSuccess("Qeydiyyat uğurlu oldu! Zəhmət olmasa emailinizi təsdiqləyin.");
    setLoading(false);
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Sign Up</h2>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
        <form onSubmit={handleSignup} style={styles.form}>
          <input
            style={styles.input}
            type="text"
            placeholder="Ad Soyad"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Şifrə (min 6 simvol)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select
            style={styles.input}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button style={styles.btn} type="submit" disabled={loading}>
            {loading ? "Qeydiyyat..." : "Qeydiyyat ol"}
          </button>
        </form>
        <p style={styles.switchText}>
          Artıq hesabın var?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    background: "#f0f4f8",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    width: "360px",
  },
  title: {
    marginBottom: "24px",
    color: "#1a1a2e",
    fontSize: "24px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  input: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
    outline: "none",
  },
  btn: {
    background: "#1a1a2e",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "600",
  },
  error: { color: "red", fontSize: "14px" },
  success: { color: "green", fontSize: "14px" },
  switchText: {
    textAlign: "center",
    marginTop: "16px",
    fontSize: "14px",
    color: "#555",
  },
  link: {
    color: "#e94560",
    fontWeight: "bold",
    textDecoration: "none",
  },
};
