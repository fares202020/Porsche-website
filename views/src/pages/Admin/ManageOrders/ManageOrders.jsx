import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './ManageOrders.module.css';

const initialOrders = [
  {
    id: 'ORD-2026-045',
    customer: 'John Smith',
    email: 'john@example.com',
    product: 'Porsche 911 Turbo S',
    color: 'Black',
    wheelType: 'Wheel Type 1',
    amount: 207000,
    status: 'Completed',
    date: 'Feb 28, 2026',
  },
  {
    id: 'ORD-2026-044',
    customer: 'Sarah Johnson',
    email: 'sarah@example.com',
    product: 'Taycan Turbo S',
    color: 'Frozen Blue',
    wheelType: 'Wheel Type 4',
    amount: 108490,
    status: 'Processing',
    date: 'Feb 27, 2026',
  },
  {
    id: 'ORD-2026-043',
    customer: 'Michael Chen',
    email: 'michael@example.com',
    product: 'Macan Electric',
    color: 'Provence',
    wheelType: 'Wheel Type 1',
    amount: 85000,
    status: 'Processing',
    date: 'Feb 26, 2026',
  },
  {
    id: 'ORD-2026-042',
    customer: 'Emily Davis',
    email: 'emily@example.com',
    product: '911 Carrera',
    color: 'Arctic Grey',
    wheelType: 'Wheel Type 3',
    amount: 95000,
    status: 'Completed',
    date: 'Feb 25, 2026',
  },
  {
    id: 'ORD-2026-041',
    customer: 'David Wilson',
    email: 'david@example.com',
    product: 'Macan GTS',
    color: 'Volcano Grey',
    wheelType: 'Wheel Type 2',
    amount: 115000,
    status: 'Processing',
    date: 'Feb 24, 2026',
  },
  {
    id: 'ORD-2026-040',
    customer: 'Lisa Anderson',
    email: 'lisa@example.com',
    product: 'Macan',
    color: 'White',
    wheelType: 'Wheel Type 2',
    amount: 72000,
    status: 'Cancelled',
    date: 'Feb 23, 2026',
  },
];

const statusOptions = ['All', 'Processing', 'Completed', 'Cancelled'];

function formatCurrency(value) {
  return `$${value.toLocaleString()}`;
}

export default function ManageOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredOrders = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
      const matchesSearch =
        !normalizedSearch ||
        order.id.toLowerCase().includes(normalizedSearch) ||
        order.customer.toLowerCase().includes(normalizedSearch) ||
        order.product.toLowerCase().includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [orders, search, statusFilter]);

  const processingCount = orders.filter((order) => order.status === 'Processing').length;
  const completedCount = orders.filter((order) => order.status === 'Completed').length;
  const totalRevenue = orders
    .filter((order) => order.status !== 'Cancelled')
    .reduce((total, order) => total + order.amount, 0);

  const handleStatusChange = (orderId, status) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status,
            }
          : order,
      ),
    );
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.titleRow}>
            <Link className={styles.backLink} to="/admin/dashboard">
              <i className="fa-solid fa-arrow-left"></i>
              Back to Dashboard
            </Link>
            <h1>Manage Orders</h1>
          </div>
        </header>

        <section className={styles.controls} aria-label="Order filters">
          <label className={styles.searchBox} htmlFor="admin-order-search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              id="admin-order-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by order ID, customer, or product..."
            />
          </label>

          <label className={styles.filterBox} htmlFor="admin-order-status">
            <i className="fa-solid fa-filter"></i>
            <select
              id="admin-order-status"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
        </section>

        <section className={styles.summaryGrid} aria-label="Order summary">
          <article className={styles.summaryCard}>
            <span>Total Orders</span>
            <strong>{orders.length}</strong>
          </article>
          <article className={styles.summaryCard}>
            <span>Processing</span>
            <strong className={styles.warningText}>{processingCount}</strong>
          </article>
          <article className={styles.summaryCard}>
            <span>Completed</span>
            <strong className={styles.successText}>{completedCount}</strong>
          </article>
          <article className={styles.summaryCard}>
            <span>Total Revenue</span>
            <strong className={styles.revenueText}>{formatCurrency(totalRevenue)}</strong>
          </article>
        </section>

        <section className={styles.tablePanel}>
          <div className={styles.tableWrap}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>
                      <div className={styles.primaryText}>{order.customer}</div>
                      <div className={styles.secondaryText}>{order.email}</div>
                    </td>
                    <td>
                      <div className={styles.primaryText}>{order.product}</div>
                      <div className={styles.secondaryText}>
                        {order.color} - {order.wheelType}
                      </div>
                    </td>
                    <td>{formatCurrency(order.amount)}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[order.status.toLowerCase()]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{order.date}</td>
                    <td>
                      <select
                        className={styles.statusSelect}
                        value={order.status}
                        onChange={(event) => handleStatusChange(order.id, event.target.value)}
                        aria-label={`Update ${order.id} status`}
                      >
                        {statusOptions
                          .filter((status) => status !== 'All')
                          .map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 ? (
            <div className={styles.emptyState}>No orders match your filters.</div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
