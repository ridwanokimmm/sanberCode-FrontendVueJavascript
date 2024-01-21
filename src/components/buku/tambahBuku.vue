<template>
  <div class="box">

    <div class="field">
      <label class="label">Judul Buku</label>
      <div class="control">
        <input class="input" type="text" placeholder="Masukan judul buku" v-model="title" />
      </div>
    </div>

    <div class="field">
      <label class="label">Deskripsi Buku</label>
      <div class="control">
        <textarea v-model="description" class="textarea" placeholder="Masukkan deskripsi buku" required></textarea>
      </div>
    </div>

    <div class="field">
      <label class="label">Photo Sampul Buku</label>
      <div class="file is-boxed is-fullwidth">
        <label class="file-label">
          <input class="file-input" type="file" @change="handleFileChange" required>
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label" style="text-align: center;">
              Unggah Sampul Buku…
            </span>
          </span>
        </label>
      </div>
    </div>

    <div class="field">
      <label class="label">Tahun Terbit</label>
      <div class="control">
        <div class="select is-fullwidth">
          <select v-model="release_year" required>
            <option value="#">Pilih tahun terbit</option>
            <option v-for="tahun in ambilTahunValid()" :key="tahun" :value="tahun">{{ tahun }}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Harga</label>
      <div class="control">
        <input class="input" type="number" min="10000" placeholder="10000" v-model="price" />
      </div>
    </div>

    <div class="field">
      <label class="label">Banyak Halaman</label>
      <div class="control">
        <input class="input" type="number" min="0" placeholder="0" v-model="total_page" />
      </div>
    </div>

    <div class="field">
      <label class="label">Kategori Buku</label>
      <div class="control">
        <div class="select is-fullwidth">
          <select id="categories" v-model="category_id">
            <option v-for="item in items" :key="item.id" :value="item.id">
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="control">
      <button class="button is-success" @click="simpanBuku">Tambahkan Buku</button>
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
      selectedFile: null,
      uploadedFile: null,
      title: "",
      description: "",
      image_url: "",
      release_year: "",
      price: "",
      total_page: "",
      category_id: "",
    };
  },
  created() {
    this.ambilKategori();
  },
  methods: {
    async ambilKategori() {
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
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    fetchFileInformation() {
      const url = 'http://localhost:8080/fileInfo';

      // Gantilah 'token' dengan nilai token yang benar
      const token = localStorage.getItem('token');

      // Objek konfigurasi untuk headers
      const requestOptions = {
        headers: {
          Authorization: token, // Gunakan Bearer jika menggunakan token JWT
        },
      };

      fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
          this.uploadedFile = data;
        })
        .catch(error => {
          console.error('Error fetching file information:', error);
        });
    },

    ambilTahunValid() {
      const tahunKini = new Date().getFullYear();
      const mulaiTahun = (tahunKini - 3) - 41; // Range Tahun Yang Sebagai Validasi Frontend
      const opsiTahun = [];

      for (let year = tahunKini - 3; year >= mulaiTahun; year--) {
        opsiTahun.push(year.toString());
      }

      return opsiTahun;
    },

    async simpanBuku() {

      const token = localStorage.getItem('token');
      this.token = token;
      if (!this.selectedFile) {
        alert('Pilih file yang ingin diunggah.');
        return;
      }

      const formData = new FormData();
      formData.append('file', this.selectedFile);

      // Menunggu fetch selesai
      const response = await fetch('http://localhost:8080/upload', {
        method: 'POST',
        headers: {
            Authorization: token
          },
        body: formData
      });

      const data = await response.text();
      console.log(data);

      // Tetapkan nilai dari data ke dalam variabel image_url
      this.image_url = "http://localhost:8080/" + data;

      try {
        await axios.post("http://localhost:8080/books", {
          title: this.title,
          description: this.description,
          image_url: this.image_url,
          release_year: this.release_year,
          price: this.price,
          total_page: this.total_page,
          category_id: this.category_id,

        }, {
          headers: {
            Authorization: token
          }
        });
        this.title = "";
        this.description = "";
        this.image_url = "";
        this.release_year = "";
        this.price = "";
        this.total_page = "";
        this.category_id = "";
        this.$router.push("/listBuku");
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.fetchFileInformation();
  }
};
</script>

<style></style>
