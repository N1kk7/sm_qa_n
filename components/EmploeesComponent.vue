<script setup>
import { useDataStore } from '@/stores/data'
const store = useDataStore();

import SingleEmployeeComponent from '@/components/SingleEmployeeComponent.vue';

const props = defineProps({
    employees: {
        type: Array
    }
})

const employeesList = props.employees;

const sortedEmployees = employeesList.sort((a, b) => {
  if (a.Name < b.Name) {
      return -1;
  }
  if (a.Name > b.Name) {
      return 1;
  }
  return 0;
});
</script>

<template>
    <div class="employees">
        <ul>
            <SingleEmployeeComponent v-for="(employee, index) in sortedEmployees" :key="index" :employee="employee" :index="index" :highlightedClass="store.currentEmployee.index === index ? true : false" />
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.employees {
  flex-basis: 15%;
  margin-right: 15px;
  flex-shrink: 0;
}

.employees ul {
  list-style: none;
  padding: 0;
}

.employees button {
  width: 100%;
  padding: 10px;
  margin-bottom: 5px;
  color: white;
  background: green;
  border: none;
  border-radius: 3px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}
</style>