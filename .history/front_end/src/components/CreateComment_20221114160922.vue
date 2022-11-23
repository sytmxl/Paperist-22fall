
<template>
  <div class="app-container">
    <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="写评论"
        v-model="textarea"
        maxlength="200"
        show-word-limit>
    </el-input>
      <el-button type="text" size="medium" @click="showDialog = !showDialog">🙂</el-button>
    
    <el-col>
      <VEmojiPicker v-show="showDialog" @select="selectEmoji"/>
    </el-col>
  </div>
</template>



<script>
  import {VEmojiPicker} from 'v-emoji-picker'

  export default {
    components: {
      VEmojiPicker
    },
    data() {
      return {
        text: '',
        showDialog: false,
        textarea:""
      }
    },
    methods: {
      selectEmoji(emoji) {// 选择emoji后调用的函数
        let input = document.getElementById("input")
        let startPos = input.selectionStart
        let endPos = input.selectionEnd
        let resultText = input.value.substring(0, startPos) + emoji.data + input.value.substring(endPos)
        input.value = resultText
        input.focus()
        input.selectionStart = startPos + emoji.data.length
        input.selectionEnd = startPos + emoji.data.length
        this.text = resultText
      }
    }
  }
</script>


<style lang="scss" scoped>

</style>