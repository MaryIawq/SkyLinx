<script setup>
import WeatherComponent from "@/components/weather-component.vue";
import YourCityComponent from "@/components/your-city-component.vue";
import {ref} from 'vue'
import axios from "axios";
const cities = ref([]);
const showYourCityIs = ref(true)
const currentCityWeather = ref({});
const currentCityName = ref('');
let lon = '';
let lat = '';
const changeCity = () => {
  showYourCityIs.value = !showYourCityIs.value
}

const getCity = async () => {
  const openWeatherMapApiKey = '4a59bb9c751eb9fd471b05c9e12beb2f';
  const URL = 'https://api.openweathermap.org/data/2.5/weather?';
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    const params = 'appid=' + openWeatherMapApiKey + '&lon=' + lon + '&lat=' + lat + '&units=metric';
    const resp = await axios.get(URL + params);
    currentCityName.value = resp.data.name
  } catch (error) {
    console.error("Error getting location:", error);
  }
};
getCity()
const updateWeather = () => {
  const openWeatherMapApiKey = '4a59bb9c751eb9fd471b05c9e12beb2f';
  const URL = 'https://api.openweathermap.org/data/2.5/weather?lat=';
  const params = lat + '&lon=' + lon + '&appid=' + openWeatherMapApiKey + '&units=metric';

  axios.get(URL + params)
    .then(response => {
      currentCityWeather.value = response.data;
    })
    .catch(error => {
      console.error('Error fetching city weather:', error);
    });
}
const updateSelectedCity = async (selectedCity) => {
  console.log('Selected city in parent:', selectedCity);
  const gisKey = 'd180a023-0e2a-428e-81c9-ae301128f8bb';
  const cityName = selectedCity;
  const url = 'https://catalog.api.2gis.com/3.0/items/geocode?';
  try{
    const params = 'q=' + cityName + '&fields=items.point&key=' + gisKey;
    const resp = await axios.get(url + params)
    console.log(resp.data)
    lat = resp.data.result.items[1].point.lat
    lon = resp.data.result.items[1].point.lon
    currentCityName.value = resp.data.result.items[0].name;
    console.log(currentCityName.value);
    updateWeather();
  }catch(e){
    console.log('err')
  }
}
const fetchCities = async () => {
  try {
    const resp = await axios.get('https://79c87d4049765d9c.mokky.dev/cities');
    cities.value = resp.data;
  } catch (error) {
    console.error("Error getting cities");
  }
};
fetchCities()
document.addEventListener('mousemove', e => {
  Object.assign(document.documentElement, {
    style: `
    --move-x: ${(e.clientX - window.innerWidth / 2) * -.005}deg;
    --move-y: ${(e.clientY - window.innerHeight / 2) * -.01}deg;
    `
  })
})
</script>

<template>
  <div class="container">
    <div class="main__parallax bg-black">
      <section class="layers">
        <div class="layers__container">
          <div class="layers__item layer-0" style="background-image: url(/src/assets/layers/layer0.png)"></div>
          <div class="layers__item layer-1 ">
            <div class="hero__content ">
              <img alt="logo" class="logo" src="/logo.png">
              <h1 class="">SkyLinx</h1>
              <h2 class="">always with you</h2>
            </div>
          </div>
          <div class="layers__item layer-2" style="background-image: url(/src/assets/layers/sakuraL2.png)">
          </div>
          <div class="layers__item layer-3" style="background-image: url(/src/assets/layers/layer3.png)">
          </div>
          <div class="layers__item layer-4" style="background-image: url(/src/assets/layers/layer4.png)">
          </div>
          <div class="layers__item layer-5" style="background-image: url(/src/assets/layers/greenTreeL5.png)">

          </div>
          <div class="layers__item layer-6">
          </div>
          <div class="layers__item layer-7" style="background-image: url(/src/assets/layers/layer7.png)">
          </div>
          <div class="layers__item layer-8">
          </div>
        </div>
      </section>
    </div>
    <div class="weather__container">
      <weather-component :currentCityWeather="currentCityWeather" :currentCityName="currentCityName"
                         @change-city="changeCity"></weather-component>
    </div>
    <div class="city" v-if="showYourCityIs">
      <your-city-component
        @selectCity="updateSelectedCity"
        :cities="cities"
        :currentCityName="currentCityName"
        :showYourCityIs="false"
        @change-city="changeCity"
        @update-weather="updateWeather"
      ></your-city-component>
    </div>
    <div class="github">
      <p>made by <a href="https://github.com/MaryIawq">MaryIawq</a></p>
    </div>
    <div class="bg__city" v-if="showYourCityIs"></div>
  </div>
