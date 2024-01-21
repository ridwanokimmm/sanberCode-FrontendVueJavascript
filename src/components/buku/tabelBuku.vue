<template>
  <div class="box">
    <article class="message is-info">
      <div class="message-body">
        <strong>Halaman Data Buku</strong>, <br>
        Pada halaman ini pengguna dapat melihat, mengubah, serta menghapus data buku. <br>
        Selai itu pengguna juga dapat melakukan filter data buku.
      </div>
    </article>
    <router-link :to="{ name: 'tambahBuku' }" class="button is-success mt-5">Tambah Buku</router-link>
    <hr>
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <label class="label">Judul Buku</label>
          <div class="control">
            <input v-model="filter.title" class="input" type="text" placeholder="Cari Judul">
          </div>
        </div>

        <div class="field">
          <label class="label">Tahun Terbit</label>
          <div class="control">
            <input v-model="filter.minYear" class="input" type="number" placeholder="Min">
            <input v-model="filter.maxYear" class="input" type="number" placeholder="Max">
          </div>
        </div>

        <div class="field">
          <label class="label">Banyak Halaman</label>
          <div class="control">
            <input v-model="filter.minPage" class="input" type="number" placeholder="Min">
            <input v-model="filter.maxPage" class="input" type="number" placeholder="Max">
          </div>
        </div>

        <div class="field">
          <label class="label">Urutkan Judul</label>
          <div class="control">
            <div class="select">
              <select v-model="filter.sortByTitle">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label">&nbsp;</label>
          <div class="control">
            <button @click="applyFilters" class="button is-info">Terapkan Filter</button>
          </div>
        </div>
      </div>
    </div>
    <table class="table is-striped is-bordered mt-2 is-fullwidth">
      <thead>
        <tr>
          <th class="has-text-centered">Judul Buku</th>
          <th class="has-text-centered">Deskripsi</th>
          <th class="has-text-centered">Sampul Buku</th>
          <th class="has-text-centered">Tahun Terbit</th>
          <th class="has-text-centered">Harga</th>
          <th class="has-text-centered">Banyak Halaman</th>
          <th class="has-text-centered">Kategori Buku</th>
          <th class="has-text-centered">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.description }}</td>
          <td>
            <figure class="image is-4by5">
              <img :src="item.image_url">
            </figure>

          </td>
          <td align="center">{{ item.release_year }}</td>
          <td align="center">{{ item.price }}</td>
          <td align="center">{{ item.total_page }} <br> ( {{ item.thickness }} )</td>
          <td align="center">{{ getNamaKategori(item.category_id) }}</td>
          <td>
            <p class="buttons">
              <router-link :to="{ name: 'ubahBuku', params: { id: item.id } }">
                <button class="button is-warning">
                  <span class="icon is-small">
                    <i class="fas fa-pen"></i>
                  </span>
                  <span>Edit</span>
                </button>
              </router-link>
              <button class="button is-danger" @click="hapusBuku(item.id)">
                <span>Delete</span>
                <span class="icon is-small">
                  <i class="fas fa-times"></i>
                </span>
              </button>
            </p>
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
  name: "listBuku",
  data() {
    return {
      items: [],
      categories: [],
      filter: {
        title: "",
        minYear: null,
        maxYear: null,
        minPage: null,
        maxPage: null,
        sortByTitle: "asc",
      },
    };
  },

  created() {
    this.ambilBuku();
    this.ambilKategori();
  },

  methods: {
    async ambilKategori() {
      try {
        const response = await axios.get("http://localhost:8080/categories");
        this.categories = response.data;
      } catch (err) {
        console.log(err);
      }
    },

    getNamaKategori(categoryId) {
      const kategori = this.categories.find(cat => cat.id === categoryId);
      return kategori ? kategori.name : "Tidak Diketahui";
    },

    // Mengambil data buku dan set fillter bila ada
    async ambilBuku() {
      try {
        const response = await axios.get("http://localhost:8080/books", { params: this.filter });
        this.items = response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async applyFilters() {
      this.ambilBuku();
    },

    // Menghapus Buku
    async hapusBuku(id) {
      try {
        await axios.delete(`http://localhost:8080/books/${id}`);
        this.ambilBuku();
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
   
<style></style>