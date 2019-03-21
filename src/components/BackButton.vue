<template>
  <div class="btn" @click="goBack">Back</div>
  <!-- <BasicButton callback="goBack">Back</BasicButton> -->
</template>

<script>
import BasicButton from "../components/BasicButton";
export default {
  name: "BackButton",
  components: {
    BasicButton
  },
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


