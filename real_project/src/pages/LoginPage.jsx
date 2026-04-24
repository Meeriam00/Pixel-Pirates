// ============================================================
// LoginPage.jsx
// Bu komponent istifadəçinin email və şifrə ilə giriş etdiyi
// səhifəni render edir.
// Giriş uğurlu olduqda:
//   1. Redux state-inə user və role məlumatları yazılır
//   2. İstifadəçi /products səhifəsinə yönləndirilir
// ============================================================

// useState — lokal state idarəetməsi üçün React hook-u.
import { useState } from "react";

// useDispatch — Redux store-a action göndərmək üçün hook.
import { useDispatch } from "react-redux";

// useNavigate — proqramatik naviqasiya üçün hook.
// Link — HTML <a> elementinin React Router versiyası.
import { useNavigate, Link } from "react-router-dom";

// supabase client — Supabase auth servisinə müraciət üçün.
import { supabase } from "../supabaseClient";

// setUser — Redux auth state-inə user və role yazan action creator.
import { setUser } from "../features/auth/authSlice";

export default function LoginPage() {

  // email — forma sahəsinin dəyərini saxlayan lokal state.
  // Başlanğıc dəyər boş string.
  const [email, setEmail] = useState("");

  // password — şifrə sahəsinin dəyərini saxlayan lokal state.
  const [password, setPassword] = useState("");

  // error — server xətasını göstərmək üçün lokal state.
  // null/boş string → xəta yoxdur; dolu string → xəta mesajı göstərilir.
  const [error, setError] = useState("");

  // loading — sorğu göndərilib cavab gözlənildiyi halda düyməni deaktiv etmək üçün.
  const [loading, setLoading] = useState(false);

  // dispatch — Redux action-larını göndərmək üçün funksiya.
  const dispatch = useDispatch();

  // navigate — başqa URL-ə keçmək üçün funksiya.
  const navigate = useNavigate();

  // handleLogin — forma submit edildikdə (Login düyməsinə basıldıqda) çağırılır.
  const handleLogin = async (e) => {
    // e.preventDefault() — formanın default davranışını (səhifəni yeniləməni) ləğv edir.
    e.preventDefault();

    // Əvvəlki xəta mesajını sıfırla.
    setError("");

    // Yükləmə vəziyyətini başlat — düymə "Logging in..." göstərir və deaktiv olur.
    setLoading(true);

    // supabase.auth.signInWithPassword — email+şifrə ilə giriş sorğusu göndərir.
    // data.user — uğurlu girişdə istifadəçi obyekti
    // error (authError adlandırdıq) — giriş uğursuz olduqda xəta obyekti
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Əgər xəta baş verdisə (yanlış şifrə, mövcud olmayan email və s.):
    if (authError) {
      setError(authError.message); // Xəta mesajını state-ə yazırıq → UI-da göstərilir
      setLoading(false);           // Yükləməni bitir
      return;                      // Funksiyanı dayandır
    }

    // Uğurlu giriş:
    const user = data.user; // Supabase-dən gələn istifadəçi obyekti

    // user.user_metadata.role — istifadəçi qeydiyyat zamanı təyin etdiyi rol.
    // Əgər rol yoxdursa, default olaraq "user" qəbul edilir.
    const role = user.user_metadata?.role || "user";

    // setUser action-u dispatch edilir — user və role Redux state-inə yazılır.
    // Bu sayədə bütün komponentlər (Navbar, ProtectedRoute, AdminRoute) güncəllənir.
    dispatch(setUser({ user, role }));

    // /products səhifəsinə yönləndir.
    navigate("/products");

    // Yükləməni bitir.
    setLoading(false);
  };

  return (
    // Merkəzdə yerləşdirilmiş tam ekran konteyner
    <div style={styles.container}>

      {/* Forma kartı */}
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>

        {/* error state dolu olduqda xəta mesajı göstərilir, boş olduqda gizlənir. */}
        {error && <p style={styles.error}>{error}</p>}

        {/* onSubmit — forma submit edildikdə handleLogin çağırılır. */}
        <form onSubmit={handleLogin} style={styles.form}>

          {/* Email sahəsi:
              value={email} — controlled input: state dəyəri ilə sinxron
              onChange — hər dəyişiklikdə email state-i yenilənir */}
          <input
            style={styles.input}
            type="email"         // Brauzer email formatını yoxlayır
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // e.target.value — yazılan dəyər
            required             // HTML validasiyası: boş buraxıla bilməz
          />

          {/* Şifrə sahəsi — type="password" dəyərləri nöqtə ilə gizlədir. */}
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Submit düyməsi:
              disabled={loading} — yükləmə zamanı düymə deaktiv edilir (ikiqat klik önlənir).
              Şərti mətn: loading true isə "Logging in...", yox isə "Login" göstərilir. */}
          <button style={styles.btn} type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Qeydiyyat linki — hesabı olmayan istifadəçilər üçün Sign Up-a keçid. */}
        <p style={styles.switchText}>
          Hesabın yoxdur?{" "}
          {/* {" "} — mətn arasında boşluq qoymaq üçün JSX triki */}
          <Link to="/signup" style={styles.link}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

// Komponent üçün inline CSS stilləri.
const styles = {
  container: {
    display: "flex",
    justifyContent: "center", // Üfüqi mərkəzləşdirmə
    alignItems: "center",     // Şaquli mərkəzləşdirmə
    minHeight: "80vh",        // Ən azı viewport hündürlüyünün 80%-i
    background: "#f0f4f8",    // Açıq boz fon
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)", // Kölgə effekti
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
    flexDirection: "column", // Elementlər şaquli sıralanır
    gap: "14px",             // Elementlər arasında boşluq
  },
  input: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
    outline: "none",         // Focus zamanı standart kənar kaldırılır
  },
  btn: {
    background: "#e94560",   // Qırmızı düymə
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "600",
  },
  error: {
    color: "red",
    marginBottom: "10px",
    fontSize: "14px",
  },
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
