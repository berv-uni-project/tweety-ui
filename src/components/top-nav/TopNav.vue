<template>
  <b-navbar fixed-top type="is-light">
    <template slot="brand">
      <b-navbar-item tag="router-link" to="/">
        <h1 class="title">Tweety</h1>
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item tag="router-link" to="/">Home</b-navbar-item>
      <b-navbar-item v-if="isAuthenticated" tag="router-link" to="/search">Search</b-navbar-item>
      <b-navbar-item tag="router-link" to="/about">About</b-navbar-item>
      <b-navbar-item v-if="isAuthenticated" tag="div">Welcome {{ profile.name }}</b-navbar-item>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a v-if="!isAuthenticated" class="button is-primary" @click.prevent="login">
            <strong>Log in</strong>
          </a>
          <a v-if="isAuthenticated" class="button is-danger" @click.prevent="logout">Log out</a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script src="./TopNav.js"></script>
