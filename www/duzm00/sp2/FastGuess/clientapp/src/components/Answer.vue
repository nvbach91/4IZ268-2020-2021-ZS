<template>
  <div>
     <button type="submit" v-on:click="$emit('answer-selected', answer.answerText)">{{answer.answerText}}</button>
  </div>
</template>

<script>
export default {
  props: { answer: { type: Object, required: true } },
};
</script>


<style scoped>
button{
  display: inline-flex;
}
</style>