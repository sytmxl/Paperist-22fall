
<template>
  <div class="app-container">
    <el-input 
    id="input"
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 4}"
        placeholder="写评论"
        v-model="textarea"
        maxlength="200"
        show-word-limit>
    </el-input>
    <div class="btn" style="height:40px;margin-top:30px;">
      <el-button id="emoji" type="text" size="medium" @click="showDialog = !showDialog" style="float:left;width: 40px;">😅</el-button>
      <el-button style="float:right" @click="submit()">发布</el-button>
    </div>
      
    <el-col wid>
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
    props:{
      receiver_id:{default:-1},
      paper_id:{default:""},
      remark_id:{default:-1},
      note_id:{default:""}
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
      },
      submit(){
        this.$axios({
            url:"http://127.0.0.1:8000/uploadComment/",
            method:"post",
            data:{
                receiver_id:this.receiver_id,
                comments:this.textarea,
                paper_id:this.paper_id,
                remark_id:this.remark_id,
                note_id:this.note_id
            }
        }).then(res=>{
            this.$message.success("评论发表成功");
            let msg = "success"
            this.$emit('finish_remark',msg)
        })
      }
    }
  }
</script>


<style lang="scss" scoped>
#emoji {
  background: #003b552f !important;
  border: solid 2px #003b552f;
}
</style>