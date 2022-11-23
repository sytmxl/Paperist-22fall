<template>
    <div class="comment">
        <j-comment
          :key-map="keyMap"
          :showNumber="1"
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
  data: () => ({}),
  methods: {
    selectEmoji(emoji) {
      console.log(emoji)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>