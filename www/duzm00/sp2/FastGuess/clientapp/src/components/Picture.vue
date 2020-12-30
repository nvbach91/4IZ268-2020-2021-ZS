<template>
  <div class="picture">
    <h2>{{ picture.question }}</h2>
    <img :src="picture.base64" />
    <div class="answers-containter">
      <Answer
        v-for="answer in picture.answers"
        v-bind:key="answer.answerText"
        v-bind:answer="answer"
        v-on:answer-selected="$emit('answer-selected', answer.answerText)"
      />
    </div>
  </div>
</template>

<script>
import Answer from "@/components/Answer";
export default {
  props: {
    picture: {
      type: Object,
      required: true,
    },
  },
  components: {
    Answer,
  },
};
</script>


<style>
.picture {
  display: flex;
  flex-direction: column;
}
.picture h2 {
  margin: 1rem;
  text-align: center;
}
.answers-containter {
  width: 100%;
  display: inline-flex;
  justify-content: space-around;
  flex-wrap: nowrap;
  margin: 2rem 0;
}
img {
  max-width: 40rem;
}
</style>
