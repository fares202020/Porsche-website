import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import OrderHistory from "../../components/Orders/OrderHistory";
import styles from "./Orders.module.css";

export default function Orders() {
  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.content}>
        <div className={styles.container}>
          <header className={styles.pageHeader}>
            <div>
              <p className={styles.eyebrow}>Account</p>
              <h1 className={styles.pageTitle}>Order History</h1>
              <p className={styles.pageSubtitle}>
                Review your previous vehicle orders, status updates, and item details in a dedicated view.
              </p>
            </div>
          </header>

          <section className={styles.panel}>
            <OrderHistory showIntro={false} />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export { default as OrdersContent } from "../../components/Orders/OrderHistory";
