<template>
  <div class="btn" @click="goBack">Back</div>
</template>

<script>
export default {
  name: "BackButton",
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


