<script setup>
import { ref } from 'vue'
import ListOfCities from "@/components/list-of-cities.vue";
import axios from "axios";
const emit = defineEmits([
  'changeCity',
  'updateWeather',
])

const props = defineProps([
  'currentCityName'
])
const changeCity = () => {
  emit('changeCity');
}
const updateWeather = () => {
  emit('updateWeather');
}
const showList = ref(false)
const showListOfCities = () => {
  showList.value = !showList.value
}
</script>

<template>
  <div class="main" v-auto-animate>
    <h2>Is your city {{ props.currentCityName }}?</h2>
    <div class="city__buttons">
      <button @click="changeCity(); updateWeather()">yes</button>
      <button @click="showListOfCities" >no</button>

    </div>
    <list-of-cities v-if="showList"></list-of-cities>
  </div>

</template>

<style scoped>
.main{
  font-family: 'Jua', sans-serif;
  font-size: 20px;
text-align: center;
}
.city__buttons {
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-top: 10px;
  margin-bottom: 18px;
}
button {
  transition: text-shadow 0.3s ease, color 0.3s ease;
  font-size: 28px;
  background-color: rgba(255, 255, 255, 0.13);
  border: #FFFFFF 2px solid;
  padding-left: 7px;
  padding-right: 7px;
  border-radius: 35px
}
button:hover {
  text-shadow: 0 -1px 4px #FFF, 0 -2px 10px rgba(255, 255, 0, 0.62), 0 -10px 20px rgba(255, 128, 0, 0.54), 0 -18px 40px rgba(255, 0, 0, 0.56);
  color: #FFFFFF;
}

</style>
