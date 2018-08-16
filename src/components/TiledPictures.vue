<template lang="pug">
    div
        h3 Unsplash Viewer
        div.flex-containter.brightness
            router-link(v-for='(photo, index) in $store.state.photos', :to='{name: "ImageView", params: {image_id: photo.id, index: index.toString()}}', :key='photo.id')
                img.item(fluid, :src='photo.urls.thumb')
</template>

<script>
  export default {
    name: 'TiledPictures',
    mounted () {
      this.$store.dispatch('LOAD_PHOTOS')
      window.addEventListener('scroll', () => {
        this.bottom = this.atBottom()
      })
    },
    data () {
      return {
        bottom: false
      }
    },
    methods: {
      atBottom () {
        const visible = document.documentElement.clientHeight
        const pageHeight = document.documentElement.scrollHeight
        const bottomOfPage = visible + window.scrollY >= pageHeight
        if (bottomOfPage || pageHeight < visible) {
          this.$store.dispatch('LOAD_PHOTOS')
        }
      }
    }
  }
</script>
<style scoped>
    .flex-container {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
    }

    .item {
        margin: 10px;
        vertical-align: middle;
    }

    .brightness {
        background-color: white;
        display: inline-block;

    }

    .brightness img:hover {
        -webkit-transition: opacity 0.2s ease-in-out;
        -moz-transition: opacity 0.2s ease-in-out;
        -o-transition: opacity 0.2s ease-in-out;
        -ms-transition: opacity 0.2s ease-in-out;
        transition: opacity 0.2s ease-in-out;
        opacity: .5;
    }
</style>
