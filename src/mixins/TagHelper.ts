import Vue from 'vue'
import Component from 'vue-class-component';
@Component
export class TagHelper extends Vue{
  createTag() {
    const name = window.prompt('请输入标签名');
    if (name) {
      (this as any).$store.commit('createTag', name)
    } else {
      alert('标签名不能为空！')
    }
    const massage = this.$store.state.creatTagError
    if(massage === 'success'){
      alert('创建成功！')
    }
    else if (massage ==='duplicated'){
      alert('标签名重复了！')
    }
  }
}
export default TagHelper