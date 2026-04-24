
// RTK Query — server sorğularını, keşi və yükləmə vəziyyətlərini
// avtomatik idarə edən güclü bir alətdir.
// ============================================================

// createApi — RTK Query-dən API slice yaratmaq üçün istifadə edilir.
// fakeBaseQuery — real HTTP endpoint olmadan (Supabase SDK kimi xüsusi client istifadə edərkən)
//                  öz sorğu məntiqini yazmağa imkan verir.
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

// Supabase client-i import edirik — bütün DB sorğuları bu obyekt vasitəsilə edilir.
import { supabase } from "../../supabaseClient";
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fakeBaseQuery(),

  tagTypes: ["Products"],

  // endpoints — API-nin əməliyyatları (sorğular və mutasiyalar) burada təyin edilir.
  // builder.query → məlumat oxumaq üçün (GET əməliyyatı)
  // builder.mutation → məlumat dəyişdirmək üçün (POST/PUT/DELETE əməliyyatları)
  endpoints: (builder) => ({

    // ─── 1. GET PRODUCTS ─────────────────────────────────────────
    // Bütün məhsulları Supabase-dən oxuyur.
    getProducts: builder.query({

      // queryFn — sorğunun əsas məntiqini özündə saxlayır.
      // async/await istifadə edilir, çünki Supabase sorğusu asinxrondur.
      async queryFn() {
        // supabase.from("Fake_Products") — "Fake_Products" cədvəlinə müraciət edir.
        // .select("*") — cədvəldəki bütün sütunları seçir.
        // .order("id", { ascending: true }) — id-yə görə artan sırada sıralayır.
        const { data, error } = await supabase
          .from("Fake_Products")
          .select("*")
          .order("id", { ascending: true });

        // Əgər xəta baş verərsə, { error } qaytarılır — RTK Query bunu error state kimi işləyir.
        if (error) return { error };

        // Uğurlu olduqda { data } qaytarılır — komponentdə data dəyişəni bu massiv olur.
        return { data };
      },

      // providesTags — bu sorğunun "Products" etiketini təmin etdiyini bildirir.
      // invalidatesTags olan mutasiyalar bu etiketi pozur → sorğu yenidən işə düşür.
      providesTags: ["Products"],
    }),

    // ─── 2. ADD PRODUCT ──────────────────────────────────────────
    // Yeni məhsul əlavə edir.
    addProduct: builder.mutation({

      // queryFn — newProduct arqumenti mutasiya çağırılarkən ötürülən məlumatdır.
      // Məsələn: addProduct({ title: "Çanta", price: 49.99 })
      async queryFn(newProduct) {
        // supabase.from("Fake_Products") — "Fake_Products" cədvəlinə müraciət edir.
        // .insert([newProduct]) — yeni sətir əlavə edir (massiv kimi ötürülür).
        // .select() — əlavə edilmiş sətri geri qaytarır.
        const { data, error } = await supabase
          .from("Fake_Products")
          .insert([newProduct])
          .select();

        if (error) return { error };
        return { data };
      },

      // invalidatesTags — bu mutasiya icra edildikdə "Products" etiketini pozur,
      // buna görə getProducts sorğusu avtomatik yenidən işə düşür və siyahı yenilənir.
      invalidatesTags: ["Products"],
    }),

    // ─── 3. EDIT PRODUCT ─────────────────────────────────────────
    // Mövcud məhsulu redaktə edir.
    editProduct: builder.mutation({

      // queryFn — { id, ...updates } şəklində arqument alır.
      // id — hansı sətrin yenilənəcəyini bildirir.
      // ...updates — yenilənəcək sahələr (title, price və s.).
      async queryFn({ id, ...updates }) {
        // .update(updates) — ötürülən sahələri güncəlləyir.
        // .eq("id", id) — yalnız id-si uyğun gələn sətri yenilə (WHERE id = id).
        // .select() — yenilənmiş sətri geri qaytarır.
        const { data, error } = await supabase
          .from("Fake_Products")
          .update(updates)
          .eq("id", id)
          .select();

        if (error) return { error };
        return { data };
      },

      // Məhsul yeniləndi → "Products" keşi pozulur → siyahı yenilənir.
      invalidatesTags: ["Products"],
    }),

    // ─── 4. DELETE PRODUCT ───────────────────────────────────────
    // Məhsulu silir.
    deleteProduct: builder.mutation({

      // queryFn — silmək istənilən məhsulun id-si arqument kimi ötürülür.
      async queryFn(id) {
        // .delete() — sətri silir.
        // .eq("id", id) — yalnız id-si uyğun gələn sətri sil (WHERE id = id).
        // Silmə əməliyyatında data geri qaytarılmır, buna görə yalnız error yoxlanılır.
        const { error } = await supabase
          .from("Fake_Products")
          .delete()
          .eq("id", id);

        if (error) return { error };

        // Uğurlu silmə halında silinmiş id geri qaytarılır (istəyə görə istifadə edilə bilər).
        return { data: id };
      },

      // Məhsul silindi → "Products" keşi pozulur → siyahı yenilənir.
      invalidatesTags: ["Products"],
    }),

  }),
});

// Hook-ları export edirik — bu hook-lar komponentlərdə istifadə olunur:
//   useGetProductsQuery()          → bütün məhsulları oxu
//   useAddProductMutation()        → yeni məhsul əlavə et
//   useEditProductMutation()       → məhsulu redaktə et
//   useDeleteProductMutation()     → məhsulu sil
// RTK Query bu hook-ları createApi-nin endpoints-indən avtomatik yaradır.
export const {
  useGetProductsQuery,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
} = productsApi;