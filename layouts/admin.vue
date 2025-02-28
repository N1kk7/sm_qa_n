<script setup>
import SharedVButton from '@/components/shared/ButtonComponent.vue';
import FieldsetComponent from '@/components/shared/FieldsetComponent.vue';
import LabelComponent from '@/components/shared/LabelComponent.vue';
import EmployeesComponent from '@/components/EmploeesComponent.vue';
import ScheduleComponent from '@/components/ScheduleComponent.vue';

import { useDataStore } from '@/stores/data'
import { ref } from 'vue';
const store = useDataStore();

const submitted = ref(false);

const setFileUploaded = (e) => {
  store.ExcelToJSON(e, e.target.dataset.name);
  e.target.classList.add('uploaded');
}

const onSubmit = () => {
  if (!store.data?.scheduleObj?.length) {
      alert('Please put file with schedule');
      return;
  };

  if (!store.data?.answersObj?.length) {
      alert('Please put file with twitter answers');
      return;
  }

  submitted.value = true;
}
</script>

<template>
  <div class="wrapper">
    <main class="main">
      <div class="container">
        <div class="main-inner">
          <article>
            admin panel
          </article>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  padding: 15px;
}

.container {
  max-width: 950px;
  margin: 0 auto;
}

.form-wrapper {
  background-color: #334140;
  padding: 15px;
}

.content-wrapper {
  display: flex;
}

form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr auto;
  grid-column-gap: 10px;
}

.uploaded + .icon {
  color: #334140;
}

.btn-block {
  display: flex;
  width: 100%;
  justify-content: center;
  grid-column: 1/3;
}



h1 {
  margin: 0 0 15px;
  font-weight: 400;
  text-align: center;
}


fieldset {
  border: none;
  margin: 0 auto 15px;
  width: 100%;
  padding: 0;
}

fieldset label {
  cursor: pointer;
  border: 1px solid #4d5d5d;
  background-color: #4d5d5d;
  padding: 5px;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 10px;
  font-size: 16px;
}

fieldset span {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

fieldset input[type='file'] {
  display: none;
}

fieldset .icon {
  height: 60px;
  width: 60px;
  fill: none;
}

textarea {
  width: 100%;
}

</style>