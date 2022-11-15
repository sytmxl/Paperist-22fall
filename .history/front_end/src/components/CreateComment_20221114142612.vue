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
  data: () => ({}),
  methods: {
    selectEmoji(emoji) {
      console.log(emoji)
    }
  }
}
</script>

<style scoped>

</style>