<template>
  <div class="btn" @click="callback">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BasicButton",
  props: ["callback"],
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.btn {
  position: absolute;
  top: -10px;
  left: 5px;
}
</style>


