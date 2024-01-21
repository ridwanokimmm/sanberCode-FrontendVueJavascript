<template>
  <div class="container mt-5">
    <div class="columns is-centered">
      <div class="column is-two-thirds">
        <div class="card large">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-96x96 image is-4by5">
                  <img src="https://dev.socialclimb.id/img/profile.bb6ba97f.jpeg" alt="Developer Avatar">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-3">{{ name }}</p>
                <p class="subtitle is-5">{{ keterangan }}</p>
              </div>
            </div>

            <div class="content">
              <p>{{ bio }}</p>
              <p>Email: erputramadhan@gmail.com | Website: <a :href="website">{{ website }}</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'Ridwan Ramadhan',
      keterangan: 'Website Developer socialclimb.id | Fullstack Developer | Backend Developer | UI/UX Design',
      bio: 'Lulusan S1 Teknik Informatika Universitas Komputer Indonesia dengan pengalaman magang pada PT. Bank BJB dan membangun website socialclimb.id berupa layanan digital yang berfokus pada perkembangan digital marketing yang sudah berjalan selama 5 tahun lebih. Saya adalah tipikal orang yang cepat dalam memahami, hal baru bukan sebuah masalah bagi saya pribadi..',
      email: 'johndoe@example.com',
      website: 'https://dev.socialclimb.id'
    };
  }
};
</script>

<style scoped>
/* Custom styling for the card */
.card.large {
  max-width: 800px;
  margin: auto;
}
</style>