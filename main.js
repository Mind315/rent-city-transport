const transportType = Array.from(document.querySelectorAll('.form__type-transport')); // список транспортных средств
const optionType = Array.from(document.querySelectorAll('.option')); // список опций
const inputTime = document.getElementById('time'); // шакала времени
const resultTime = document.getElementById('result-time'); // отображение времени

const total = document.getElementById('total'); //итоговая сумма
const orderTransport = document.getElementById('order_form__type-transport'); // сумма за транспорт
const orderTime = document.getElementById('order_time'); //итоговое время
const orderOption = document.getElementById('order_option'); //сумма за опции

inputTime.addEventListener('input', updateTime);

transportType.forEach((item) => {
  item.addEventListener('click', transportPriceUpdate);
});

optionType.forEach((option) => {
  option.addEventListener('change', updateOption);
});

// обновляем значение выбранного транспорта и обновляем итоговое значение
function transportPriceUpdate(event) {
  let name = event.target.dataset.name;
  console.log(name);
  currentState.transportType = name;
  updateTotalPrice();
  updateOrderTransport();
}
// обновляем этоговое значение
function updateTotalPrice() {
  let currentTransportPrice = currentState.getTransportTypePrice();
  let totalPrice = currentTransportPrice;
  let optionPrice = currentState.getOptionPrice();
  orderOption.value = `${optionPrice} р`;
  total.value = totalPrice * currentState.time + optionPrice;
}
// обновляем значение выбранного транспорта
function updateOrderTransport() {
  orderTransport.value = `${currentState.getTransportTypePrice()} р/час`;
}
// обновляем часы и итоговое время
function updateTime(e) {
  let rangeValue = e.target.value;
  currentState.time = rangeValue;
  resultTime.value = rangeValue;
  orderTime.value = `${rangeValue} ч`;

  console.log(currentState.time);
  updateTotalPrice();
}
// обновление списка опций
function updateOption(event) {
  event.stopPropagation();

  if (event.target.checked) {
    currentState.option.push(event.target.id);
  } else {
    let index = currentState.option.indexOf(event.target.id);
    currentState.option.splice(index, 1);
  }

  updateTotalPrice();
  updateOrderTransport();
}

const priceInfo = {
  transportType: {
    unicycle: 300,
    segway: 500,
    hoverboard: 450,
    'children-bicycle': 350,
    bicycle: 400,
    'electric-scooter': 550
  },
  option: {
    delivery: 200,
    insurance: 150,
    briefing: 400
  }
};
let currentState = {
  transportType: 'segway',
  time: 1,
  option: [],
  getTransportTypePrice() {
    return priceInfo.transportType[this.transportType];
  },
  getOptionPrice() {
    let optionSumPrice = 0;

    // проверка на пустой массив
    if (this.option.length) {
      this.option.forEach((item) => {
        optionSumPrice += priceInfo.option[item];
      });
    }
    return optionSumPrice;
  }
};
