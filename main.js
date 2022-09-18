const transportType = Array.from(document.querySelectorAll('.form__type-transport'));
const total = document.getElementById('total');
const orderTransport = document.getElementById('order_form__type-transport');
const inputTime = document.getElementById('time');
const resultTime = document.getElementById('result-time');
const orderTime = document.getElementById('order_time');

inputTime.addEventListener('input', updateTime);

transportType.forEach((item) => {
  item.addEventListener('click', transportPriceUpdate);
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
  total.value = totalPrice * currentState.time;
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
  transportType: 'unicycle',
  time: 1,
  option: ['delivery', 'briefing'],
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
