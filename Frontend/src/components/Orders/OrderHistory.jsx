import { useState } from "react";
import styles from "./OrderHistory.module.css";

const ORDERS = [
  {
    id: "300001001",
    date: "January 4, 2023",
    total: "$71,300",
    status: "Completed",
    items: [{ name: "718 Boxster", qty: 1, price: "$71,300" }],
  },
  {
    id: "503051001",
    date: "July 18, 2025",
    total: "$444,700",
    status: "Completed",
    items: [
      { name: "911 GT3", qty: 1, price: "$230,500" },
      { name: "911 Turbo", qty: 1, price: "$214,200" },
    ],
  },
  {
    id: "633002000",
    date: "March 2026",
    total: "$156,300",
    status: "Cancelled",
    items: [
      { name: "Macan", qty: 1, price: "$64,100" },
      { name: "Taycan", qty: 1, price: "$92,200" },
    ],
  },
  {
    id: "100000004",
    date: "April 2024",
    total: "$85,400",
    status: "Processing",
    items: [{ name: "Cayenne", qty: 1, price: "$85,400" }],
  },
  {
    id: "100000005",
    date: "May 2024",
    total: "$106,700",
    status: "Completed",
    items: [{ name: "Panamera", qty: 1, price: "$106,700" }],
  },
  {
    id: "100000006",
    date: "June 2024",
    total: "$73,500",
    status: "Cancelled",
    items: [{ name: "718 Cayman", qty: 1, price: "$73,500" }],
  },
  {
    id: "100000007",
    date: "July 2024",
    total: "$103,400",
    status: "Completed",
    items: [{ name: "Taycan Cross Turismo", qty: 1, price: "$103,400" }],
  },
  {
    id: "100000008",
    date: "August 2024",
    total: "$89,800",
    status: "Processing",
    items: [{ name: "Macan Electric", qty: 1, price: "$89,800" }],
  },
  {
    id: "100000009",
    date: "September 2024",
    total: "$118,900",
    status: "Completed",
    items: [{ name: "911 Carrera", qty: 1, price: "$118,900" }],
  },
];

function StatusBadge({ status }) {
  const statusClass =
    status === "Completed"
      ? styles.completed
      : status === "Processing"
        ? styles.processing
        : styles.cancelled;

  return <span className={`${styles.statusBadge} ${statusClass}`}>{status}</span>;
}

export default function OrderHistory({ showIntro = true }) {
  const [currentPage, setCurrentPage] = useState(1);

  const ORDERS_PER_PAGE = 3;
  const TOTAL_PAGES = Math.ceil(ORDERS.length / ORDERS_PER_PAGE);
  const start = (currentPage - 1) * ORDERS_PER_PAGE;
  const paginatedOrders = ORDERS.slice(start, start + ORDERS_PER_PAGE);

  return (
    <section className={styles.history}>
      {showIntro ? (
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Account activity</p>
            <h2 className={styles.title}>Order History</h2>
            <p className={styles.subtitle}>
              Review previous vehicle orders, delivery status, and the items included in each purchase.
            </p>
          </div>

          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Total orders</span>
            <strong className={styles.summaryValue}>{ORDERS.length}</strong>
          </div>
        </div>
      ) : null}

      <div className={styles.list}>
        {paginatedOrders.map((order) => (
          <article key={order.id} className={styles.orderCard}>
            <div className={styles.orderTop}>
              <div className={styles.orderMetaGrid}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Order ID</span>
                  <span className={styles.metaValue}>{order.id}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Order date</span>
                  <span className={styles.metaValue}>{order.date}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Total</span>
                  <span className={styles.metaValue}>{order.total}</span>
                </div>
              </div>

              <StatusBadge status={order.status} />
            </div>

            <div className={styles.itemsBlock}>
              <div className={styles.itemsTitle}>Items</div>
              <div className={styles.itemsList}>
                {order.items.map((item, index) => (
                  <div key={`${order.id}-${item.name}`} className={styles.itemRowWrap}>
                    <div className={styles.itemRow}>
                      <div>
                        <div className={styles.itemName}>{item.name}</div>
                        <div className={styles.itemMeta}>Quantity: {item.qty}</div>
                      </div>
                      <div className={styles.itemPrice}>{item.price}</div>
                    </div>
                    {index < order.items.length - 1 ? <div className={styles.itemDivider} /> : null}
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.pagination} aria-label="Order history pagination">
        <button
          type="button"
          className={styles.paginationArrow}
          onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <i className={`fa-solid fa-angle-left ${styles.arrowIcon}`}></i>
        </button>

        {Array.from({ length: TOTAL_PAGES }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => setCurrentPage(page)}
            className={`${styles.paginationButton} ${currentPage === page ? styles.paginationButtonActive : ""}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          className={styles.paginationArrow}
          onClick={() => setCurrentPage((page) => Math.min(TOTAL_PAGES, page + 1))}
          disabled={currentPage === TOTAL_PAGES}
          aria-label="Next page"
        >
          <i className={`fa-solid fa-angle-right ${styles.arrowIcon}`}></i>
        </button>
      </div>
    </section>
  );
}
