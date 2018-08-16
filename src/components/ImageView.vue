<template lang="pug">
    div
        h3 Unsplash Viewer
        div(v-if='display')
            dl
                div(v-if='photo.location')
                    dt  Location:
                    dd {{photo.location.title}}
                div(v-if='photo.description')
                    dt  Description:
                    dd {{photo.description}}
                dt Photographer:
                dd
                    img.profile-image(fluid, :src='photo.user.profile_image.small')
                    span {{photo.user.name}}
                dd(v-if='photo.user.portfolio_url') Portfolio URL:
                dd(v-if='photo.user.portfolio_url')
                    a(:href='photo.user.portfolio_url') {{photo.user.portfolio_url}}
                dt Views:
                dd {{photo.views}}
                dt Likes:
                dd {{photo.likes}}

</template>

<script>
  import Unsplash, {toJson} from 'unsplash-js'

  export default {
    name: 'ImageView',
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.getData()
      })
    },
    data: function () {
      return {
        photo: {},
        display: false,
        photoIndex: 0
      }
    },
    props: {
      image_id: {
        type: String,
        required: true
      },
      index: {
        type: String,
        required: true
      }
    },
    methods: {
      getData () {
        let unsplash = new Unsplash({
          applicationId: process.env.UNSPLASH_APPLICATION_ID,
          secret: process.env.UNSPLASH_SECRET,
          callbackUrl: ''
        })

        unsplash.photos.getPhoto(this.image_id, 1000)
          .then(toJson)
          .then(json => {
            this.photo = json
            this.display = true
          })
      }
    }
  }
</script>
<style scoped>
    .profile-image {
        margin-right: 10px;
        vertical-align: middle;
    }

    dt {
        float: left;
        font-weight: bold;
    }

    dd {
        margin-left: 0px;
    }

    dl {
        margin-left: 40%;
        width: 300px;
    }

    .arrow {
        -webkit-transition: opacity 0.2s ease-in-out;
        -moz-transition: opacity 0.2s ease-in-out;
        -o-transition: opacity 0.2s ease-in-out;
        -ms-transition: opacity 0.2s ease-in-out;
        transition: opacity 0.2s ease-in-out;
        position: absolute;
        top: 50%;
        font-size: 200px;
        transform: translate(-50%, -50%);
        opacity: 0;
        cursor: pointer;
    }

    .left-arrow {
        left: 19%;
    }

    .right-arrow {
        right: 0;
    }

    .container {
        position: absolute;
        margin-left: 20%;
        width: 1000px;
    }

    .container:hover .arrow {
        opacity: 1;
    }
</style>
