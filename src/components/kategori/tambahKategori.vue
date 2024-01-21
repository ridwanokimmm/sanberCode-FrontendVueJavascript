<template>
  <div class="box">
    <div class="field">
      <label class="label">Category Buku</label>
      <div class="control">
        <input class="input" type="text" placeholder="Category Buku" v-model="name" />
      </div>
    </div>

    <div class="control">
      <button class="button is-success" @click="tambahKategori">Tambahkan Kategori</button>
    </div>
  </div>
</template>
   
<script>
// import axios
import axios from "axios";

export default {
  name: "tambahKategori",
  data() {
    return {
      name: ""
    };
  },
  methods: {
    // Menambahkan Data Kategori
    async tambahKategori() {
      try {
        await axios.post("http://localhost:8080/categories", {
          name: this.name,
        });
        this.name = "";
        this.productPrice = "";
        this.$router.push("/listKategori");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
   
<style></style>