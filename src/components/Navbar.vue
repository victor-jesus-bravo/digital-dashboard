<template>
  <nav class="main-header navbar navbar-expand-md navbar-light">
    <div class="container">
      <router-link to="/" class="navbar-brand">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/10/Whirlpool_Corporation_Logo.png"
          alt="AdminLTE Logo"
          class="brand-image"
          style="opacity: 0.8; margin-right: 20px"
        />
        <span class="brand-text font-weight-light"
          >DigitalDashboard <strong>1.0</strong></span
        >
      </router-link>
      <div class="collapse navbar-collapse order-3" id="navbarCollapse">
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a
              id="dropdownSubMenu1"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              class="nav-link dropdown-toggle"
              >Requirements</a
            >
            <ul
              aria-labelledby="dropdownSubMenu1"
              class="dropdown-menu border-0 shadow"
              style="left: 0px; right: inherit"
            >
              <li>
                <router-link to="/" class="nav-link" active-class="active">
                  KanbanBoard
                </router-link>
              </li>

              <li>
                <router-link
                  to="/reqs-chart-board"
                  class="nav-link"
                  active-class="active"
                >
                  ChartBoard
                </router-link>
              </li>

              <li>
                <router-link
                  to="/reqs-table"
                  class="nav-link"
                  active-class="active"
                >
                  Table
                </router-link>
              </li>

              <li>
                <router-link
                  to="/request-requirement"
                  class="nav-link"
                  active-class="active"
                >
                  Request
                </router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item dropdown">
            <a
              id="dropdownSubMenu2"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              class="nav-link dropdown-toggle"
              >Incidents</a
            >
            <ul
              aria-labelledby="dropdownSubMenu2"
              class="dropdown-menu border-0 shadow"
              style="left: 0px; right: inherit"
            >
              <li>
                <router-link to="/inc-kanban" class="nav-link" active-class="active">
                  KanbanBoard
                </router-link>
              </li>

              <li>
                <router-link
                  to="/inc-chart-board"
                  class="nav-link"
                  active-class="active"
                >
                  ChartBoard
                </router-link>
              </li>

              <li>
                <router-link
                  to="/inc-table"
                  class="nav-link"
                  active-class="active"
                >
                  Table
                </router-link>
              </li>
              <li>
                <router-link
                  to="/request-incident"
                  class="nav-link"
                  active-class="active"
                >
                  Request
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {};
</script>
<style></style>
