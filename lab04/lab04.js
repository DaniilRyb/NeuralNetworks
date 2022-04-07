/* Изучение алгоритма обратного распространения ошибки (метод Back Propagation)
Архитектура нейронной сети 1 – 1 – 3
xInputVector  = (1, –3)
yOutputVector = (0.1, 0.1, 0.1)
*/

/*
const hyperbolicTangentOut = net =>
    ((((Math.exp(net) - Math.exp(-net)) /
        (Math.exp(net) + Math.exp(-net))) + 1) * 0.5)
*/

const activationFunc = net =>
    ((1 - Math.exp(-net)) / (1 + Math.exp(-net)))

const derivativeActivationFunc = net =>
    0.5 * (1 - Math.pow(activationFunc(net), 2))

const errorEpsilonCalculation = (M, t_j, yj_k) => {
    let sum = 0
    for (let i = 0; i < M; i++) {
        sum += ((t_j[i] - yj_k[i]) * (t_j[i] - yj_k[i]))
    }
    return Math.pow(sum, 0.5)
}

const methodBackPropagation = (weights, learning_rate) => {

    const t_j = [0.1, 0.1, 0.1] // целевой выход
    const x1 = -3, x2 = 1 // 2 входа

    let w11_1, w01_1,
        w11_2, w12_2, w13_2,
        w01_2, w02_2, w03_2

    w11_1 = weights[0]
    w01_1 = weights[1]
    w11_2 = weights[2]
    w01_2 = weights[3]
    w12_2 = weights[4]
    w02_2 = weights[5]
    w13_2 = weights[6]
    w03_2 = weights[7]

    let net1_1 = w11_1 * x1 + w01_1 * x2,
        x1_2 = activationFunc(net1_1),
        net1_2 = w11_2 * x1_2 + w01_2 * 1,
        net2_2 = w12_2 * x1_2 + w02_2 * 1,
        net3_2 = w13_2 * x1_2 + w03_2 * 1

    let y1 = activationFunc(net1_2),
        y2 = activationFunc(net2_2),
        y3 = activationFunc(net3_2),

        yj_k = [y1, y2, y3],

        /*delta1 = (t_j[0] - yj_k[0]) *
            (1 / (2 * Math.pow(((Math.exp(net1_2) + Math.exp(-net1_2)) / 2), 2))),

        delta2 = (t_j[1] - yj_k[1]) *
            (1 / (2 * Math.pow(((Math.exp(net2_2) + Math.exp(-net2_2)) / 2), 2))),

        delta3 = (t_j[2] - yj_k[2]) *
            (1 / (2 * Math.pow(((Math.exp(net3_2) + Math.exp(-net3_2)) / 2), 2))),

        delta1_1 = ((w11_2 * delta1) + (w12_2 * delta2) + (w13_2 * delta3)) *
            (1 / (2 * Math.pow(((Math.exp(net1_1) + Math.exp(-net1_1)) / 2), 2))),
*/

        delta1 = (t_j[0] - yj_k[0]) * derivativeActivationFunc(net1_2),

        delta2 = (t_j[1] - yj_k[1]) * derivativeActivationFunc(net2_2),

        delta3 = (t_j[2] - yj_k[2]) * derivativeActivationFunc(net3_2),

        delta1_1 = ((w11_2 * delta1) + (w12_2 * delta2) + (w13_2 * delta3))
            * derivativeActivationFunc(net1_1),


        M = 3,
        epsilon = errorEpsilonCalculation(M, t_j, yj_k)


    // коррекция весов 1 слоя
    w11_1 += learning_rate * x1 * delta1_1
    w01_1 += learning_rate * delta1_1

    // коррекция весов 2 слоя
    w11_2 += learning_rate * x1_2 * delta1
    w01_2 += learning_rate * delta1
    w12_2 += learning_rate * x1_2 * delta2
    w02_2 += learning_rate * delta2
    w13_2 += learning_rate * x1_2 * delta3
    w03_2 += learning_rate * delta3

    weights = [w11_1, w01_1, w11_2, w01_2,
        w12_2, w02_2, w13_2, w03_2]


    return {
        weights,
        y_output: yj_k,
        epsilon
    }
}

const epochLearningNeuralNetwork = weights => {
    let counterEpoch = 0,
        valueError,
        currentBackPropagationEpoch = {}

    do {
        currentBackPropagationEpoch = methodBackPropagation(weights, 1)
        if (counterEpoch > 100) break
        weights = currentBackPropagationEpoch.weights
        valueError = currentBackPropagationEpoch.epsilon

        console.log(
            {
                Epoch: counterEpoch,
                Y: currentBackPropagationEpoch.y_output,
                E: valueError,
                weights: currentBackPropagationEpoch.weights
            })

        counterEpoch++
    } while (valueError > 1e-3)
}

let weights = [0, 0, 0, 0, 0, 0, 0, 0]
epochLearningNeuralNetwork(weights)