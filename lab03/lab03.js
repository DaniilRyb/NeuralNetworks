let p = 4 // размер окна
let w = [0, 0, 0, 0, 0] // веса
let a = 0
let b = 4
let N = 20
let step = (b - a) / N
let vectorValue = []
let x = []
let x_t
let norma = 0.3

for (let t = a; t < b + step; t += step) {
  x_t = (0.5 * Math.cos(0.5 * t)) - Math.sin(t)
  vectorValue.push(x_t)

}
for (let i = 0; i < 4; i++) {
  x.push(vectorValue[16 + i])
}

for (let t = b + step; t <= (2 * b) - a + step; t += step) {
  x_t = (0.5 * Math.cos(0.5 * t)) - Math.sin(t)
  x.push(x_t)

}

/*
console.log("Вектор реальных значений ф-ии")
for (let i = 0; i < x.length; i++) {
  console.log(i, x[i])
}
*/

const era = w => {
  let epsilon, VectorP = [], sum = 0
  for (let n = p; n < x.length; n++) {
    let summa = 0, x_n = 0, VectorPrognoz = [];
    for (let k = 1; k <= p; k++) {
      x_n += w[k] * x[n - p + k - 1]
      x_n += w[0]
    }
    console.log( n + " x_n = " + x_n,'x[n] = ' + x[n] )

    let beta = x[n] - x_n
    //console.log("beta = " + beta)
    w[0] += norma * beta
    w[1] += norma * beta * x[n - 3]
    w[2] += norma * beta * x[n - 2]
    w[3] += norma * beta * x[n - 1]
    w[4] += norma * beta * x[n]
    sum = summa += beta * beta
    VectorP = VectorPrognoz.push(x_n)
  }
  //console.log("сумма эпохи = " + sum)

  epsilon = Math.pow(sum, 0.5)

  return {
    weight: w,
    epsilon: epsilon,
    predictedX: VectorP
  }
}

let eraSlidingWindow = {}
let k = 0
const timeSeriesForecast = w => {
  for (let i = 0; i < 1; i++) {
    eraSlidingWindow = era(w)
    //console.log("текущая ошибка " + i + " = " +  eraSlidingWindow.epsilon)
    w = eraSlidingWindow.weight
    /*if (eraSlidingWindow.epsilon < 0.5) {
      break
    }*/
  }
}
timeSeriesForecast(w)


