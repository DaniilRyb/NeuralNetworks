class networkHopfield {

    constructor(x) {

        this.x = x
        this.w = this.x[0].map(line => this.x[0].map(value => 0));

        this.x.forEach((example, index) => {
                example.forEach((value, indexValue) => {
                        for (let i = 0; i < example.length; i++) {
                            this.w[indexValue][i] += this.sign(value * example[i]);
                        }
                    }
                )
            }
        )

        //this.w = this.w.map(line => line.map(value => 1 / this.w.length * value))
        for (let i = 0; i < this.w.length; i++) {
            this.w[i][i] = 0;
        }
    }

    sign(x) {
        return (x < 0) ? -1 : 1;
    }

    in(y) {
        let result = -1;
        this.x.forEach((values, index) => {
                let coincidence = 0;
                values.forEach((value, indexValue) => {
                        coincidence += (value === y[indexValue]) ? 1 : 0;
                    }
                )
                if (coincidence === y.length) {
                    result = index;
                } else {
                    coincidence = 0;
                }
            }
        )
        return result;
    }

    result(y) {
        let i = 0;
        while (this.in(y) < 0 && i < 5) {
            y = y.map((value, index) => {
                    let y1 = 0;
                    for (let i = 0; i < y.length; i++) {
                        y1 += y[i] * this.w[index][i];
                    }
                    return this.sign(y1);
                }
            )
            i++;
        }
        return this.in(y);
    }

    calcVectorCheck(w_network, inputVector) {
        let calcMatrix = []
        for (let i = 0; i < w_network.length; i++) {
            let currentElement = 0
            for (let j = 0; j < inputVector.length; j++) {
                currentElement += inputVector[j] * w_network[i][j]
            }
            calcMatrix.push(currentElement)
        }
        return calcMatrix.map(x => x < 0 ? -1 : 1)
    }
}

let input = [[1, 1, 1, 1, 1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1],
    [-1, -1, -1, -1, -1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1],
    [1, 1, 1, -1, 1, 1 - 1, 1, -1, 1, 1, 1, 1, 1, 1]]


let network = new networkHopfield(input) // создаем объект типа РНС Хопфилда

console.table(network.w)
console.table(network.x)

let checkZero = network.calcVectorCheck(network.w, [1, 1, 1, 1, 1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1])
console.table(checkZero)

let checkOne = network.calcVectorCheck(network.w, [-1, -1, -1, -1, -1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1])
console.table(checkOne)

let checkNine = network.calcVectorCheck(network.w, [1, 1, 1, -1, 1, 1 -1, 1, -1, 1, 1, 1, 1, 1, 1])
console.table(checkNine)

console.log('------------результаты работы РНС при искаженных паттернах-------------------\n')

// исказим 0
let distortedZero = [1, 1, -1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1]
let checkErrorZero = network.calcVectorCheck(network.w, distortedZero)
console.table(checkErrorZero)

// исказим 1
let distortedOne = [-1, -1, -1, -1, -1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1]
let checkErrorOne = network.calcVectorCheck(network.w, distortedOne)
console.table(checkErrorOne)

// исказим 9
let distortedNine = [1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
let checkErrorNine = network.calcVectorCheck(network.w, distortedNine)
console.table(checkErrorNine)