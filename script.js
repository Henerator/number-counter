const configs =  [
    {
        value : 0,
        min: 0,
        max: 100,
        controlA : 0.9,
        controlB : 0.9,
        duration : 4,
        delay : 2,
    },
    {
        value : 0,
        min: 1000,
        max: 9999,
        controlA : 0.1,
        controlB : 0.1,
        duration : 5,
        delay : 2,
    },
    {
        value : 0,
        min: 0,
        max: 100000,
        controlA : 0.1,
        controlB : 0.1,
        duration : 1,
        delay : 2,
    },
];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createElements(configs) {
    configs.forEach((config, index) => {
        const element = document.createElement('div');
        element.classList.add('counter');

        config.element = element;
        document.body.appendChild(element);
    });
}

function updateCounter(config) {
    const nextValue = getRandomInt(config.min, config.max);
    const numberCounter = new NumberCounter(
        config.value,
        nextValue,
        config.controlA,
        config.controlB,
        config.duration
    );
    numberCounter.onChange = (value) => {
        config.element.innerText = Math.floor(value);
    };
    numberCounter.onTransitionEnd = () => {
        setTimeout(() => updateCounter(config), config.delay * 1000);
    };
    numberCounter.startTransition();

    config.value = nextValue;
}

function update(configs) {
    configs.forEach(config => updateCounter(config));
}

createElements(configs);
update(configs);