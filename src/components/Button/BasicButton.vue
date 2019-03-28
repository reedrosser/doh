<template>
  <div class="btn" @click="runCallback">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BasicButton",
  methods: {
    runCallback() {
      this.$emit("callbacked");
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


