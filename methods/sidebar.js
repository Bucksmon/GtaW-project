import { getCurrentUser } from "../utils/auth.js";

function getMenuByRole(role) {
  const baseMenu = [
    { label: "Dashboard", href: "../Buyer/dashboard.html", icon: "🛒" },
  ];

  const userMenu = [
    { label: "My Orders", href: "../Buyer/buyerOrders.html", icon: "📦" },
    { label: "My Services", href: "../Seller/removeService.html", icon: "🛠" },
    { label: "Add Service", href: "../Seller/addService.html", icon: "➕" },
    { label: "Credits", href: "../Buyer/addCredits.html", icon: "💳" },
  ];

  const adminMenu = [
    { label: "Manage Users", href: "../Admin/admin.html", icon: "👥" },
    { label: "All Orders", href: "../Admin/managerOrder.html", icon: "📊" },
    { label: "All Services", href: "../Admin/manageServices.html", icon: "🧾" },
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
const currentPage = window.location.pathname.split("/").pop();

  sidebar.innerHTML = `
      <h2>${role} Panel</h2>
    <ul class="nav-links" id="navLinks">
      ${menuItems
        .map(
          (item) => `
          <li>
            <a class="${item.href.split("/").pop() === currentPage ? "active" : ""}" href="${item.href}">
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