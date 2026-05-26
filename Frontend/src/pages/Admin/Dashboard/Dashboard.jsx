import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/Navbar/Navbar';
import styles from './Dashboard.module.css';

const inventory = [
  { category: 'SUV', count: 4 },
  { category: 'Sports', count: 2 },
  { category: 'Electric', count: 2 },
  { category: 'Sedan', count: 2 },
];

const statusBreakdown = [
  { label: 'Completed', count: 5, className: styles.completed },
  { label: 'Processing', count: 2, className: styles.processing },
  { label: 'Cancelled', count: 2, className: styles.cancelled },
];

const recentOrders = [
  {
    id: '503051001',
    customer: 'Sarah Johnson',
    product: '911 GT3',
    color: 'Python Green',
    wheelType: 'Wheel Type 3',
    amount: '$444,700',
    status: 'Completed',
    date: 'July 18, 2025',
  },
  {
    id: '633002000',
    customer: 'Michael Chen',
    product: 'Macan',
    color: 'Volcano Grey',
    wheelType: 'Wheel Type 2',
    amount: '$156,300',
    status: 'Cancelled',
    date: 'March 2026',
  },
  {
    id: '100000008',
    customer: 'Emily Davis',
    product: 'Macan Electric',
    color: 'Provence',
    wheelType: 'Wheel Type 1',
    amount: '$89,800',
    status: 'Processing',
    date: 'August 2024',
  },
  {
    id: '100000009',
    customer: 'John Smith',
    product: '911 Carrera',
    color: 'Arctic Grey',
    wheelType: 'Wheel Type 3',
    amount: '$118,900',
    status: 'Completed',
    date: 'September 2024',
  },
];

const stats = [
  {
    label: 'Total Users',
    value: '2,547',
    delta: '+12.5%',
    icon: 'fa-solid fa-users',
  },
  {
    label: 'Total Products',
    value: '10',
    delta: '+5.2%',
    icon: 'fa-solid fa-car-side',
  },
  {
    label: 'Total Orders',
    value: '9',
    delta: '+18.3%',
    icon: 'fa-solid fa-bag-shopping',
  },
  {
    label: 'Revenue',
    value: '$1.25M',
    delta: '+23.1%',
    icon: 'fa-solid fa-dollar-sign',
  },
];

const quickActions = [
  {
    title: 'Manage Cars',
    description: 'Add, edit, or retire vehicles from inventory.',
    href: '/admin/cars',
    icon: 'fa-solid fa-car-side',
  },
  {
    title: 'Manage Users',
    description: 'Review account records and customer access.',
    href: '/admin/users',
    icon: 'fa-solid fa-user-gear',
  },
  {
    title: 'Manage Orders',
    description: 'Track order status and delivery progress.',
    href: '/admin/orders',
    icon: 'fa-solid fa-clipboard-list',
  },
];

const totalInventory = inventory.reduce((total, item) => total + item.count, 0);
const totalStatuses = statusBreakdown.reduce((total, item) => total + item.count, 0);

function StatusBadge({ status }) {
  const statusClassMap = {
    Completed: styles.completed,
    Processing: styles.processing,
    Shipped: styles.shipped,
    Cancelled: styles.cancelled,
  };

  return <span className={`${styles.statusBadge} ${statusClassMap[status] || styles.cancelled}`}>{status}</span>;
}

export default function Dashboard() {
  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.content}>
        <div className={styles.container}>
          <header className={styles.pageHeader}>
            <div>
              <p className={styles.eyebrow}>Administration</p>
              <h1 className={styles.pageTitle}>Admin Dashboard</h1>
              <p className={styles.pageSubtitle}>
                Welcome back, Admin User. Monitor inventory, order movement, and operational activity.
              </p>
            </div>

            <div className={styles.headerActions}>
              <Link className={styles.primaryButton} to="/admin/cars">
                <i className="fa-solid fa-car-side"></i>
                Manage Cars
              </Link>
              <Link className={styles.secondaryButton} to="/admin/orders">
                <i className="fa-solid fa-receipt"></i>
                View Orders
              </Link>
            </div>
          </header>

          <section className={styles.statsGrid} aria-label="Dashboard summary">
            {stats.map((stat) => (
              <article className={styles.statCard} key={stat.label}>
                <div className={styles.statTop}>
                  <span className={styles.statIcon} aria-hidden="true">
                    <i className={stat.icon}></i>
                  </span>
                  <span className={styles.statDelta}>
                    <i className="fa-solid fa-arrow-trend-up"></i>
                    {stat.delta}
                  </span>
                </div>
                <span className={styles.statLabel}>{stat.label}</span>
                <strong className={styles.statValue}>{stat.value}</strong>
              </article>
            ))}
          </section>

          <section className={styles.insightsGrid} aria-label="Dashboard insights">
            <article className={styles.panel}>
              <div className={styles.panelHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Inventory Mix</p>
                  <h2 className={styles.panelTitle}>Products by category</h2>
                </div>
                <span className={styles.panelMetric}>{totalInventory} models</span>
              </div>

              <div className={styles.barList}>
                {inventory.map((item) => (
                  <div className={styles.barItem} key={item.category}>
                    <div className={styles.barMeta}>
                      <span>{item.category}</span>
                      <strong>{item.count}</strong>
                    </div>
                    <div className={styles.barTrack} aria-hidden="true">
                      <span style={{ width: `${(item.count / totalInventory) * 100}%` }}></span>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className={styles.panel}>
              <div className={styles.panelHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Order Status Breakdown</p>
                  <h2 className={styles.panelTitle}>Fulfillment health</h2>
                </div>
                <span className={styles.panelMetric}>{totalStatuses} orders</span>
              </div>

              <div className={styles.statusChart}>
                <div className={styles.donut} aria-hidden="true">
                  <span>{Math.round((statusBreakdown[0].count / totalStatuses) * 100)}%</span>
                </div>

                <div className={styles.statusList}>
                  {statusBreakdown.map((item) => (
                    <div className={styles.statusRow} key={item.label}>
                      <span className={`${styles.statusDot} ${item.className}`}></span>
                      <span>{item.label}</span>
                      <strong>{item.count}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </section>

          <section className={styles.quickGrid} aria-label="Admin shortcuts">
            {quickActions.map((action) => (
              <Link className={styles.quickCard} to={action.href} key={action.title}>
                <span className={styles.quickIcon} aria-hidden="true">
                  <i className={action.icon}></i>
                </span>
                <span>
                  <strong>{action.title}</strong>
                  <small>{action.description}</small>
                </span>
                <i className={`fa-solid fa-arrow-right ${styles.quickArrow}`}></i>
              </Link>
            ))}
          </section>

          <section className={styles.tablePanel}>
            <div className={styles.panelHeader}>
              <div>
                <p className={styles.panelEyebrow}>Recent Orders</p>
                <h2 className={styles.panelTitle}>Latest customer activity</h2>
              </div>
              <Link className={styles.textLink} to="/admin/orders">
                View all
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

            <div className={styles.tableWrap}>
              <table className={styles.ordersTable}>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>
                        <div>{order.product}</div>
                        <div className={styles.secondaryText}>
                          {order.color} - {order.wheelType}
                        </div>
                      </td>
                      <td>{order.amount}</td>
                      <td>
                        <StatusBadge status={order.status} />
                      </td>
                      <td>{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
