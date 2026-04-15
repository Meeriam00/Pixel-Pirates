// src/pages/ProductsPage.jsx
import { useGetProductsQuery } from "../features/products/productsApi";

export default function ProductsPage() {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  if (isLoading) return <p style={styles.msg}>Yüklənir...</p>;
  if (isError) return <p style={styles.msg}>Xəta baş verdi!</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Məhsullar</h2>
      <div style={styles.grid}>
        {products?.map((product) => (
          <div key={product.id} style={styles.card}>
            <h3 style={styles.productTitle}>{product.title}</h3>
            <p style={styles.price}>{product.price} ₼</p>
          </div>
        ))}
      </div>
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
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    borderTop: "4px solid #e94560",
  },
  productTitle: {
    fontSize: "17px",
    color: "#222",
    marginBottom: "8px",
  },
  price: {
    fontSize: "16px",
    color: "#e94560",
    fontWeight: "bold",
  },
  msg: {
    padding: "40px",
    textAlign: "center",
    fontSize: "18px",
    color: "#666",
  },
};
