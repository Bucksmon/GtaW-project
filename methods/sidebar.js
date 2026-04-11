import { getCurrentUser } from "../utils/auth.js";

const BASE = "/GtaW-project";

function getMenuByRole(role) {
  const baseMenu = [
    { label: "Dashboard", href: `${BASE}/Buyer/dashboard.html`, icon: "🛒" },
  ];

  const userMenu = [
    { label: "Orders", href: `${BASE}/Buyer/buyerOrder.html`, icon: "📦" },
    { label: "Services", href: `${BASE}/Seller/addService.html`, icon: "➕" },
    { label: "Credits", href: `${BASE}/Buyer/addCredits.html`, icon: "💳" },
  ];

  const adminMenu = [
    { label: "Manage Users", href: `${BASE}/Admin/admin.html`, icon: "👥" },
    { label: "All Orders", href: `${BASE}/Admin/managerOrder.html`, icon: "📊" },
    { label: "All Services", href: `${BASE}/Admin/manageServices.html`, icon: "🧾" },
  ];

  const settingItem = {
    label: "Setting",
    href: `${BASE}/Settings.html`,
    icon: "⚙️"
  };

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
    return [...baseMenu, ...userMenu, settingItem, logoutItem];
  }

  if (role === "admin" || role === "superadmin") {
    return [...baseMenu, ...userMenu, ...adminMenu, settingItem, logoutItem];
  }

  return baseMenu;
}

export function renderSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;

  const user = getCurrentUser();
  const role = user?.role || "guest";

  const menuItems = getMenuByRole(role);
  const currentFile = window.location.pathname.split("/").pop().toLowerCase();

  sidebar.innerHTML = `
    <h2 class="logo-title">
      <img src="${BASE}/Royal Road.png" alt="Logo">
      Royal Road
    </h2>
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
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handleLogout();
    });
  }
}

function handleLogout() {
  localStorage.removeItem("token");
  window.location.href = `${BASE}/index.html`;
}