</template>

<style scoped>
.weather__container {
  position: absolute;
  top: 25%;
  left: 40%;
  transform: translateX(-50%);
}

.hero__content {
  position: absolute;
  text-align: center;
  display: flex;
  flex-direction: column;
  left: 65%;
  top: 25%;
  transform: translate(-50%, -50%);
}

* {
  color: white
}

@media screen and (max-width: 1440px) {
  .weather__container {
    left: 30%
  }
}

@media screen and (max-width: 1024px) {
  .weather__container {
    left: 50%;
    top: 43%;
  }

  .hero__content {
    left: 50%;
    top: 15%;
  }
}

@media screen and (max-width: 425px) {
}

.bg__city {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(27, 38, 38, 0.85);
}

.city {
  position: absolute;
  left: 50%;
  top: 50%;
  padding: 10px;
  transform: translate(-50%, -50%);
  background-color: rgba(169, 160, 160, 0.44);
  border: #FFFFFF 2px solid;
  border-radius: 35px;
  z-index: 10
}

a,
p,
button {
  color: #FFFFFF;
  text-decoration: none;
  font-family: 'Jua', sans-serif;
  font-weight: 400;
  font-size: 20px;
}

.github {
  position: absolute;
  left: 5%;
  top: 98%;
  transform: translate(-50%, -50%);
}

@media screen and (max-width: 1550px) {
  .github {
    left: 7%
  }
}

@media screen and (max-width: 1135px) {
  .github {
    left: 11%
  }
}

@media screen and (max-width: 768px) {
  .github {
    left: 18%;
  }
}

h1 {
  font-family: 'Jomhuria', serif;
  color: #FFF;
  text-shadow: 3px 2px 31px #4A5A96;
  font-size: 150px;
  font-weight: 400;
  line-height: normal;
}

h2 {
  font-family: 'Josefin Sans', sans-serif;
  color: #FFF;
  text-shadow: 3px 2px 31px #4A5A96;
  font-size: 36px;
  font-weight: 400;
  line-height: normal;
}

.layers__item {
  position: absolute;
  top: -4vw;
  bottom: -4vw;
  right: -5vw;
  left: -5vw;
  background-size: cover;
  background-position: center;
}

.layers {
  perspective: 1500px;
  overflow: hidden;
}

.layers__container {
  height: 100vh;
  transform-style: preserve-3d;
  transform: rotateX(var(--move-y)) rotateY(var(--move-x));
}

.layer-0 {
  transform: translateZ(-100px) scale(1)
}

.layer-1 {
  transform: translateZ(50px) scale(.8)
}

.layer-2 {
  transform: translateZ(100px) scale(.86)
}

.layer-3 {
  transform: translateZ(200px) scale(.9)
}

.layer-4 {
  transform: translateZ(300px) scale(.79)
}

.layer-5 {
  transform: translateZ(400px) scale(.7)
}

.layer-6 {
  transform: translateZ(500px) scale(.9)
}

.layer-7 {
  transform: translateZ(600px) scale(.7)
}

.layer-8 {
  transform: translateZ(100px) scale(1)
}
</style>
