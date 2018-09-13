<template>
    <header>
        <img src="../assets/employee-logo.png" class="logo">
    </header>
</template>

<script>
export default{
  name: "Header",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
header {
  .logo {
    display: block;
    margin: 0 auto;
    width: 260px;
    padding: 30px;
  }
}
</style>
