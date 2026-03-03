import { getCurrentUser } from "../utils/auth.js";

function getMenuByRole(role) {
  const baseMenu = [
    { label: "Dashboard", href: "../Buyer/dashboard.html", icon: "🛒" },
  ];

  const userMenu = [
    { label: "My Orders", href: "../Buyer/buyerOrder.html", icon: "📦" },
    { label: "My Services", href: "../Seller/removeService.html", icon: "🛠" },
    { label: "Add Service", href: "../Seller/addService.html", icon: "➕" },
    { label: "Credits", href: "../Buyer/addCredits.html", icon: "💳" },
  ];

  const adminMenu = [
    { label: "Manage Users", href: "../Admin/admin.html", icon: "👥" },
    { label: "All Orders", href: "../Admin/managerOrder.html", icon: "📊" },
    { label: "All Services", href: "../Admin/manageServices.html", icon: "🧾" },
  ];
  const logoutItem = {
    label: "Logout",
    href: "#",
    icon: "🚪",
    isLogout: true
  };
  if (!role || role === "guest") {
    return baseMenu;
  }

  if (role === "user") {
    return [...baseMenu, ...userMenu, logoutItem];
  }

  if (role === "admin" || role === "superadmin") {
    return [...baseMenu, ...userMenu, ...adminMenu, logoutItem];
  }

  return baseMenu;
}

export function renderSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;

  const user = getCurrentUser();
  const role = user?.role || "guest";

  const menuItems = getMenuByRole(role);
  console.log(menuItems);
  const currentFile = window.location.pathname.split("/").pop().toLowerCase();

  sidebar.innerHTML = `
  <h2>${role} Panel</h2>
  <ul class="nav-links">
    ${menuItems.map(item => {
    const file = item.href.split("/").pop().toLowerCase();
    const isActive = file === currentFile ? "active" : "";
    if (item.isLogout) {
      return `
      <li>
        <a href="#" class="logout-link" id="logoutBtn">
          <span>${item.icon}</span>
          ${item.label}
        </a>
      </li>
    `;
    }
    return `
        <li>
          <a href="${item.href}" class="${isActive}">
            <span>${item.icon}</span>
            ${item.label}
          </a>
        </li>
      `;
  }).join("")}
  </ul>
`;
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      handleLogout();
    });
  }
}

function handleLogout() {
  // Remove all auth-related data
  localStorage.removeItem("token");
  window.location.href = "../index.html";
}