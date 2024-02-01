<script setup>
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
  <div class="bg-black text-white">
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
        <div class="layers__item layer-2">
        </div>
        <div class="layers__item layer-3" style="background-image: url(/src/assets/cover/layer3.png)">
        </div>
        <div class="layers__item layer-4" style="background-image: url(/src/assets/cover/layer4.png)">
        </div>
        <div class="layers__item layer-5" style="background-image: url(/src/assets/cover/layer6.png)">

        </div>
        <div class="layers__item layer-6" >
          /*rain*/
        </div>
        <div class="layers__item layer-7" style="background-image: url(/src/assets/cover/layer7.png)">
        </div>
      </div>
      <router-link to="/main">
        <button>start</button>
      </router-link>
    </section>

  </div>

</template>

<style scoped>
:root {
  --index: calc(1vw + 1vh);
}

.logo {
  width: var(--index);
  height: var(--index);
}

.hero__content {
  width: calc(var(--index) * 7.8);
  height: calc(var(--index) * 7.8);
  position: absolute;
  text-align: center;
  left: 50%;
  top: 10%;
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
  .hero__content {
    width: calc(var(--index) * 7.8);
    height: calc(var(--index) * 7.8);
    position: absolute;
    text-align: center;
    left: 50%;
    top: 20%;
    transform: translate(-50%, -50%);
  }
  h1 {
    font-size: 100px;
  }
  h2 {
    font-size: 24px;
  }
}
button {
  background: rgba(165, 190, 214, 0.65);
  box-shadow: 1px 4px 34px 8px rgba(0, 0, 0, 0.25);
  position: absolute;
  padding-left: 40px;
  padding-right: 40px;
  top: 67%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #FFF;
  text-shadow: 1px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: 'Jomhuria', serif;
  font-size: 100px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border-radius: 80px;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

button:hover {
  cursor: pointer;
  background-color: #c98e00;
  color: #ffffff;
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
  transform: translateZ(-55px) scale(1)
}

.layer-1 {
  transform: translateZ(80px) scale(.8)
}

.layer-2 {
  transform: translateZ(160px) scale(.7)
}

.layer-3 {
  transform: translateZ(240px) scale(.7)
}

.layer-4 {
  transform: translateZ(320px) scale(.7)
}

.layer-5 {
  transform: translateZ(400px) scale(.9)
}

.layer-6 {
  transform: translateZ(480px) scale(.9)
}

.layer-7 {
  transform: translateZ(560px) scale(.7)
}

</style>
