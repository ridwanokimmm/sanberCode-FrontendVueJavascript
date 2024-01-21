<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="dropdown navigation">
      <div class="container">

        <!-- Navbar menu -->
        <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': isNavbarActive }">
          <div class="navbar-start">

            <a class="navbar-item" href="/">
              Home
            </a>

            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                Keola Kategori Buku
              </a>

              <div class="navbar-dropdown">
                <a class="navbar-item" href="/listKategori">
                  Lihat Kategori Buku
                </a>
                <a class="navbar-item" href="/tambahKategori">
                  Tambah Kategori Buku
                </a>
              </div>
            </div>

            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                Keola Buku
              </a>

              <div class="navbar-dropdown">
                <a class="navbar-item" href="/listBuku">
                  Lihat Buku
                </a>
                <a class="navbar-item" href="/tambahBuku">
                  Tambah Buku
                </a>
              </div>
            </div>
          </div>


          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <button  class="button is-info" @click="logout">Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
  <br><br>
  <div id="app" class="container is-max-desktop">
    <router-view />
  </div>
</template>
  
<script>
export default {
  name: "App",
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login'); // Redirect ke halaman login setelah logout
    }
  }
};
</script>
  
<style>
/* import style bulma */
@import "../node_modules/bulma/css/bulma.css";
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
</style>