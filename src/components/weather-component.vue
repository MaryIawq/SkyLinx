<script setup>

import {ref, watch} from "vue";

const emit = defineEmits([
  'changeCity'
])
const props = defineProps([
  'currentCityName',
  'currentCityWeather',
  'weekCityWeather'
])
const showComponent = ref(false);
watch(() => props.currentCityWeather, (newValue) => {
  showComponent.value = Object.keys(newValue).length > 0;
});
const changeCity = () => {
  emit('changeCity');
}
</script>
<template>
  <div class="main" v-if="showComponent">
    <div class="current__weather">
      <div class="top__current__weather">
        <div class="place__info">
          <p>weather today in</p>
          <p @click="changeCity" class="city">
            {{ props.currentCityName }}</p>
          <p>03.02.2024, 15:23</p>
        </div>
        <div class="weather__condition">
          <p>{{ props.currentCityWeather.weather[0].main }}</p>
          <img src="../../public/sunny.png" style="width: 94px; height: 94px;" alt="sunny weather">
        </div>
      </div>
      <div class="mid__current__weather">
        <p style="font-size: 70px;">{{ Math.round(props.currentCityWeather.main.temp) }}°C</p>
        <p style="font-weight: 400; font-size: 30px; text-align: center;">feels like <br>
          {{ Math.round(props.currentCityWeather.main.feels_like) }}°C</p>
      </div>
      <div class="bot__info">

        <div class="info__container">
          <div class="info__component">
            <img style="width: 60px" src="../../public/pressure-icon.png">
            <div class="info__component__text">
              <p>pressure</p>
              <p>{{ props.currentCityWeather.main.pressure }}mmHg</p>
            </div>
          </div>
          <div class="info__component">
            <img style="width: 60px" src="../../public/humidity-icon.png">
            <div class="info__component__text">
              <p>humidity</p>
              <p>{{ props.currentCityWeather.main.humidity }}%</p>
            </div>
          </div>
        </div>

        <div class="info__container">
          <div class="info__component">
            <img style="width: 80px" src="../../public/precipitation.png">
            <div class="info__component__text">
              <p>clouds</p>
              <p>{{ props.currentCityWeather.clouds.all }}</p>
            </div>
          </div>
          <div class="info__component">
            <img style="width: 60px" src="../../public/wind-icon.png">
            <div class="info__component__text">
              <p>wind speed</p>
              <p>{{ Math.round(props.currentCityWeather.wind.speed) }} m/s</p>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>

</template>


<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.current__weather {
  padding: 8px;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.22);
  border-radius: 60px;
  border: #FFFFFF 7px solid;
}

.top__current__weather {
  display: flex;
  justify-content: space-between;
}

.place__info,
.weather__condition {
  display: flex;
  flex-direction: column;
}

.city {
  font-family: 'Jua', sans-serif;
  font-size: 50px;
  text-align: center;
  text-shadow: 0 4px 54px 0 #fff;
  background-color: rgba(255, 255, 255, 0.22);
  border-radius: 35px;
  border: #FFFFFF 2px solid;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 10px;
  cursor: pointer;
  transition: text-shadow 0.6s ease, color 0.6s ease;
}

.city:hover {
  text-shadow: 0 -1px 4px #FFF, 0 -2px 10px rgba(255, 255, 0, 0.46), 0 -10px 20px rgba(255, 128, 0, 0.46), 0 -18px 40px rgba(255, 0, 0, 0.4);
  color: #FFFFFF;
}

p {
  font-family: 'Jua', sans-serif;
  font-weight: 400;
  font-size: 20px;
  text-align: center;
}

.mid__current__weather {
  display: flex;
  justify-content: space-between;
  width: 90%;
  height: 100%;
  align-items: center;
}

.bot__info {
  padding: 10px;
  margin-right: 10px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.13);
  border-radius: 60px;
  border: #FFFFFF 2px solid;
}

.info__container {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.info__component {
  display: flex;
}

</style>
