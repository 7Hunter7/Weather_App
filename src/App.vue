<template>
  <div class="wrapper">
    <div class="wrapper__header">
      <h1>Погодное приложение</h1>
      <p>Узнать погоду в {{ city == '' ? 'вашем городе' : cityName }}</p>
    </div>
    <input
      class="wrapper__input"
      type="text"
      v-model="city"
      placeholder="Введите название города"
    />
    <button v-if="city != ''" class="wrapper__button" @click="getWeather()">Узнать погоду</button>
    <button disabled v-else class="wrapper__button">Введите город</button>
    <p class="wrapper__error">{{ error }}</p>

    <div v-if="info != null" class="wrapper__info">
      <p>{{ showTemp }}</p>
      <p>{{ showTempFeelsLike }}</p>
      <p>{{ showTempMin }}</p>
      <p>{{ showTempMax }}</p>
      <p>{{ showHumidity }}</p>
      <p>{{ showWindSpeed }}</p>
      <p>{{ showWeatherDescription }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      city: '',
      error: '',
      info: null,
    }
  },
  computed: {
    cityName() {
      return '«' + this.city + '»'
    },
    showTemp() {
      const temp = this.info.main?.temp
      return `Температура: ${temp.toFixed()}℃`
    },
    showTempFeelsLike() {
      const feelsLike = this.info.main?.feels_like
      return `Ощущается как: ${feelsLike.toFixed()}℃`
    },
    showTempMin() {
      const tempMin = this.info.main?.temp_min
      return `Минимальная температура: ${tempMin.toFixed()}℃`
    },
    showTempMax() {
      const tempMax = this.info.main?.temp_max
      return `Максимальная температура: ${tempMax.toFixed()}℃`
    },
    showHumidity() {
      const humidity = this.info.main?.humidity
      return `Влажность воздуха: ${humidity.toFixed()}%`
    },
    showWindSpeed() {
      const windSpeed = this.info.wind?.speed
      return `Скорость ветра до: ${windSpeed.toFixed(1)}м/с`
    },
    showWeatherDescription() {
      const description = this.info.weather[0]?.description
      return `Облачность: ${description}`
    },
  },
  methods: {
    getWeather() {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=394763d2bf7ba78dbbad7d96b024e452`

      if (this.city.trim().length < 2) {
        this.error = 'Название города должно содержать более одного символа!'
        return
      }
      this.error = ''

      axios.get(url).then((res) => (this.info = res.data))
    },
  },
}
</script>

<style scoped lang="scss">
.wrapper {
  width: 900px;
  height: 500px;
  border-radius: 50px;
  padding: 20px;
  background-color: #1f0f24;
  text-align: center;
  color: rgb(40, 200, 150);

  &__header {
    & h1 {
      margin-top: 50px;
    }
    & p {
      margin-top: 20px;
    }
  }

  &__input {
    margin-top: 30px;
    padding: 5px 10px;
    border: none;
    outline: none; // Удаляем обводку у input
    border-bottom: 2px solid #110813;
    background: transparent;
    color: #fcfcfc;
    font-size: 14px;

    &:focus {
      border-bottom-color: #6e2d7d;
    }
  }

  &__button {
    cursor: pointer;
    margin-left: 20px;
    padding: 8px 16px;
    color: #fff;
    background-color: #e3bc4b;
    border: 2px solid #b99935;
    border-radius: 8px;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }
    &:active {
      transform: translateY(-2px) scale(0.97);
    }
    &:disabled {
      cursor: no-drop;
      background-color: #9c7216;
    }
  }
  &__error {
    margin-top: 20px;
    color: #d03939;
  }
  &__info {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
