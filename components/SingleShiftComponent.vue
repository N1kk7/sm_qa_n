<script setup>
import { ref } from 'vue';
import SingleTweetComponent from '@/components/SingleTweetComponent.vue';

const props = defineProps({
    shiftDate: {
        type: Object
    },
    shiftAnswers: {
        type: Object
    }
})

const toggle = ref(true);
</script>

<template>
    <div v-if="props.shiftAnswers?.length" class="one-shift">
      <b>{{ props.shiftDate.shiftDate }}</b>
      <p>{{ props.shiftDate.shiftTime }}</p>

      <button class="shift-toggler" @click="toggle = !toggle" :class="{ active: toggle }">
        <svg class="icon">
          <use xlink:href="#icon-angle-down"></use>
        </svg>
      </button>

      <div class="answers-wrapper" :class="{ active: toggle }">
        <div class="tweet-wrapper">
          <SingleTweetComponent
            v-for="(tweet, index) in props.shiftAnswers"
            :key="index"
            :tweet="tweet"
            :index="index"
          />
        </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
.one-shift {
  padding: 20px 20px 5px;
  background-color: #334140;
  position: relative;
  margin-bottom: 15px;
}

.tweet-wrapper {
  position: relative;
  margin-bottom: 15px;
}

.shift-toggler {
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 0;
  background-color: #4e5d5e;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.shift-toggler.active {
  transform: rotate(180deg);
}

.shift-toggler svg {
  font-size: 30px;
  width: 30px;
  height: 30px;
  fill: #fff;
}

.answers-wrapper {
  display: none;
}

.answers-wrapper.active {
  display: block;
}
</style>