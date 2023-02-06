<template>
  <div class="check-button" :class="{ check: isChecked }">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "checkButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.check-button {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #51d9fb;
}

.check {
  background-color: #51d9fb;
}
</style>