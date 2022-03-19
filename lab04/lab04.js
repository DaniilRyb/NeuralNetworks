/* Исследование нейронных сетей с радиальными базисными функциями (RBF) на примере моделирования булевых выражений */
const learning_rate = 0.3
const fi0 = 1
let tTeacher = [1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0] // значение t на наборах переменных

let V = [0, 0, 0, 0, 0, 0, 0, 0]

// значения всех возможных наборов аргументов
let X1 = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1]
let X2 = [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1]
let X3 = [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1]
let X4 = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]

let Cji = [[1, 1, 0, 0],
    [0, 1, 1, 0],
    [1, 1, 1, 0],
    [0, 1, 0, 1],
    [1, 1, 0, 1],
    [0, 1, 1, 1],
    [1, 1, 1, 1]]

let Y1 = [0, 0, 1, 1]
let Y2 = [0, 1, 0, 1]
let Y3 = [1, 1, 1, 0]
let Y4 = [0, 0, 1, 1]

let x_1 = [0, 0, 1, 0]
let x_2 = [0, 1, 1, 0]
let x_3 = [1, 0, 1, 1]
let x_4 = [1, 1, 0, 1]


const porogovayaFunc = net => net >= 0 ? 1 : 0

const logisticFunc = out => out >= 0.5 ? 1 : 0

const hyperbolicTangentOut = x =>
    (((Math.exp(x) - Math.exp(-x)) /
        (Math.exp(x) + Math.exp(-x))) + 1) * 0.5

const fiCalculation = (X, Cji, j) => {
    let sum = 0
    let C = Cji[j]
    for (let i = 0; i < 4; i++) {
        sum += ((X[i] - C[i]) * (X[i] - C[i]))
    }
    return Math.exp(-sum)
}

const calculateNet = (Cji, V, X) => {
    let net = 0
    for (let j = 1; j < V.length; j++) {
        net += V[j] * fiCalculation(X, Cji, j - 1)
    }
    net += V[0]
    return net
}

const hammingDistance = (teacher, y) => { // считаем расстояние Хэмминга
    let E = 0
    for (let i = 0; i < teacher.length; i++) {
        if (teacher[i] !== y[i]) {
            E++
        }
    }
    return E
}

const stepsMinVectorNeuralNetwork = (X1, X2, X3, X4, coeff, combination) => {
    let y = 0,
        outputVector = [],
        vectorT = []
    for (let i = 0; i < combination.length; i++) {
        let X = [X1[combination[i]], X2[combination[i]], X3[combination[i]], X4[combination[i]]]
        let net = calculateNet(Cji, coeff, X)
        let out = hyperbolicTangentOut(net)
        y = logisticFunc(out)
        outputVector.push(y)
        let t = tTeacher[i]
        vectorT.push(t)
        let beta = t - y
        if (beta !== 0) {

            coeff[0] += learning_rate * beta * fi0
            for (let i = 1; i < coeff.length; i++) {
                coeff[i] += learning_rate * beta * fiCalculation(X, Cji, i - 1)
            }
            /*
                        V[0] += learning_rate * beta * fi0
                        for (let i = 1; i < V.length; i++) {
                            V[i] += learning_rate * beta * fiCalculation(X, Cji, i - 1) *
                                (1 / (2 * Math.pow(((Math.exp(net) + Math.exp(-net)) / 2), 2)))
                        }
            */

        } else {
            coeff[0] = coeff[0]
            coeff[1] = coeff[1]
            coeff[2] = coeff[2]
            coeff[3] = coeff[3]
            coeff[4] = coeff[4]
            coeff[5] = coeff[5]
            coeff[6] = coeff[6]
            coeff[7] = coeff[7]
        }
    }

    let countsErrorInCurrentEra = hammingDistance(vectorT, outputVector)

    return {
        coefficients: coeff,
        Error: countsErrorInCurrentEra,
        y: outputVector
    }

}

const learningNetworkMinVector = V => {
    let y = 0,
        outputVector = [],
        vectorT = []
    for (let i = 0; i < 16; i++) {
        let x1 = X1[i], x2 = X2[i],
            x3 = X3[i], x4 = X4[i]
        let net = calculateNet(Cji, V, [x1, x2, x3, x4])
        //let out = hyperbolicTangentOut(net)
        y = porogovayaFunc(net)
        outputVector.push(y)
        let t = tTeacher[i]
        vectorT.push(t)
    }

    let countsErrorInCurrentEra = hammingDistance(vectorT, outputVector)

    return {
        weights: V,
        Error: countsErrorInCurrentEra,
        y: outputVector
    }

}

const eraNeuralNetwork = (coefficient, combination) => {

    let currentEra = {}, k = 0;

    while (currentEra.Error !== 0) {
        currentEra = stepsMinVectorNeuralNetwork(X1, X2, X3, X4, coefficient, combination)
        //console.log(currentEra, 'эпоха ', k)
        k++
        if (k > 150) break
        coefficient = currentEra.coefficients
    }
    return [coefficient, combination, k]
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

let eraSearchVector = {}

for (let combination of generator) {
    let coeff = [0, 0, 0, 0, 0, 0, 0, 0]
    eraSearchVector = eraNeuralNetwork(coeff, combination)
    let minVector = learningNetworkMinVector(eraSearchVector[0])
    if (minVector.Error !== 0) continue
    else break
}

//eraNeuralNetwork(V, X1, X2, X3, X4)

console.log("найденные веса: " + eraSearchVector[0] + "\n",
    "индексы минимальных векторов: " + eraSearchVector[1] + "\n", "количество эпох: " + eraSearchVector[2])
