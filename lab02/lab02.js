/* Применение однослойной нейронной сети с линейной функцией активации для прогнозирования временных рядов */

const slidingWindow = (a, b, p, N, learning_rate, countEpoch) => {

    let w = []
    for (let i = 0; i < p + 1; i++) {
        w.push(0)
    }

    let step = (b - a) / N
    let vectorValue = []
    let VectorX = []
    let x_t

    for (let t = a; t < b + step; t += step) {
        x_t = (0.5 * Math.cos(0.5 * t)) - Math.sin(t)
        vectorValue.push(x_t)
    }

    for (let i = 0; i < p; i++) {
        VectorX.push(vectorValue[vectorValue.length - 1 - p + i])
    }

    for (let t = b + step; t <= (2 * b) - a + step; t += step) {
        x_t = (0.5 * Math.cos(0.5 * t)) - Math.sin(t)
        VectorX.push(x_t)
    }

    const stepEraSlidingWindow = w => {

        let x_n = []
        for (let i = 0; i < p; i++) {
            x_n.push(vectorValue[vectorValue.length - 1 - p + i])
        }

        var sum = 0

        for (let n = p; n < VectorX.length; n++) {
            let xn_ = 0
            for (let k = 1; k < p; k++) {
                xn_ += w[k] * VectorX[n - p + k - 1]
            }
            x_n.push(xn_)
            let beta = VectorX[n] - x_n[n]
            for (let i = 1; i < p + 1; i++) {
                w[i] += learning_rate * beta * VectorX[n - p + i]
            }
            sum += (beta * beta)
        }

        return {
            weight: w,
            epsilon: Math.pow(sum, 0.5),
            x: x_n
        }
    }

    let methodSlidingWindow = weight => {

        let k = 0,
            error = 100,
            result = {}

        for (let i = 0; i < countEpoch; i++) {
            result = stepEraSlidingWindow(weight)
            let minError = result.epsilon
            if (minError < error) error = minError
            else break
            k++
            //console.log(result.epsilon)
            weight = result.weight
        }

        return {
            predictedValues: result.x,
            epochCount: k,
            weight: weight,
            minError: error
        }
    }

    let result = methodSlidingWindow(w)

    /*console.log("weight ", result.weight,
        "\n обучающая выборка ", VectorX,
        "\n спрогнозированные значения", result.predictedValues,
        "\n кол-во эпох", result.epochCount,
        "\n минимальная ошибка при заданном \'p'", result.minError)*/
    console.log(result.minError)
}

let pVector = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
let a = 0,
    b = 4,
    N = 20

for (let i = 0; i < pVector.length; i++) {
    slidingWindow(a, b, pVector[i], N, 0.5, 10000)
}

for (let i = 0; i < 1; i += 0.01) {
    slidingWindow(a, b, 6, N, i, 10000)
}

for (let countEpoch = 10; countEpoch < 500; countEpoch += 10) {
    slidingWindow(a, b, 6, N, 0.5, countEpoch)
}