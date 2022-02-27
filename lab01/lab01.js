// 15 вариант

const norma = 0.3
const x0 = 1
let N = 16 // кол-во всех возможных значений векторов
w = [0, 0, 0, 0, 0] // начальные веса
let tTeacher = [1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0] // значение t на наборах переменных

// значения всех возможных наборов аргументов
let X1 = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1]
let X2 = [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1]
let X3 = [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1]
let X4 = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]

// пороговая ФА
const thresholdFunc = net => net > 0 ? 1 : 0

// логистическая ФА
const logisticFunc = net => net >= 0.5 ? 1 : 0

// hyperbolic tangent function

const hyperbolicTangentOut = net =>
  (((Math.exp(2 * net) - 1) /
    (Math.exp(2 * net) + 1)) + 1) * 0.5

function calculateNet(x1, x2, x3, x4, w) {
    let net = 0
    net += x1 * w[1] + x2 * w[2] + x3 * w[3] + x4 * w[4] + w[0]
    return net
}

Array.prototype.shuffle = function () {
    let input = this
    for (let i = input.length - 1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1))
        let itemAtIndex = input[randomIndex]
        input[randomIndex] = input[i]
        input[i] = itemAtIndex
    }
    return input
}

let indexArr = []
for (let i = 0; i < N; i++) {
    indexArr.push(i)
}

let indexArrRandom = indexArr.shuffle()

const hammingDistance = (t, y) => { // считаем расстояние Хэмминга
    let E = 0
    for (let i = 0; i < t.length; i++) {
        if (t[i] !== y[i]) {
            E++
        }
    }
    return E
}

// ф-ия для перебора всех значений
const stepsNeuralNetwork = (X1, X2, X3, X4, N, w) => {
    let y = 0;
    let outputVector = [];
    for (let i = 0; i < N; i++) {
        let x1 = X1[i];
        let x2 = X2[i];
        let x3 = X3[i];
        let x4 = X4[i];
        let net = calculateNet(x1, x2, x3, x4, w);
        //y = thresholdFunc(net);
        let out = hyperbolicTangentOut(net);
        y = logisticFunc(net);
        outputVector.push(y);
        let t = tTeacher[i];
        let delta = t - y;
        if (delta !== 0) {
            w[0] += norma * delta * x0;
            w[1] += norma * delta * x1;
            w[2] += norma * delta * x2;
            w[3] += norma * delta * x3;
            w[4] += norma * delta * x4;
        } else {
            w[0] = w[0];
            w[1] = w[1];
            w[2] = w[2];
            w[3] = w[3];
            w[4] = w[4];
        }
    }
    let countErrorInCurrentEra = hammingDistance(tTeacher, outputVector);

    return  {
        weights: w,
        E: countErrorInCurrentEra,
        y: outputVector
    };

}

// ф-ия для случайной выборки
/*
const stepsNeuralNetwork = (X1, X2, X3, X4, N, w) => {
  let y = 0,
    t = 0
  let outputCurrentVector = [], outputVector = []
  let countErrorInCurrentEra
  let x1, x2, x3, x4
  for (let i = 0; i < N; i++) {
    x1 = X1[indexArrRandom[i]]
    x2 = X2[indexArrRandom[i]]
    x3 = X3[indexArrRandom[i]]
    x4 = X4[indexArrRandom[i]]
    let net = calculateNet(x1, x2, x3, x4, w)
    let out = hyperbolicTangentOut(net)
    y = thresholdFunc(out)
    // y = logisticFunc(net);
    outputCurrentVector.push(y)
    t = tTeacher[indexArrRandom[i]]
    outputVector.push(t)
    let delta = t - y
    if (delta !== 0) {
      w[0] += norma * delta * x0
      w[1] += norma * delta * x1
      w[2] += norma * delta * x2
      w[3] += norma * delta * x3
      w[4] += norma * delta * x4
    } else {
      w[0] = w[0]
      w[1] = w[1]
      w[2] = w[2]
      w[3] = w[3]
      w[4] = w[4]
    }
  }

  countErrorInCurrentEra = hammingDistance(outputVector, outputCurrentVector)

  return {
    weights: w,
    E: countErrorInCurrentEra,
    y: outputCurrentVector,
    t: outputVector
  }

}
*/

const eraNeuralNetwork = weights => {
    let k = 0 // счетчик эпох
    let era = stepsNeuralNetwork(X1, X2, X3, X4, N, weights)
    while (era.E !== 0) {
        era = stepsNeuralNetwork(X1, X2, X3, X4, N, weights)
        console.log(era, 'эпоха ', k)
        weights = era.weights
        k++
    }
}

let timeStart = new Date()
eraNeuralNetwork(w)
let timeEnd = new Date()
console.log('время выполнения программы:', timeEnd - timeStart, 'миллисекунд')