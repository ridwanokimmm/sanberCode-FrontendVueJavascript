<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-four-fifths">
          <div class="box">
            <h1 class="title has-text-centered">Halaman Login</h1>

            <div class="notification is-danger is-light" v-if="error">
              {{ error }}.
            </div>

            <form @submit.prevent="login">
              <div class="field">
                <label class="label">Username</label>
                <div class="control">
                  <input v-model="username" class="input" type="text" placeholder="Masukan Username" required />
                </div>
              </div>

              <div class="field">
                <label class="label">Password</label>
                <div class="control">
                  <input v-model="password" class="input" type="password" placeholder="Masukan Password" required />
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <button class="button is-info is-hovered is-responsive" type="submit">
                    Login
                  </button>
                </div>
              </div>
            </form>
            <hr>
            <div class="card">
            <footer class="card-footer">
              <a href="/login" class="card-footer-item">Halaman Login</a>
              <a href="/register" class="card-footer-item">Halaman Registrasi</a>
            </footer>
          </div>
          </div>
          
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: null
    };
  },
  methods: {
    login() {
      axios.post('http://localhost:8080/login', {
        username: this.username,
        password: this.password
      })
        .then(response => {
          console.log('Login berhasil');
          console.log(response.data);

          // Simpan token ke localStorage
          localStorage.setItem('token', response.data.token);

          // Arahkan ke halaman beranda setelah login
          this.$router.push('/home');
        })
        .catch(error => {
          console.error('Login gagal');
          console.error(error.response.data);

          // Set error message untuk ditampilkan
          this.error = error.response.data || 'Terjadi kesalahan saat login';
        });
    }
  }
};
</script>