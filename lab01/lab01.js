// 15 вариант
const norma = 0.3;
const x0 = 1;
let N = 16; // кол-во всех возможных значений векторов
w = [0, 0, 0, 0, 0]; // начальные веса
let tTeacher = [1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0]; // значение t на наборах переменных


// значения всех возможных наборов аргументов
let X1 = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1];
let X2 = [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1];
let X3 = [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1];
let X4 = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1];

// пороговая ФА
function thresholdFunc(net) {
    if (net > 0) {
        return 1;
    } else return 0;
}

// логистическая ФА
function logisticFunc(net) {
    if (net >= 0.5) {
        return 1;
    } else return 0;
}

// hyperbolic tangent function
function hyperbolicTangentOut(net) {
    let out = 0;
    out =  (((Math.exp(2 * net) - 1) /
        (Math.exp(2 * net) + 1)) + 1) * 0.5;
    return out;
}

function CalculateNet(x1, x2, x3, x4, w) {
    let net = 0;
    net += x1 * w[1] + x2 * w[2] + x3 * w[3] + x4 * w[4] + w[0];
    return net;
}

Array.prototype.shuffle = function () {
    let input = this;

    for (let i = input.length - 1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let itemAtIndex = input[randomIndex];
        //console.log('itemAtIndex', itemAtIndex);
        //console.log('input[i]', input[i]);
        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
}

let indexArr = [];
for (let i = 0; i < N; i++) {
    indexArr.push(i);
}

let indexArrRandom = indexArr.shuffle();
//console.log(indexArrRandom);

function HammingDistance(t, y) { // считаем расстояние Хэмминга
    let E = 0;
    for (let i = 0; i < t.length; i++) {
        if (t[i] !== y[i]) {
            E++;
        }
    }
    return E;
}

// ф-ия для перебора всех значений

/*
function stepsNeuralNetwork(X1, X2, X3, X4, N, w) {
    let y = 0;
    let outputVector = [];
    for (let i = 0; i < N; i++) {
        let x1 = X1[i];
        let x2 = X2[i];
        let x3 = X3[i];
        let x4 = X4[i];
        let net = CalculateNet(x1, x2, x3, x4, w);
        //y = thresholdFunc(net);
        let out = hyperbolicTangentOut(net);
        y = logisticFunc(net);
        outputVector.push(y);
        let t = tTeacher[i];
        let delta = t - y;
        if (delta !== 0) {
            w[0] += norma * delta * x0;
            w[1] += norma * delta * x1;
            w[2] += norma * delta * x2;
            w[3] += norma * delta * x3;
            w[4] += norma * delta * x4;
        } else {
            w[0] = w[0];
            w[1] = w[1];
            w[2] = w[2];
            w[3] = w[3];
            w[4] = w[4];
        }
    }
    let countErrorInCurrentEra = HammingDistance(tTeacher, outputVector);

    let eraObject = {
        weight: w,
        E: countErrorInCurrentEra,
        y: outputVector
    };
    return eraObject;

}
*/

// ф-ия для случайной выборки
function stepsNeuralNetwork(X1, X2, X3, X4, N, w) {
    let y = 0;
    let t = 0;
    let outputCurrentVector = [];
    let outputVector = [];

    let countErrorInCurrentEra;

    for (let i = 0; i < N; i++) {
        let x1 = X1[indexArrRandom[i]];
        let x2 = X2[indexArrRandom[i]];
        let x3 = X3[indexArrRandom[i]];
        let x4 = X4[indexArrRandom[i]];
        let net = CalculateNet(x1, x2, x3, x4, w);
        let out = hyperbolicTangentOut(net);
        y = thresholdFunc(out);
        // y = logisticFunc(net);
        outputCurrentVector.push(y);
        t = tTeacher[indexArrRandom[i]];
        outputVector.push(t);
        let delta = t - y;
        if (delta !== 0) {
            w[0] += norma * delta * x0;
            w[1] += norma * delta * x1;
            w[2] += norma * delta * x2;
            w[3] += norma * delta * x3;
            w[4] += norma * delta * x4;
        } else {
            w[0] = w[0];
            w[1] = w[1];
            w[2] = w[2];
            w[3] = w[3];
            w[4] = w[4];
        }
    }

    countErrorInCurrentEra = HammingDistance(outputVector, outputCurrentVector);

    return  {
        weight: w,
        E: countErrorInCurrentEra,
        y: outputCurrentVector
    };

}

// ф-ия для случайной выборки
function eraNeuralNetwork(weights) {
    let k = 0;
    let weightsNew = stepsNeuralNetwork(X1, X2, X3, X4, N, weights);
    while (weightsNew.E !== 0) {
        weightsNew = stepsNeuralNetwork(X1, X2, X3, X4, N, weights);
        console.log(weightsNew, " эпоха №", k);
        weights = weightsNew.weight;
        k++;
    }
}

// ф-ия для перебора всех значений
/*
function eraNeuralNetwork(weights) {
    let k = 0;
    let weightsNew = stepsNeuralNetwork(X1, X2, X3, X4, N, weights);
    while (weightsNew.E !== 0) {
        weightsNew = stepsNeuralNetwork(X1, X2, X3, X4, N, weights);
        console.log(weightsNew, " эпоха №", k);
        weights = weightsNew.weight;
        k++;
    }
*/

eraNeuralNetwork(w);