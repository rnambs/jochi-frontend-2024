<template>
  <aside id="left-panel" class="left-panel">
    <nav
      class="
        navbar navbar-expand-sm navbar-default
        py-4
        h-100
        align-items-start
      "
    >
      <div
        id="main-menu"
        class="main-menu collapse navbar-collapse h-100 align-items-start"
      >
        <ul class="nav navbar-nav">
          <li>
            <nuxt-link to="/dashboard"
              ><i class="fa fa-th-large mr-2 menu-icon" aria-hidden="true"></i>
              <span class="menu-title-text">Dashboard</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/club-list-table"
              ><i class="fa fa-futbol-o mr-2 menu-icon" aria-hidden="true"></i
              ><span class="menu-title-text">Club Details</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/school-list-table"
              ><i class="fas fa-school mr-2 menu-icon"></i
              ><span class="menu-title-text">School Details</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/daily-quotes"
              ><i class="far fa-comment-alt mr-2 menu-icon"></i
              ><span class="menu-title-text">Daily Quotes</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/teacher-signin-request"
              ><i class="fas fa-user mr-2 menu-icon"></i
              ><span class="menu-title-text">Teacher Sign-In Request</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>
<script>
export default {
  name: "Sidebar",
  // middleware: "authenticated",
};
</script>