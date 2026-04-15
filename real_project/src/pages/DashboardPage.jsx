// src/pages/DashboardPage.jsx
import { useState } from "react";
import {
  useGetProductsQuery,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
} from "../features/products/productsApi";

const emptyForm = { title: "", price: "" };

export default function DashboardPage() {
  const { data: products, isLoading } = useGetProductsQuery();
  const [addProduct] = useAddProductMutation();
  const [editProduct] = useEditProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!form.title.trim() || !form.price) {
      setFormError("Bütün sahələri doldurun!");
      return;
    }

    const payload = {
      title: form.title.trim(),
      price: parseFloat(form.price),
    };

    if (editingId) {
      await editProduct({ id: editingId, ...payload });
      setEditingId(null);
    } else {
      await addProduct(payload);
    }

    setForm(emptyForm);
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({ title: product.title, price: product.price });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu məhsulu silmək istəyirsiniz?")) {
      await deleteProduct(id);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormError("");
  };

  if (isLoading) return <p style={styles.msg}>Yüklənir...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Admin Dashboard</h2>

      {/* FORM */}
      <div style={styles.formCard}>
        <h3 style={styles.formTitle}>
          {editingId ? "Məhsulu Redaktə Et" : "Yeni Məhsul Əlavə Et"}
        </h3>
        {formError && <p style={styles.error}>{formError}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            type="text"
            name="title"
            placeholder="Məhsulun adı"
            value={form.title}
            onChange={handleChange}
          />
          <input
            style={styles.input}
            type="number"
            name="price"
            placeholder="Qiymət (₼)"
            value={form.price}
            onChange={handleChange}
            min="0"
            step="0.01"
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <button style={styles.btnPrimary} type="submit">
              {editingId ? "Yadda Saxla" : "Əlavə Et"}
            </button>
            {editingId && (
              <button
                style={styles.btnSecondary}
                type="button"
                onClick={handleCancel}
              >
                Ləğv Et
              </button>
            )}
          </div>
        </form>
      </div>

      {/* TABLE */}
      <table style={styles.table}>
        <thead>
          <tr style={styles.thead}>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Məhsulun Adı</th>
            <th style={styles.th}>Qiymət (₼)</th>
            <th style={styles.th}>Əməliyyatlar</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product.id} style={styles.tr}>
              <td style={styles.td}>{product.id}</td>
              <td style={styles.td}>{product.title}</td>
              <td style={styles.td}>{product.price} ₼</td>
              <td style={styles.td}>
                <button
                  style={styles.editBtn}
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(product.id)}
                >
                 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px 40px",
    background: "#f9fafb",
    minHeight: "calc(100vh - 56px)",
  },
  title: {
    fontSize: "26px",
    color: "#1a1a2e",
    marginBottom: "24px",
  },
  formCard: {
    background: "#fff",
    padding: "24px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    marginBottom: "30px",
    maxWidth: "500px",
  },
  formTitle: {
    marginBottom: "16px",
    color: "#333",
    fontSize: "18px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
    outline: "none",
  },
  btnPrimary: {
    background: "#1a1a2e",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  },
  btnSecondary: {
    background: "#999",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },
  error: {
    color: "red",
    fontSize: "13px",
    marginBottom: "8px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },
  thead: {
    background: "#1a1a2e",
  },
  th: {
    padding: "14px 16px",
    color: "#fff",
    textAlign: "left",
    fontSize: "14px",
    fontWeight: "600",
  },
  tr: {
    borderBottom: "1px solid #eee",
  },
  td: {
    padding: "12px 16px",
    fontSize: "14px",
    color: "#333",
    verticalAlign: "middle",
  },
  editBtn: {
    background: "#f0a500",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "8px",
    fontSize: "13px",
  },
  deleteBtn: {
    background: "#e94560",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
  },
  msg: {
    padding: "40px",
    textAlign: "center",
    fontSize: "18px",
    color: "#666",
  },
};
