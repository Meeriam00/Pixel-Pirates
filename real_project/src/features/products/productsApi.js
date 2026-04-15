// src/features/products/productsApi.js
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../../supabaseClient";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Products"],
  endpoints: (builder) => ({


    getProducts: builder.query({
      async queryFn() {
        const { data, error } = await supabase
          .from("Fake_Products")
          .select("*")
          // azalandan coxalana
          // descending coxalandan azalana
          .order("id", { ascending: true });
        if (error) return { error };
        return { data };
      },
      providesTags: ["Products"],
    }),


    addProduct: builder.mutation({
      async queryFn(newProduct) {
        const { data, error } = await supabase
          .from("Fake_Products")
          .insert([newProduct])
          .select();
        if (error) return { error };
        return { data };
      },
      invalidatesTags: ["Products"],
    }),






    editProduct: builder.mutation({
      async queryFn({ id, ...updates }) {
        const { data, error } = await supabase
          .from("Fake_Products")
          .update(updates)
          .eq("id", id)
          .select();
        if (error) return { error };
        return { data };
      },
      invalidatesTags: ["Products"],
    }),





    deleteProduct: builder.mutation({
      async queryFn(id) {
        const { error } = await supabase
          .from("Fake_Products")
          .delete()
          .eq("id", id);
        if (error) return { error };
        return { data: id };
      },
      invalidatesTags: ["Products"],
    }),




  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
} = productsApi;