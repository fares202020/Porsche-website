import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/Navbar/Navbar';
import styles from './Dashboard.module.css';

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
    icon: 'fa-solid fa-users',
  },
  {
    label: 'Total Products',
    value: '10',
    icon: 'fa-solid fa-car-side',
  },
  {
    label: 'Total Orders',
    value: '9',
    icon: 'fa-solid fa-bag-shopping',
  },
  {
    label: 'Revenue',
    value: '$1.25M',
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

function StatusBadge({ status }) {
  const statusClassMap = {
    Completed: styles.completed,
    Processing: styles.processing,
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
          </header>

          <section className={styles.statsGrid} aria-label="Dashboard summary">
            {stats.map((stat) => (
              <article className={styles.statCard} key={stat.label}>
                <div className={styles.statTop}>
                  <span className={styles.statIcon} aria-hidden="true">
                    <i className={stat.icon}></i>
                  </span>
                </div>
                <span className={styles.statLabel}>{stat.label}</span>
                <strong className={styles.statValue}>{stat.value}</strong>
              </article>
            ))}
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
