/* Применение однослойной нейронной сети с линейной функцией активации для прогнозирования временных рядов */

const slidingWindow = (a, b, p, N, norma) => {

    let w = []
    for (let i = 0; i < p + 1; i++) {
        w.push(0)
    }

    const step = (b - a) / N
    let vectorValue = []
    let VectorX = []
    let x_t

    for (let t = a; t < b + step; t += step) {
        x_t = (0.5 * Math.cos(0.5 * t)) - Math.sin(t)
        vectorValue.push(x_t)
    }

    for (let i = 0; i < p; i++) {
        VectorX.push(vectorValue[16 + i])
    }

    for (let t = b + step; t <= (2 * b) - a + step; t += step) {
        x_t = (0.5 * Math.cos(0.5 * t)) - Math.sin(t)
        VectorX.push(x_t)
    }


    const stepEraSlidingWindow = w => {
        let x_n = []
        for (let i = 0; i < p; i++) {
            x_n.push(vectorValue[16 + i])
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
                w[i] += norma * beta * VectorX[n - p + i]
            }
            sum += (beta * beta)
        }

        return {
            weight: w,
            epsilon: Math.pow(sum, 0.5),
            x: x_n
        }
    }

    let eraSlidingWindow = w => {
        let k = 0, error = 10
        let result = {}
        for (let i = 0; i < 5000; i++) {
            result = stepEraSlidingWindow(w)
            let minError = result.epsilon
            k++
            if (minError < error) error = minError
            else break
            console.log(result.epsilon)
            w = result.weight
        }

        return {
            res: result.x,
            k: k,
            w: w
        }
    }
    let result = eraSlidingWindow(w)
    console.log(result.w)
    console.log("VectorX", VectorX, "\nresult", result.res)
    console.log(result.k)
}

slidingWindow(0, 4, 4, 20, 0.5)