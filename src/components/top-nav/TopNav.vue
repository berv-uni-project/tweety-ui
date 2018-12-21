<template>
  <nav
    class="navbar is-fixed-top"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <RouterLink
        class="navbar-item"
        to="/"
      >
        <h1 class="title">
          Tweety
        </h1>
      </RouterLink>

      <a
        id="burger"
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="burgerClick"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>
    <div
      id="navbarBasicExample"
      class="navbar-menu"
    >
      <div class="navbar-end">
        <RouterLink
          class="navbar-item"
          to="/"
        >
          Home
        </RouterLink>
        <RouterLink
          class="navbar-item"
          to="/about"
        >
          About
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<script src="./TopNav.js">
</script>
