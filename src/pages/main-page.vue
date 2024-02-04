<script setup>
import WeatherComponent from "@/components/weather-component.vue";
import YourCityComponent from "@/components/your-city-component.vue";
import { ref } from 'vue'
import axios from "axios";

const showYourCityIs = ref(true)
const currentCityWeather = ref({});
const currentCityName = ref('');
let lon = '';
let lat = '';
const changeCity = () => {
  showYourCityIs.value = !showYourCityIs.value
}

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
    console.log(resp.data);
  } catch (error) {
    console.error("Error getting location:", error);
  }
};
getCity()


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
  <div class="bg-black text-white" >
    <section class="layers">
      <div class="layers__container">
        <div class="layers__item layer-0" style="background-image: url(/src/assets/cover/layer0.png)"></div>
        <div class="layers__item layer-1 ">
          <div class="hero__content">
            <img alt="logo" class="logo" src="/src/assets/cover/logo.png">
            <h1 class="">SkyLinx</h1>
            <h2 class="">always with you</h2>
          </div>
        </div>
        <div class="layers__item layer-2" style="background-image: url(/src/assets/cover/sakuraL2.png)">
        </div>
        <div class="layers__item layer-3" style="background-image: url(/src/assets/cover/layer3.png)">
        </div>
        <div class="layers__item layer-4" style="background-image: url(/src/assets/cover/layer4.png)">
        </div>
        <div class="layers__item layer-5" style="background-image: url(/src/assets/cover/greenTreeL5.png)">

        </div>
        <div class="layers__item layer-6">
        </div>
        <div class="layers__item layer-7" style="background-image: url(/src/assets/cover/layer7.png)">
        </div>
        <div class="layers__item layer-8">
        </div>
      </div>
    </section>
  </div>
  <div class="weather">
    <weather-component :currentCityWeather="currentCityWeather" :currentCityName="currentCityName" @change-city="changeCity"></weather-component>
  </div>
  <div class="city" v-if="showYourCityIs">

   <your-city-component :currentCityName="currentCityName" :showYourCityIs="false" @change-city="changeCity"                        @update-weather="updateWeather"></your-city-component>
  </div>

  <div class="github">
    <p>made by <a href="https://github.com/MaryIawq">MaryIawq</a></p>
  </div>
  <div class="bg__city" v-if="showYourCityIs"></div>
</template>

<style scoped>

*{
  color: white
}
.logo {
  border-radius: 360px;
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

.hero__content {
  position: absolute;
  text-align: center;
  display: flex;
  flex-direction: column;
  left: 60%;
  top: 25%;
  transform: translate(-50%, -50%);
}

.weather {
  position: absolute;
  left: 34%;
  top: 43%;
  transform: translate(-50%, -50%);
}

@media screen and (max-width: 1980px) {
  .weather {
    left: 29%;
    top: 49%;
  }

  .hero__content {
    left: 60%;
    top: 20%;
  }
}

@media screen and (max-width: 1400px) {
  .weather {
    left: 29%;
    top: 52%;
  }
  .hero__content {
    left: 70%;
    top: 20%;
  }
}

@media screen and (max-width: 900px) {
  .weather {
    left: 50%;
    top: 70%;
    margin-top: 23px;
  }

  .hero__content {
    left: 50%;
    top: 13%;
  }
}

@media screen and (max-width: 800px) {
  .weather {
    left: 50%;
    top: 70%;
  }
}

@media screen and (max-width: 500px) {
  .weather {
    left: 50%;
    top: 80%;
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


@media screen and (max-width: 768px) {

  h1 {
    font-size: 100px;
  }

  h2 {
    font-size: 24px;
  }
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
