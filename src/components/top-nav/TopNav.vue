<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <h1 class="title">Tweety</h1>
      </router-link>

      <a
        id="burger"
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="burgerClick"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-end">
        <router-link class="navbar-item" to="/">Home</router-link>
        <router-link v-if="isAuthenticated" class="navbar-item" to="/search">Search</router-link>
        <router-link class="navbar-item" to="/about">About</router-link>
        <li v-if="isAuthenticated" class="navbar-item">Welcome {{ profile.name }}</li>
        <div class="navbar-item">
          <div class="buttons">
            <a v-if="!isAuthenticated" class="button is-primary" @click.prevent="login">
              <strong>Log in</strong>
            </a>
            <a v-if="isAuthenticated" class="button is-danger" @click.prevent="logout">
              Log out
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script src="./TopNav.js"></script>
