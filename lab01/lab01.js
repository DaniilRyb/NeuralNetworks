const norm = 0.3
const x0 = 1
let N = 16 // кол-во всех возможных значений векторов
let w = [0, 0, 0, 0, 0] // начальные веса
let tTeacher = [1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0] // значение t на наборах переменных

// значения всех возможных наборов аргументов
let X1 = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1] // 16 значения x1
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

// ф-ия для перебора всех значений
/* const stepsNeuralNetwork = (X1, X2, X3, X4, N, w) => {
  let y = 0, outputVector = []
  for (let i = 0; i < N; i++) {
    let x1 = X1[i], x2 = X2[i], x3 = X3[i], x4 = X4[i]
    let net = calculateNet(x1, x2, x3, x4, w)
    let out = hyperbolicTangentOut(net)
    y = logisticFunc(out)
    outputVector.push(y)
    let t = tTeacher[i]
    let d = t - y
    if (d !== 0) {

      w[0] += norm * delta * x0
      w[1] += norm * delta * x1
      w[2] += norm * delta * x2
      w[3] += norm * delta * x3
      w[4] += norm * delta * x4

      w[0] += norm * d * x0 * (1 / (2 * Math.pow(((Math.exp(net) + Math.exp(-net)) / 2), 2)))
      w[1] += norm * d * x1 * (1 / (2 * Math.pow(((Math.exp(net) + Math.exp(-net)) / 2), 2)))
      w[2] += norm * d * x2 * (1 / (2 * Math.pow(((Math.exp(net) + Math.exp(-net)) / 2), 2)))
      w[3] += norm * d * x3 * (1 / (2 * Math.pow(((Math.exp(net) + Math.exp(-net)) / 2), 2)))
      w[4] += norm * d * x4 * (1 / (2 * Math.pow(((Math.exp(net) + Math.exp(-net)) / 2), 2)))
    } else {
      w[0] = w[0]
      w[1] = w[1]
      w[2] = w[2]
      w[3] = w[3]
      w[4] = w[4]
    }
  }
  let countErrorInCurrentEra = hammingDistance(tTeacher, outputVector)

  return {
    weights: w,
    E: countErrorInCurrentEra,
    y: outputVector
  }

} */

/*
const stepsNeuralNetwork = (X1, X2, X3, X4, N, w) => {
  let y = 0, outputVector = [], index = []
  for (let i = 0; i < N; i++) {
    let x1 = X1[i], x2 = X2[i], x3 = X3[i], x4 = X4[i]
    let net = calculateNet(x1, x2, x3, x4, w)
    let out = hyperbolicTangentOut(net)
    y = logisticFunc(out)
    outputVector.push(y)
    let t = tTeacher[i]
    let d = t - y
    if (d !== 0) {

     /!* w[0] += norm * delta * x0
      w[1] += norm * delta * x1
      w[2] += norm * delta * x2
      w[3] += norm * delta * x3
      w[4] += norm * delta * x4
*!/
      w[0] += norm * d * x0 * (1 / (2 * Math.pow(((Math.exp(net) + Math.exp(-net)) / 2), 2)))
      w[1] += norm * d * x1 * (1 / (2 * Math.pow(((Math.exp(net) + Math.exp(-net)) / 2), 2)))
      w[2] += norm * d * x2 * (1 / (2 * Math.pow(((Math.exp(net) + Math.exp(-net)) / 2), 2)))
      w[3] += norm * d * x3 * (1 / (2 * Math.pow(((Math.exp(net) + Math.exp(-net)) / 2), 2)))
      w[4] += norm * d * x4 * (1 / (2 * Math.pow(((Math.exp(net) + Math.exp(-net)) / 2), 2)))
    } else {
      w[0] = w[0]
      w[1] = w[1]
      w[2] = w[2]
      w[3] = w[3]
      w[4] = w[4]
    }
  }
  let countErrorInCurrentEra = hammingDistance(tTeacher, outputVector)

  return {
    weights: w,
    E: countErrorInCurrentEra,
    y: outputVector
  }

}
*/

const stepsNeuralNetwork = (X1, X2, X3, X4, N, w, iPos) => {
    let y = 0, outputVector = []
    for (let i = iPos, j = 0; i < N, j < N; i++, j++) {
        let x1 = X1[i], x2 = X2[i], x3 = X3[i], x4 = X4[i]
        let net = calculateNet(x1, x2, x3, x4, w)
        let out = hyperbolicTangentOut(net)
        y = logisticFunc(out)
        outputVector.push(y)
        let t = tTeacher[j]
        let d = t - y
        if (d !== 0) {

            /* w[0] += norm * delta * x0
             w[1] += norm * delta * x1
             w[2] += norm * delta * x2
             w[3] += norm * delta * x3
             w[4] += norm * delta * x4
       */
            w[0] += norm * d * x0 * (1 / (2 * Math.pow(((Math.exp(net) + Math.exp(-net)) / 2), 2)))
            w[1] += norm * d * x1 * (1 / (2 * Math.pow(((Math.exp(net) + Math.exp(-net)) / 2), 2)))
            w[2] += norm * d * x2 * (1 / (2 * Math.pow(((Math.exp(net) + Math.exp(-net)) / 2), 2)))
            w[3] += norm * d * x3 * (1 / (2 * Math.pow(((Math.exp(net) + Math.exp(-net)) / 2), 2)))
            w[4] += norm * d * x4 * (1 / (2 * Math.pow(((Math.exp(net) + Math.exp(-net)) / 2), 2)))
        } else {
            w[0] = w[0]
            w[1] = w[1]
            w[2] = w[2]
            w[3] = w[3]
            w[4] = w[4]
        }
    }
    let countErrorInCurrentEra = hammingDistance(tTeacher, outputVector)

    return {
        weights: w,
        E: countErrorInCurrentEra,
        y: outputVector
    }

}

const eraNeuralNetwork = (weights, X1, X2, X3, X4, iPos) => {
    let k = 0 // счетчик эпох
    let era = {}
    while (era.E !== 0) {
        era = stepsNeuralNetwork(X1, X2, X3, X4, X1.length, weights, iPos)
        console.log(era, 'эпоха ', k)
        weights = era.weights
        k++
        if (k > 150) break
    }
}

let timeStart = new Date()
eraNeuralNetwork(w, X1, X2, X3, X4, 0)
let timeEnd = new Date()
console.log('время выполнения программы:', (timeEnd - timeStart).toString(), 'миллисекунд')