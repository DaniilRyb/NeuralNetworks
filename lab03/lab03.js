let p = 4 // размер окна
let w = [0, 0, 0, 0, 0] // веса
const a = 0
const b = 4
const N = 20
let step = (b - a) / N
let vectorValue = []
let VectorX = []
let x_t
const norma = 0.3


for (let t = a; t < b + step; t += step) {
  x_t = (0.5 * Math.cos(0.5 * t)) - Math.sin(t)
  vectorValue.push(x_t)

}
for (let i = 0; i < 4; i++) {
  VectorX.push(vectorValue[16 + i])
}

for (let t = b + step; t <= (2 * b) - a + step; t += step) {
  x_t = (0.5 * Math.cos(0.5 * t)) - Math.sin(t)
  VectorX.push(x_t)
}


const eraSlidingWindow = w => {
  let x_n = []
  for (let i = 0; i < 4; i++) {
    x_n.push(vectorValue[16 + i])
  }
  var sum = 0
  for (let n = p; n < VectorX.length; n++) {
    let xn_ = 0
    for (let k = 1; k < p; k++) {
      xn_ += w[k] * VectorX[n - p + k - 1]
    }
    //xn_ += w[0]
    x_n.push(xn_)
    let beta = VectorX[n] - x_n[n]
    w[1] += norma * beta * VectorX[n - 3]
    w[2] += norma * beta * VectorX[n - 2]
    w[3] += norma * beta * VectorX[n - 1]
    w[4] += norma * beta * VectorX[n]
    sum += (beta * beta)
  }

  return {
    weight: w,
    epsilon: Math.pow(sum, 0.5),
    x: x_n
  }
}


let prognoz = w => {
  let k = 0
  let result = eraSlidingWindow(w)
  for (let i = 0; i < 1000; i++) {
    result = eraSlidingWindow(w)
    w = result.weight
    result = eraSlidingWindow(w)
    if (result.epsilon < 0.16) break
    console.log(i + " " + result.epsilon)
    k++
  }

  return {
    res: result.x,
    k: k
  }
}

let res = prognoz(w)
console.log(res)
console.log(VectorX)