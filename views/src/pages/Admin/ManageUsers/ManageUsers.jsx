import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './ManageUsers.module.css';

const initialUsers = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    role: 'User',
    status: 'Active',
    joinDate: 'Jan 15, 2026',
    orders: 3,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'User',
    status: 'Active',
    joinDate: 'Feb 1, 2026',
    orders: 2,
  },
  {
    id: 3,
    name: 'Michael Chen',
    email: 'michael@example.com',
    role: 'User',
    status: 'Active',
    joinDate: 'Feb 10, 2026',
    orders: 5,
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily@example.com',
    role: 'User',
    status: 'Inactive',
    joinDate: 'Jan 20, 2026',
    orders: 1,
  },
  {
    id: 5,
    name: 'David Wilson',
    email: 'david@example.com',
    role: 'User',
    status: 'Active',
    joinDate: 'Feb 15, 2026',
    orders: 4,
  },
];

function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function ManageUsers() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');

  const filteredUsers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return users;
    }

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(normalizedSearch) ||
        user.email.toLowerCase().includes(normalizedSearch),
    );
  }, [search, users]);

  const totalOrders = users.reduce((total, user) => total + user.orders, 0);
  const activeUsers = users.filter((user) => user.status === 'Active').length;
  const inactiveUsers = users.length - activeUsers;

  const handleToggleUser = (userId) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === 'Active' ? 'Inactive' : 'Active',
            }
          : user,
      ),
    );
  };

  const handleDeleteUser = (userId) => {
    setUsers((currentUsers) => currentUsers.filter((user) => user.id !== userId));
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
            <h1>Manage Users</h1>
          </div>
        </header>

        <label className={styles.searchBox} htmlFor="admin-user-search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            id="admin-user-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search users by name or email..."
          />
        </label>

        <section className={styles.summaryGrid} aria-label="User summary">
          <article className={styles.summaryCard}>
            <span>Total Users</span>
            <strong>{users.length}</strong>
          </article>
          <article className={styles.summaryCard}>
            <span>Active Users</span>
            <strong className={styles.successText}>{activeUsers}</strong>
          </article>
          <article className={styles.summaryCard}>
            <span>Inactive Users</span>
            <strong className={styles.dangerText}>{inactiveUsers}</strong>
          </article>
          <article className={styles.summaryCard}>
            <span>Total Orders</span>
            <strong>{totalOrders}</strong>
          </article>
        </section>

        <section className={styles.tablePanel}>
          <div className={styles.tableWrap}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Join Date</th>
                  <th>Orders</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className={styles.userCell}>
                        <span className={styles.avatar}>{getInitials(user.name)}</span>
                        <span>{user.name}</span>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className={styles.roleBadge}>{user.role}</span>
                    </td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${
                          user.status === 'Active' ? styles.active : styles.inactive
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td>{user.joinDate}</td>
                    <td>{user.orders}</td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          className={styles.warnButton}
                          type="button"
                          onClick={() => handleToggleUser(user.id)}
                          aria-label={`Toggle ${user.name} status`}
                          title="Toggle user status"
                        >
                          <i className="fa-solid fa-ban"></i>
                        </button>
                        <button
                          className={styles.deleteButton}
                          type="button"
                          onClick={() => handleDeleteUser(user.id)}
                          aria-label={`Delete ${user.name}`}
                          title="Delete user"
                        >
                          <i className="fa-regular fa-trash-can"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 ? (
            <div className={styles.emptyState}>No users match your search.</div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
