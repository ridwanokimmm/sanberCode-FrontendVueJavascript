import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Home from "./components/Home.vue";
import TambahKategori from "./components/kategori/tambahKategori.vue";
import UbahKategori from "./components/kategori/ubahKategori.vue";
import ListKategori from "./components/kategori/tabelKategori.vue";
import DaftarBuku from "./components/kategori/daftarBuku.vue";
import TambahBuku from "./components/buku/tambahBuku.vue";
import UbahBuku from "./components/buku/ubahBuku.vue";
import ListBuku from "./components/buku/tabelBuku.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "tambahKategori",
      path: "/tambahKategori",
      component: TambahKategori,
      meta: { requiresAuth: true }
    },
    {
      name: "ubahKategori",
      path: "/ubahKategori/:id",
      component: UbahKategori,
      meta: { requiresAuth: true }
    },
    {
      name: "listKategori",
      path: "/listKategori",
      component: ListKategori,
      meta: { requiresAuth: true }
    },
    {
      name: "daftarBuku",
      path: "/daftarBuku/:category_id",
      component: DaftarBuku,
      meta: { requiresAuth: true }
    },
    {
      name: "tambahBuku",
      path: "/tambahBuku",
      component: TambahBuku,
      meta: { requiresAuth: true }
    },
    {
      name: "ubahBuku",
      path: "/ubahBuku/:id",
      component: UbahBuku,
      meta: { requiresAuth: true }
    },
    {
      name: "listBuku",
      path: "/listBuku",
      component: ListBuku,
      meta: { requiresAuth: true }
    },
    { path: "/", component: Home, meta: { requiresAuth: true } },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/home", component: Home, meta: { requiresAuth: true } }, // Tambahkan rute beranda
  ],
});

// Periksa otentikasi sebelum navigasi ke rute yang memerlukan otentikasi
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth && !token) {
    // Rute memerlukan otentikasi dan pengguna belum terotentikasi
    next("/login");
  } else {
    console.log(token);
    next(); // Lanjutkan navigasi
  }
});

createApp(App).use(router).mount("#app");
