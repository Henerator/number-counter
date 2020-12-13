let counterValue = 0;
const controlA = 0.1;
const controlB = 0.1;
const duration = 1;
const delay = 2;
const counterElement = document.getElementById('counter');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function update() {
    const nextValue = getRandomInt(0, 100000);
    const numberCounter = new NumberCounter(counterValue, nextValue, controlA, controlB, duration);
    numberCounter.onChange = (value) => {
        counterElement.innerText = Math.floor(value);
    };
    numberCounter.onTransitionEnd = () => {
        setTimeout(update, delay * 1000);
    };
    numberCounter.startTransition();

    counterValue = nextValue;
}

update();