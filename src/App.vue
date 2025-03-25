<script setup></script>

<template>
  <div class="wrapper">
    <div class="wrapper__header">
      <h1>Погодное приложение</h1>
      <p>Узнать погоду в вашем городе</p>
    </div>
    <input class="wrapper__input" type="text" placeholder="Введите город" />
    <button class="wrapper__button">Узнать погоду</button>
  </div>
</template>

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
    outline: none;
    border-bottom: 2px solid #110813;
    background: transparent;
    color: #fcfcfc;
    font-size: 14px;

    &:focus {
      border-bottom-color: rgb(40, 200, 150);
    }
  }

  &__button {
    cursor: pointer;
    margin-left: 20px;
    padding: 8px 16px;
    background-color: #fdbb2d;
    color: #110813;
    border-radius: 10px;
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: translateY(-2px);
    }
    &:active {
      transform: translateY(-2px) scale(0.95);
    }
  }
}
</style>
