<template>
  <div id="main-page">
    <Header/>
    <Employees/>
    <Editor/>
  </div>
</template>

<script>
import Employees from './Employees.vue'
import Editor from './Editor.vue'
import Header from './Header.vue'

export default {
  name: 'App',
  components: {
    Header,
    Employees,
    Editor
  }
}
</script>

<style lang="scss">
@import '../../node_modules/bootstrap/scss/bootstrap.scss';
body {
  background: #ececec;
}
#main-page {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #b60000;
  max-width: 720px;
  margin: 24px auto;
  background: #fff;
  padding: 0 20px;
}
</style>
