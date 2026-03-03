import { getCurrentUser } from "./utils/auth.js";

function getMenuByRole(role) {
  const baseMenu = [
    { label: "Marketplace", href: "/services.html", icon: "🛒" },
  ];

  const userMenu = [
    { label: "My Orders", href: "/orders.html", icon: "📦" },
    { label: "My Services", href: "/my-services.html", icon: "🛠" },
    { label: "Add Service", href: "/add-service.html", icon: "➕" },
    { label: "Credits", href: "/credits.html", icon: "💳" },
  ];

  const adminMenu = [
    { label: "Manage Users", href: "/admin/users.html", icon: "👥" },
    { label: "All Orders", href: "/admin/orders.html", icon: "📊" },
    { label: "All Services", href: "/admin/services.html", icon: "🧾" },
  ];

  if (!role || role === "guest") {
    return baseMenu;
  }

  if (role === "user") {
    return [...baseMenu, ...userMenu];
  }

  if (role === "admin" || role === "superadmin") {
    return [...baseMenu, ...userMenu, ...adminMenu];
  }

  return baseMenu;
}

export function renderSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;

  const user = getCurrentUser();
  const role = user?.role || "guest";

  const menuItems = getMenuByRole(role);
  const currentPage = window.location.pathname;

  sidebar.innerHTML = `
    <div class="sidebar-header">
      <h2>BucksMon</h2>
      <p class="role">${role.toUpperCase()}</p>
    </div>
    <ul class="sidebar-links">
      ${menuItems
        .map(
          (item) => `
          <li class="${currentPage.includes(item.href) ? "active" : ""}">
            <a href="${item.href}">
              <span>${item.icon}</span>
              ${item.label}
            </a>
          </li>
        `
        )
        .join("")}
    </ul>
  `;
}