const norm = 0.3
const x0 = 1
let N = 16 // кол-во всех возможных значений векторов
let tTeacher = [1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0] // значение t на наборах переменных

// значения всех возможных наборов аргументов
let X1 = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1]
let X2 = [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1]
let X3 = [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1]
let X4 = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]

// пороговая ФА
const porogovayaFunc = net => net >= 0 ? 1 : 0

// логистическая ФА
const logisticFunc = out => out >= 0.5 ? 1 : 0

// hyperbolic tangent function
const hyperbolicTangentOut = x =>
    (((Math.exp(x) - Math.exp(-x)) /
        (Math.exp(x) + Math.exp(-x))) + 1) * 0.5

const calculateNet = (x1, x2, x3, x4, w) => x1 * w[1] + x2 * w[2] + x3 * w[3] + x4 * w[4] + w[0]

const hammingDistance = (t, y) => { // считаем расстояние Хэмминга
  let E = 0
  for (let i = 0; i < t.length; i++) {
    if (t[i] !== y[i]) {
      E++
    }
  }
  return E
}

const stepsNeuralNetwork = (X1, X2, X3, X4, w, combination) => {
  let y = 0, outputVector = [], vectorT = []
  for (let i = 0; i < combination.length; i++) {
    let x1 = X1[combination[i]], x2 = X2[combination[i]],
        x3 = X3[combination[i]], x4 = X4[combination[i]]
    let net = calculateNet(x1, x2, x3, x4, w)
    //let out = hyperbolicTangentOut(net)
    y = porogovayaFunc(net)
    outputVector.push(y)
    let t = tTeacher[combination[i]]
    vectorT.push(t)
    let delta = t - y
    if (delta !== 0) {

      w[0] += norm * delta * x0
      w[1] += norm * delta * x1
      w[2] += norm * delta * x2
      w[3] += norm * delta * x3
      w[4] += norm * delta * x4

      /* w[0] += norm * delta * x0 * (1 / (2 * Math.pow(((Math.exp(net) + Math.exp(-net)) / 2), 2)))
      w[1] += norm * delta * x1 * (1 / (2 * Math.pow(((Math.exp(net) + Math.exp(-net)) / 2), 2)))
      w[2] += norm * delta * x2 * (1 / (2 * Math.pow(((Math.exp(net) + Math.exp(-net)) / 2), 2)))
      w[3] += norm * delta * x3 * (1 / (2 * Math.pow(((Math.exp(net) + Math.exp(-net)) / 2), 2)))
      w[4] += norm * delta * x4 * (1 / (2 * Math.pow(((Math.exp(net) + Math.exp(-net)) / 2), 2)))
    */
    } else {
      w[0] = w[0]
      w[1] = w[1]
      w[2] = w[2]
      w[3] = w[3]
      w[4] = w[4]
    }
  }

  let countsErrorInCurrentEra = hammingDistance(vectorT, outputVector)

  return {
    weights: w,
    Error: countsErrorInCurrentEra,
    y: outputVector
  }

}

const eraNeuralNetwork = (weights, combination) => {
  let era = {}
  let k = 0;
  while (era.Error !== 0) {
    era = stepsNeuralNetwork(X1, X2, X3, X4, weights, combination)
    console.log(era, 'эпоха ', k)
    weights = era.weights
    k++
    if (k > 150) break
  }
  return combination
}

function* combinationN(array, n) {
  if (n === 1) {
    for (const a of array) {
      yield [a];
    }
    return;
  }

  for (let i = 0; i <= array.length - n; i++) {
    for (const c of combinationN(array.slice(i + 1), n - 1)) {
      yield [array[i], ...c];
    }
  }
}

function* combination_ordered(array) {
  for (let i = 1; i <= array.length; i++) {
    yield* combinationN(array, i);
  }
}

let index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

let generator = combination_ordered(index)

for (let combination of generator) {
  let weight = [0, 0, 0, 0, 0]
  eraNeuralNetwork(weight, combination)
  weight = [0, 0, 0, 0, 0]
}