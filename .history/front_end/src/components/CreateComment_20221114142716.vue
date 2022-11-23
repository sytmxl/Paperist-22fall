<template>
    <div class="comment">
        <j-comment
          :key-map="keyMap"
          :String="0"
          :showNumber="0"
          :comment-datas="comments"
          @submitComment="submitComment">
        </j-comment>
    </div>
</template>

<script>
import VEmojiPicker from 'v-emoji-picker';
export default {
     name: 'Demo',
  components: {
    VEmojiPicker
  },
  data: () => ({
    return:{
        keyMap: {
        pid: "parent_comment_id",
        id: "id",
        isAdmin: "admin_comment"
      }
    }
  }),
  methods: {
    selectEmoji(emoji) {
      console.log(emoji)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>