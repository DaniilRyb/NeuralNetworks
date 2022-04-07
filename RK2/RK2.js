/*
Архитектура нейронной сети 1 – 1 – 3
xInputVector  = (1, –3)
yOutputVector = (1, 1, 1)
*/

const activationFunc = net => 1 / (1 + Math.exp(-net))

const derivativeActivationFunc = net =>
    activationFunc(net) * (1 - activationFunc(net))

const errorEpsilonCalculation = (M, t_j, yj_k) => {
    let sum = 0
    for (let i = 0; i < M; i++) {
        sum += ((t_j[i] - yj_k[i]) * (t_j[i] - yj_k[i]))
    }
    return Math.pow(sum, 0.5)
}

const methodBackPropagation = (weights, learning_rate) => {

    const t_j = [1, 1, 1] // целевой выход
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
        y3 = activationFunc(net3_2)

    let yj_k = [y1, y2, y3]

    let delta1 = (t_j[0] - yj_k[0]) * derivativeActivationFunc(net1_2),

        delta2 = (t_j[1] - yj_k[1]) * derivativeActivationFunc(net2_2),

        delta3 = (t_j[2] - yj_k[2]) * derivativeActivationFunc(net3_2),

        delta1_1 = ((w11_2 * delta1) + (w12_2 * delta2) + (w13_2 * delta3))
            * derivativeActivationFunc(net1_1)

    let M = 3,
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

    console.log(
        "x1(1)=" + x1 + "\n" +
        "x1(2)=" + x2 + "\n" +
        "net1(1)=" + net1_1 + "\n" +
        "x2(1)=" + x1_2 + "\n" +
        "net2(1)=" + net1_2 + "\n" +
        "y1=" + y1 + "\n" +
        "net2(2)=" + net2_2 + "\n" +
        "y2=" + y2 + "\n" +
        "net2(3)=" + net3_2 + "\n" +
        "y3=" + y3 + "\n" +

        "delta2[1]=" + delta1 + "\n" +
        "delta2[2]=" + delta2 + "\n" +
        "delta2[3]=" + delta3 + "\n" +
        "delta1[1]=" + delta1_1 + "\n" +

        "W1[0,1]=" + w01_1 + "\n" +
        "W1[1,1]=" + w11_1 + "\n" +
        "W2[0,1]=" + w01_2 + "\n" +
        "W2[1,1]=" + w11_2 + "\n" +
        "W2[0,2]=" + w02_2 + "\n" +
        "W2[1,2]=" + w12_2 + "\n" +
        "W3[0,3]=" + w03_2 + "\n" +
        "W3[1,3]=" + w13_2
    )

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
        if (counterEpoch > 1) break
        currentBackPropagationEpoch = methodBackPropagation(weights, 1)
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

/* w11_1, w01_1, w11_2, w12_2, w13_2, w01_2, w02_2, w03_2 */
let weights = [-0.6, 0.5, -0.1, -0.6, 0.9, 0.5, 0.5, 0.5]
epochLearningNeuralNetwork(weights)