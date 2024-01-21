<template>
  <div class="box">
    <article class="message is-info">
      <div class="message-body">
        <strong>Halaman Data Kategori Buku</strong>, <br>
        Pada halaman ini pengguna dapat melihat, mengubah, serta menghapus data kategori buku. <br>
        Selai itu pengguna juga dapat melakukan filter data kategori.
      </div>
    </article>
    <router-link :to="{ name: 'tambahKategori' }" class="button is-success mt-5">Tambah Kategori</router-link>
    <hr>
    <table class="table is-striped is-bordered mt-2 is-fullwidth">
      <thead>
        <tr>
          <th class="has-text-centered">Kategori Buku</th>
          <th class="has-text-centered">Daftar Buku</th>
          <th class="has-text-centered">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td class="has-text-centered">{{ item.name }}</td>
          <td class="has-text-centered">
            <router-link :to="{ name: 'daftarBuku', params: { category_id: item.id } }">
              <button class="button is-info">
                <span class="icon is-small">
                  <i class="fas fa-eye"></i>
                </span>
                <span>Lihat List Buku</span>
              </button>
            </router-link>
          </td>
          <td class="column has-text-centered" colspan="2">

            <router-link :to="{ name: 'ubahKategori', params: { id: item.id } }">
              <button class="button is-warning">
                <span class="icon is-small">
                  <i class="fas fa-pen"></i>
                </span>
                <span>Edit</span>
              </button>
            </router-link>
            <button style="margin-left: 2ch;" class="button is-danger" @click="hapusKategori(item.id)">
              <span>Delete</span>
              <span class="icon is-small">
                <i class="fas fa-times"></i>
              </span>
            </button>

          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
   
<script>
// import axios
import axios from "axios";

export default {
  name: "listKategori",
  data() {
    return {
      items: [],
    };
  },

  created() {
    this.ambilKategori();
  },

  methods: {
    // Mengambil Kategori Backend
    async ambilKategori() {
      console.log(localStorage.getItem('token'))
      const token = localStorage.getItem('token');
      this.token = token;
      try {
        const response = await axios.get("http://localhost:8080/categories", {
          headers: {
            Authorization: token
          }
        });
        this.items = response.data;
      } catch (err) {
        console.log(err);
      }
    },

    // Menghapus Kategori Backend
    async hapusKategori(id) {
      try {
        const token = localStorage.getItem('token');
        this.token = token;
        await axios.delete(`http://localhost:8080/categories/${id}`, {
          headers: {
            Authorization: token
          }
        });
        this.ambilKategori();
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
   
<style></style>
