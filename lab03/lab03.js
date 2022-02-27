// 15 вариант

let N = 20
let p = 4 // размер окна
let w = [0, 0, 0, 0, 0] // веса
let a = 0
let b = 4
let step = (b - a) / N
let bEnd = 2 * b - a
let vectorValue = []
let valueY;

for (let i = a; i <= b; i += step) {
  valueY = 0.5 * Math.cos(0.5 * i) - Math.sin(i)
  vectorValue.push({ x: i, y: valueY })

}

for (let i = b; i < bEnd; i += step) {
  for (let j = 0; j < p; j++) {

  }
}


