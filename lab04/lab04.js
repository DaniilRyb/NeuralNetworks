/*Изучение алгоритма обратного распространения ошибки (метод Back Propagation)

Архитектура 1 – 1 – 3
x_input  = (1 –3)
y_output = (1 1 1)

*/

const learning_rate = 1
let t_j = [0.1, 0.1, 0.1] // целевой выход
const x1_1 = -3 // вход

let hyperbolicTangentOut = x =>
    (((Math.exp(x) - Math.exp(-x)) /
        (Math.exp(x) + Math.exp(-x))) + 1) * 0.5

//let netCalc = (x, w11, w01) => w11 * x + w01 * 1

let errorEpsilonCalculation = (M, t_j, yj_k) => {
    let sum = 0
    for (let i = 0; i < M; i++) {
        sum += ((t_j[i] - yj_k[i]) * (t_j[i] - yj_k[i]))
    }
    return Math.pow(sum, 0.5)
}

let backPropagation = weight => {

    let w11_1, w01_1,
        w11_2, w12_2, w13_2,
        w01_2, w02_2, w03_2

    w11_1 = weight[0]
    w01_1 = weight[1]
    w11_2 = weight[2]
    w12_2 = weight[3]
    w13_2 = weight[4]
    w01_2 = weight[5]
    w02_2 = weight[6]
    w03_2 = weight[7]

    let net1_1 = w11_1 * x1_1 + w01_1 * 1
    let x1_2 = hyperbolicTangentOut(net1_1)
    let net1_2 = w11_2 * x1_2 + w01_2 * 1
    let net2_2 = w12_2 * x1_2 + w02_2 * 1
    let net3_2 = w13_2 * x1_2 + w03_2 * 1

    let y1 = hyperbolicTangentOut(net1_2)
    let y2 = hyperbolicTangentOut(net2_2)
    let y3 = hyperbolicTangentOut(net3_2)

    let yj_k = [y1, y2, y3]

    let delta1 = ((t_j[0] - y1) *
        (1 / (2 * Math.pow(((Math.exp(net1_2) + Math.exp(-net1_2)) / 2), 2))))

    let delta2 = ((t_j[1] - y2) *
        (1 / (2 * Math.pow(((Math.exp(net2_2) + Math.exp(-net2_2)) / 2), 2))))

    let delta3 = ((t_j[2] - y3) *
        (1 / (2 * Math.pow(((Math.exp(net3_2) + Math.exp(-net3_2)) / 2), 2))))

    let delta1_1 = (((w11_2 * delta1) + (w12_2 * delta2) + (w13_2 * delta3))
        * (1 / (2 * Math.pow(((Math.exp(net1_1) + Math.exp(-net1_1)) / 2), 2))))

    let epsilon = errorEpsilonCalculation(3, t_j, yj_k)

    console.log(epsilon)

    // коррекция весов 1 слоя
    w11_1 += learning_rate * x1_1 * delta1_1
    w01_1 += learning_rate * 1 * delta1_1

    // коррекция весов 2 слоя
    w11_2 += learning_rate * x1_2 * delta1
    w01_2 += learning_rate * 1 * delta1
    w12_2 += learning_rate * x1_2 * delta2
    w02_2 += learning_rate * 1 * delta2
    w13_2 += learning_rate * x1_2 * delta3
    w03_2 += learning_rate * 1 * delta3

    weight = [w11_1, w01_1, w11_2, w01_2,
        w12_2, w02_2, w13_2, w03_2]

    let currentWeight = {
        currentWeight: weight,
        yOutputVector: yj_k
    }

    console.log(currentWeight)

    return {
        weight: weight,
        epsilon: epsilon
    }
}

let epochLearningNeuralNetwork = weight => {
    let countEpoch = 0,
        valueError = 1
    do {
        let currentBackPropagationEpoch = backPropagation(weight)
        countEpoch++
        if (countEpoch > 150) break
        console.log("current count epoch", countEpoch)
        weight = currentBackPropagationEpoch.weight
        valueError = currentBackPropagationEpoch.epsilon
    } while (valueError > 1e-3)
}

epochLearningNeuralNetwork([0, 0, 0, 0, 0, 0, 0, 0])