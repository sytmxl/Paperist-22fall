
<template>
  <div class="app-container">
    <el-col>
      <el-button type="text" size="mini" @click="showDialog = !showDialog">😃</el-button>
    </el-col>
    <el-col :span="12">
      <el-col :span="16">
        <el-input
          id="input"
          v-model="text"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 2}"
          resize="none"
          placeholder="请输入内容">
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-button style="height: 54px;background-color: #fc5531;color: white;border: 1px solid #fc5531">发表评论</el-button>
      </el-col>
    </el-col>
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
        showDialog: false
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