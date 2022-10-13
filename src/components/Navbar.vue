<template>
  <nav class="main-header navbar navbar-expand-md navbar-light">
    <div class="container">
      <router-link to="/" class="navbar-brand">
        <img src="https://upload.wikimedia.org/wikipedia/commons/1/10/Whirlpool_Corporation_Logo.png" alt="AdminLTE Logo" class="brand-image" style="opacity: .8; margin-right: 20px;">
        <span class="brand-text font-weight-light">DigitalDashboard <strong>1.0</strong></span>
      </router-link>
      <div class="collapse navbar-collapse order-3" id="navbarCollapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active">
              Kanban
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/chart-board" class="nav-link" active-class="active">
              ChartBoard
            </router-link>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">Contact</a>
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
