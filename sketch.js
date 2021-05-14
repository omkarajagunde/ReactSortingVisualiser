var width = "";
var height = "";
var barXposition = "";
var randomNums = [];
var totalNums = "";
let osc, fft;
let accessCount = 0;

function setup(params) {
  width = document.getElementById("canvas").offsetWidth;
  console.log(barXposition);
  height = document.getElementById("canvas").offsetHeight;
  let canvas = createCanvas(width, height);
  canvas.parent("canvas");

  osc = new p5.TriOsc(); // set frequency and type
  osc.amp(0.5);

  fft = new p5.FFT();
  //osc.start();
}

function draw(params) {}

function fillArr() {
  totalNums = document.getElementById("totalNums").value;
  barXposition = width / totalNums;
  let c = totalNums;
  let value = 1;
  while (c != 0) {
    randomNums.push(value++);
    c--;
  }
  console.log(randomNums);
  return randomNums;
}

function generateRandomNum() {
  totalNums = document.getElementById("totalNums").value;
  barXposition = width / totalNums;
  let c = totalNums;
  while (c != 0) {
    randomNums.push(Math.floor(Math.random() * 250) + 5);
    c--;
  }
  console.log(randomNums);
}

// function setBars(barCount = totalNums, barY = 0, Xposition = 40) {
//     if (barCount == 0)
//         return
//     strokeWeight(1); // Thicker
//     rect(Xposition, height - 50, barXposition - 2, -randomNums[barY]);
//     Xposition += barXposition + 1

//     setBars(barCount - 1, barY + 1, Xposition)

// }

async function setBars(randomArr = randomNums) {
  let barCount = totalNums;
  let barY = 0;
  let posX = 20;
  let graphHt = height - 100;
  let shuffedArr = shuffleNums(randomArr);

  while (barCount >= 0) {
    fill(255);
    rect(posX, graphHt, barXposition - 2, -shuffedArr[barY]);
    barY++;
    posX += barXposition + 1;
    barCount--;
    osc.start();
    await sleep(20);
    osc.freq(shuffedArr[barY] * 10, 0.7);
    osc.stop();
  }
}

async function setSortedBars(sortedArr) {
  let barCount = totalNums;
  let barY = 0;
  let posX = 20;
  let graphHt = height - 100;

  fill(
    Math.floor(Math.random() * 250) + 5,
    Math.floor(Math.random() * 250) + 5,
    Math.floor(Math.random() * 250) + 5
  );

  while (barCount >= 0) {
    rect(posX, graphHt, barXposition - 2, -sortedArr[barY]);
    barY++;
    posX += barXposition + 1;
    barCount--;

    osc.start();
    await sleep(0.01);
    osc.freq(sortedArr[barY] * 10, 1);
    osc.stop();
  }
}

async function selectionSort() {
  accessCount = 0;
  let array = randomNums;
  for (var i = 0; i < array.length; i++) {
    clear();
    //set min to the current iteration of i
    var min = i;
    for (var j = i + 1; j < array.length; j++) {
      if (array[j] < array[min]) {
        min = j;
      }
      accessCount++;
      document.getElementById(
        "accessCount"
      ).innerHTML = `array accessed ${accessCount} times`;
    }
    var temp = array[i];
    array[i] = array[min];
    array[min] = temp;
    await setSortedBars(array);
  }
}

async function bubbleSort() {
  let array = randomNums;
  let swapped;
  accessCount = 0;
  do {
    clear();
    swapped = false;
    for (let i = 0; i < array.length; i++) {
      if (array[i] > array[i + 1]) {
        let tmp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = tmp;
        swapped = true;

        accessCount++;
        document.getElementById(
          "accessCount"
        ).innerHTML = `array accessed ${accessCount} times`;
      }
    }
    await setSortedBars(array);
  } while (swapped);
}

function shuffleNums(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  console.log("shuffled: ", array);
  return array;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
