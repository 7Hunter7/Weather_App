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
    <button v-if="city != ''" class="wrapper__button" @click="getWeather">Узнать погоду</button>
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
      return temp ? `Температура: ${temp.toFixed(0)}℃` : ''
    },
    showTempFeelsLike() {
      const feelsLike = this.info.main?.feels_like
      return feelsLike ? `Ощущается как: ${feelsLike.toFixed(0)}℃` : ''
    },
    showTempMin() {
      const tempMin = this.info.main?.temp_min
      return tempMin ? `Минимальная температура: ${tempMin.toFixed(0)}℃` : ''
    },
    showTempMax() {
      const tempMax = this.info.main?.temp_max
      return tempMax ? `Максимальная температура: ${tempMax.toFixed(0)}℃` : ''
    },
    showHumidity() {
      const humidity = this.info.main?.humidity
      return humidity ? `Влажность воздуха: ${humidity.toFixed(0)}%` : ''
    },
    showWindSpeed() {
      const windSpeed = this.info.wind?.speed
      return windSpeed ? `Скорость ветра до: ${windSpeed.toFixed(1)}м/с` : ''
    },
    showWeatherDescription() {
      const description = this.info.weather?.[0]?.description

      if (!description) {
        return ''
      }

      const translations = {
        haze: 'легкий туман',
        'overcast clouds': 'пасмурно',
        'scattered clouds': 'малая облачность',
        'few clouds': 'преимущественно ясно',
        'clear sky': 'ясно',
        rain: 'дождь',
        rainy: 'дождливо',
        showers: 'кратковременные дожди',
        'heavy rain': 'сильный дождь',
        drizzle: 'мелкий дождь',
        windy: 'ветренно',
        breeze: 'бриз',
      }

      const translatedDescription = translations[description] || description // Если нет перевода, оставляем оригинал

      return `Погодные условия: ${translatedDescription}`
    },
  },

  methods: {
    getWeather() {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=394763d2bf7ba78dbbad7d96b024e452`

      if (this.city.trim().length < 2) {
        this.error = 'Название города должно содержать более одного символа!'
        this.info = null // Сбрасываем info при ошибке
        return
      }
      // Очищаем предыдущие данные
      this.error = ''
      this.info = null

      axios
        .get(url)
        .then((response) => {
          this.info = response.data
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 404) {
              this.error = 'Вы ввели неверное название города!'
            } else {
              this.error = `Произошла ошибка: ${error.response.status}`
            }
          } else if (error.request) {
            this.error = 'Ошибка при отправке запроса. Проверьте подключение к интернету.'
          } else {
            this.error = 'Произошла ошибка при получении данных.'
          }
          this.info = null // Сбрасываем info при ошибке
        })
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
    color: #1f0f24;
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
      color: #fff;
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
