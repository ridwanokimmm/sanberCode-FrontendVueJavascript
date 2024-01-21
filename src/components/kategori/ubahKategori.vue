<template>
    <div class="box">
      <div class="field">
        <label class="label">Kategori Buku</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Product Name"
            v-model="name"
          />
        </div>
      </div>
   
      <div class="control">
        <button class="button is-success" @click="ubahKategori">UPDATE</button>
      </div>
    </div>
  </template>
   
  <script>
  // import axios
  import axios from "axios";
   
  export default {
    name: "ubahKategori",
    data() {
      return {
        name: ""
      };
    },
    created: function () {
      this.mengambilKategoriID();
    },
    methods: {
      // Mengambil Data Kategori By Id
      async mengambilKategoriID() {
        try {
          const response = await axios.get(
            `http://localhost:8080/categories/${this.$route.params.id}`
          );
          this.name = response.data.name;
        } catch (err) {
          console.log(err);
        }
      },
   
      // Mentimpan perubahan Kategori
      async ubahKategori() {
        try {
          await axios.patch(
            `http://localhost:8080/categories/${this.$route.params.id}`,
            {
              name: this.name
            }
          );
          this.productName = "";
          this.$router.push("/listKategori");
        } catch (err) {
          console.log(err);
        }
      },
    },
  };
  </script>
   
  <style>
  </style>