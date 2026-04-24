
import { createSlice } from "@reduxjs/toolkit";

// initialState — auth slice-ın başlanğıc (default) vəziyyəti.
// Proqram ilk açılanda Redux store bu dəyərlərlə başlayır:
//   user: null     → heç bir istifadəçi daxil olmayıb
//   role: null     → heç bir rol təyin edilməyib
//   loading: false → heç bir yükləmə prosesi getmir
const initialState = {
  user: null,    // Supabase-dən gələn istifadəçi obyekti (email, id, metadata və s.)
  role: null,    // İstifadəçinin rolu: "admin" və ya "user"
  loading: false, // Giriş/çıxış prosesi zamanı yükləmə göstəricisi üçün
};

// createSlice ilə "authSlice" adlı slice yaradılır.
const authSlice = createSlice({
  // name — bu slice-ın adı. Redux DevTools-da və state-ə müraciətdə istifadə olunur.
  // Məsələn: state.auth.user → buradakı "auth" bu name-dən gəlir.
  name: "auth",

  // initialState — yuxarıda təyin etdiyimiz başlanğıc vəziyyəti.
  initialState,

  // reducers — state-i dəyişdirən funksiyalar (actions).
  // Hər reducer bir action yaradır və state-i dəyişir.
  reducers: {

    // setUser — istifadəçi uğurla daxil olduqda çağırılır.
    // action.payload = { user: {...}, role: "admin" | "user" }
    // state.user və state.role dəyərləri yenilənir.
    setUser(state, action) {
      state.user = action.payload.user;   // Supabase user obyekti state-ə yazılır
      state.role = action.payload.role;   // İstifadəçinin rolu state-ə yazılır
    },

    // clearUser — istifadəçi çıxış etdikdə (logout) çağırılır.
    // state.user və state.role null-a sıfırlanır.
    clearUser(state) {
      state.user = null;  // İstifadəçi məlumatları silinir
      state.role = null;  // Rol məlumatı silinir
    },

    // setLoading — yükləmə vəziyyətini idarə etmək üçün.
    // action.payload = true (yükləmə başladı) və ya false (yükləmə bitdi)
    setLoading(state, action) {
      state.loading = action.payload; // true və ya false dəyəri mənimsədilir
    },
  },
});

// Yaradılan action creator-ları (funksiyaları) export edirik.
// Bu funksiyalar dispatch() ilə birlikdə istifadə olunur:
//   dispatch(setUser({ user, role }))  → istifadəçini state-ə yaz
//   dispatch(clearUser())              → istifadəçini state-dən sil
//   dispatch(setLoading(true))         → yükləməni başlat
export const { setUser, clearUser, setLoading } = authSlice.actions;
export default authSlice.reducer;