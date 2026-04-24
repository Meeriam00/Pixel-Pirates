// ============================================================
// Navbar.jsx
// Bu komponent tətbiqin yuxarısında görünən naviqasiya panelini render edir.
// Redux store-dan istifadəçi məlumatlarını oxuyur və:
//   - Giriş edilib → istifadəçi adı + Logout düyməsi göstərilir
//   - Giriş edilməyib → Login + Sign Up linkləri göstərilir
//   - Admin isə → Dashboard linki əlavə olaraq görünür
// ============================================================

// useSelector — Redux store-dan state oxumaq üçün hook.
// useDispatch — Redux store-a action göndərmək üçün hook.
import { useSelector, useDispatch } from "react-redux";

// Link — HTML <a> elementinin React Router versiyası.
//        Səhifəni yeniləmədən URL-i dəyişir (SPA naviqasiyası).
// useNavigate — proqramatik (kod ilə) naviqasiya üçün hook.
import { Link, useNavigate } from "react-router-dom";

// clearUser — auth state-indən istifadəçi məlumatlarını silən Redux action.
import { clearUser } from "../features/auth/authSlice";

// supabase client — Supabase auth servisindən çıxış etmək üçün.
import { supabase } from "../supabaseClient";

// Navbar komponenti — heç bir prop almır, bütün məlumatları Redux-dan oxuyur.
export default function Navbar() {

  // auth state-indən user (istifadəçi obyekti) və role (rolu) oxuyuruq.
  const { user, role } = useSelector((state) => state.auth);

  // dispatch — Redux action-larını göndərmək üçün funksiya.
  const dispatch = useDispatch();

  // navigate — kodu ilə başqa URL-ə keçmək üçün funksiya.
  const navigate = useNavigate();

  // handleLogout — Logout düyməsinə basıldığında çağırılır.
  const handleLogout = async () => {
    // supabase.auth.signOut() — Supabase tərəfindən session-u (oturumu) bitirir.
    // Bu, server tərəfindəki token-i etibarsız edir.
    await supabase.auth.signOut();

    // clearUser action-u dispatch edilir — Redux state-dən user və role silinir.
    // Bu sayədə UI dərhal "giriş edilməmiş" vəziyyətinə keçir.
    dispatch(clearUser());

    // İstifadəçi /login səhifəsinə yönləndirilir.
    navigate("/login");
  };

  // displayName — Navbar-da göstəriləcək istifadəçi adını müəyyənləşdirir.
  // Prioritet: full_name (tam ad) → email → boş string
  // user?.user_metadata?.full_name — optional chaining (?.) ilə güvənli müraciət:
  //   user null isə xəta vermir, sadəcə undefined qaytarır.
  const displayName = user?.user_metadata?.full_name || user?.email || "";

  return (
    // nav elementinə inline style obyekti verilir.
    <nav style={styles.nav}>

      {/* FakeShop loqosu — /products-a keçid edir. */}
      <Link to="/products" style={styles.brand}>
        FakeShop
      </Link>

      {/* Naviqasiya linkləri bölməsi */}
      <div style={styles.links}>

        {/* Hər zaman görünən Products linki */}
        <Link to="/products" style={styles.link}>
          Products
        </Link>

        {/* Dashboard linki yalnız admin rollu istifadəçiyə göstərilir.
            role === "admin" şərti true isə Dashboard linki render edilir,
            false isə bu blok tamamilə göstərilmir. */}
        {role === "admin" && (
          <Link to="/dashboard" style={styles.link}>
            Dashboard
          </Link>
        )}

        {/* user mövcuddursa (giriş edilibsə): istifadəçi adı + Logout düyməsi göstərilir.
            user yoxdursa: Login + Sign Up linkləri göstərilir. */}
        {user ? (
          <>
            {/* 👤 ikonu ilə istifadəçi adı göstərilir. */}
            <span style={styles.username}>👤 {displayName}</span>

            {/* Logout düyməsinə basıldıqda handleLogout funksiyası çağırılır. */}
            <button onClick={handleLogout} style={styles.btn}>
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Giriş edilməyib → Login linki */}
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            {/* Giriş edilməyib → Sign Up linki */}
            <Link to="/signup" style={styles.link}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

// styles — komponentdə istifadə olunan inline CSS stilləri saxlayan obyekt.
// Fayl səviyyəsində təyin edilib ki, hər render-da yenidən yaradılmasın.
const styles = {
  nav: {
    display: "flex",              // Elementləri üfüqi sıraya düzür
    justifyContent: "space-between", // Logo sola, linklər sağa
    alignItems: "center",         // Şaquli mərkəzləşdirmə
    padding: "12px 24px",         // Yuxarı/aşağı 12px, sol/sağ 24px boşluq
    background: "#1a1a2e",        // Tünd mavi-qara fon rəngi
    color: "#fff",                // Ağ mətn rəngi
    borderBottom: "2px solid #e94560", // Altında qırmızı xətt
  },
  brand: {
    color: "#e94560",             // Qırmızı loqo rəngi
    fontWeight: "bold",           // Qalın şrift
    fontSize: "20px",
    textDecoration: "none",       // Link alt xəttini silir
  },
  links: {
    display: "flex",              // Linkləri üfüqi sıraya düzür
    gap: "16px",                  // Linklər arasında 16px boşluq
    alignItems: "center",
  },
  link: {
    color: "#eee",                // Açıq boz link rəngi
    textDecoration: "none",
    fontSize: "15px",
  },
  username: {
    color: "#aef",                // Açıq mavi istifadəçi adı rəngi
    fontWeight: "600",
  },
  btn: {
    background: "#e94560",        // Qırmızı düymə fonu
    color: "#fff",
    border: "none",
    padding: "6px 14px",
    borderRadius: "6px",          // Yuvarlaq künclər
    cursor: "pointer",            // Üzərindəki kursorun əl şəklini alması
    fontSize: "14px",
  },
};
