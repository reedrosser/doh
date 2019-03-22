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

<style>
.btn {
  background-color: #00a56b;
  color: white;
  padding: 10px;
  border-radius: 5px;
}

.btn:hover {
  cursor: pointer;
}
</style>


