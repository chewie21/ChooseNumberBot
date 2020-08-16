'use strict'

let botNumber,
    userNumber,
    counter,
    choose,
    numbers = [];

const beginTitle = document.querySelector(".beginTitle"),
    beginButton = document.querySelector(".beginButton"),
    titleText = document.querySelector(".beginText"),
    gameTitle = document.querySelector(".gameTitle"),
    gameExit = document.querySelector(".gameExit"),
    gameRestart = document.querySelector(".gameRestart"),
    gameAdd = document.querySelector(".gameAdd"),
    gameInput = document.querySelector(".gameInput"),
    inputBot = document.querySelector(".inputBot"),
    counterPlace = document.querySelector(".counterPlace"),
    counterText = document.querySelector(".counterText"),
    invalid = document.querySelector(".invalid");


//Вспомогательные
//Валидация ввода полизователя
function checkVariable (userNumber) {
    if (!+userNumber || userNumber <= 0 || userNumber >= 101 || !isFinite(userNumber)) {
        invalid.style.display = "block";
        gameInput.classList.add("is-invalid");
        gameInput.value = "";
        return false;
    } else {
        invalid.style.display = "none";
        gameInput.classList.remove("is-invalid");
        return true;
    }
}
//Создание псевдорандомного числа
function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

//Архив введеных значений
//Добавление в архив
function addNumbersArr (userNumber) {
    numbers[numbers.length] = userNumber;
}
//Поиск в архиве
function checkNumbersArr (userNumber) {
    for (let i = 0; i < numbers.length; i++) {
        if(userNumber == numbers[i]) {
            return true;
        }
    }
    return false;
}

//Отображение элементов
function showTitle () {
    beginTitle.style.display = "block";
    titleText.innerHTML = "Давай сыграем в игру: я загадаю число, а ты должен будешь отгадать?!";
    gameTitle.style.display = "none";
    counterPlace.style.display = "none";
}
function showGame () {
    gameTitle.style.display = "block";
    counterPlace.style.display = "block";
    beginTitle.style.display = "none";
}
function cleanForm () {
    gameInput.classList.remove("is-invalid");
    inputBot.classList.remove("is-invalid");
    inputBot.classList.remove("is-valid");
    invalid.style.display = "none";
}

//Основные функции
function checkNumber(userNumber, botNumber) {
    if (checkNumbersArr(userNumber)) {
        inputBot.classList.remove("is-valid");
        inputBot.classList.add("is-invalid");
        inputBot.value = "Такое число уже было...";
        game();
    } else {
        counter--
        inputBot.classList.remove("is-invalid");
        inputBot.classList.add("is-valid");
        if (userNumber == botNumber) {
            win();
        } else if (Math.abs(botNumber - userNumber) <= 5) {
            if (userNumber < botNumber) {
                addNumbersArr(userNumber);
                inputBot.value = "Ты совсем рядом! Загаданное число больше, но не более чем на 5!";
                game();
            } else if (userNumber > botNumber) {
                addNumbersArr(userNumber);
                inputBot.value = "Ты совсем рядом! Загаданное число меньше, но не более чем на 5!";
                game();
            }
        } else if (Math.abs(botNumber - userNumber) <= 10) {
            if (userNumber < botNumber) {
                addNumbersArr(userNumber);
                inputBot.value = "Загаданное число больше, но не более чем на 10!";
                game();
            } else if (userNumber > botNumber) {
                addNumbersArr(userNumber);
                inputBot.value = "Загаданное число меньше, но не более чем на 10!";
                game();
            }  
        } else if (userNumber < botNumber) {
            addNumbersArr(userNumber);
            inputBot.value = "Загаданное число больше!";
            game();
        } else if (userNumber > botNumber) {
            addNumbersArr(userNumber);
            inputBot.value = "Загаданное число меньше!";
            game();
        }   
    }
}  

function begin () {
    counter = 10;
    showTitle();
    cleanForm();
    beginButton.addEventListener('click', game);
}

function restart() {
    cleanForm();
    gameInput.value = "";
    counter = 10;
    game();
}

function game() {
    counterText.innerHTML = "Количество оставшихся попыток: " + counter;
    if (counter == 10) {
        inputBot.value = "Угадай число от 1 до 100";
        showGame();
    } else if (counter == 0) {
        lose();
    } else {
        showGame();
    }
    gameExit.addEventListener('click', begin);
    gameRestart.addEventListener('click', restart);
    gameAdd.addEventListener('click', play); 
}

function play() {
    userNumber = gameInput.value;
    gameInput.value = "";
    if (checkVariable(userNumber)) {
        if(counter == 10 ) {
            numbers = [];
            botNumber = getRandomNumber(1,100);
            console.log(botNumber);
            checkNumber(userNumber, botNumber);
        } else {
            checkNumber(userNumber, botNumber);
        }
    }
}

function win() {
    showTitle();
    titleText.innerHTML = "Поздравляю! Ты выйграл! Сыграем еще?";
    beginButton.addEventListener('click', restart);
};

function lose() {
    showTitle();
    titleText.innerHTML = "К сожалению, ты проиграл... Сыграем еще?";
    beginButton.addEventListener('click', restart);
}

begin();