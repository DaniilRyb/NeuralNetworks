/*
Алгоритмы кластерного анализа данных.
Исследовать применение основных алгоритмов кластерного анализа,
включая их модификации, на примере различных типов данных.
*/

let canvas = document.getElementById('lab06'),
    ctx = canvas.getContext('2d'),
    position_x = 0,
    cluster = 0,
    points = [],
    clusterPoints = []

function calcDistanceEvklid(vectorXCoordinate, vectorYCoordinate) {

    let vectorCalcDistanceY1 = [], vectorCalcDistanceY2 = []
    for (let i = 0; i < vectorYCoordinate.length; i++) {
        for (let j = 0; j < vectorXCoordinate.length; j++) {
            if (i === 0) {
                let pij = Math.sqrt(((vectorYCoordinate[i].x - vectorXCoordinate[j].x) ** 2)
                    + ((vectorYCoordinate[i].y - vectorXCoordinate[j].y) ** 2))
                vectorCalcDistanceY1.push(pij)
            }
            if (i === 1) {
                let pij = Math.sqrt(((vectorYCoordinate[i].x - vectorXCoordinate[j].x) ** 2)
                    + ((vectorYCoordinate[i].y - vectorXCoordinate[j].y) ** 2))
                vectorCalcDistanceY2.push(pij)
            }
        }
    }

    return {
        Y1Vector: vectorCalcDistanceY1,
        Y2Vector: vectorCalcDistanceY2
    }
}

function calcDistanceManhattan(vectorXCoordinate, vectorYCoordinate) {

    let vectorCalcDistanceY1 = [], vectorCalcDistanceY2 = []
    for (let i = 0; i < vectorYCoordinate.length; i++) {
        for (let j = 0; j < vectorXCoordinate.length; j++) {
            if (i === 0) {
                let pij = Math.abs(vectorYCoordinate[i].x - vectorXCoordinate[j].x)
                    + Math.abs(vectorYCoordinate[i].y - vectorXCoordinate[j].y)
                vectorCalcDistanceY1.push(pij)
            }
            if (i === 1) {
                let pij = Math.abs(vectorYCoordinate[i].x - vectorXCoordinate[j].x)
                    + Math.abs(vectorYCoordinate[i].y - vectorXCoordinate[j].y)
                vectorCalcDistanceY2.push(pij)
            }
        }
    }

    return {
        Y1Vector: vectorCalcDistanceY1,
        Y2Vector: vectorCalcDistanceY2
    }
}

let Y1Cluster = [],
    Y2Cluster = []

function calcMinDistance(Y1, Y2, vectorX) {
    let Y1_ = [], Y2_ = []
    for (let i = 0; i < Y1.length; i++) {
        Y1[i] < Y2[i] ? Y1_.push(vectorX[i]) : Y2_.push(vectorX[i])
    }
    Y1Cluster = Y1_
    Y2Cluster = Y2_
    return {
        Y1_,
        Y2_
    }
}

function centerOfMassCalc(Y1_, Y2_) {

    let vectorObj = []
    let x_Y1 = 0, y_Y1 = 0,
        x_Y2 = 0, y_Y2 = 0

    for (let i = 0; i < Y1_.length; i++) {
        x_Y1 += Y1_[i].x
        y_Y1 += Y1_[i].y
    }
    for (let j = 0; j < Y2_.length; j++) {
        x_Y2 += Y2_[j].x
        y_Y2 += Y2_[j].y
    }

    let Y1Point = {x: x_Y1 / Y1_.length, y: y_Y1 / Y1_.length}
    let Y2Point = {x: x_Y2 / Y2_.length, y: y_Y2 / Y2_.length}

    vectorObj.push(Y1Point)
    vectorObj.push(Y2Point)

    return vectorObj
}

function kMeansAlgorithmEvklid(vectorXCoordinate, vectorYCoordinate) {
    let pVector = calcDistanceEvklid(points, vectorYCoordinate)
    let minDistanceCluster = calcMinDistance(pVector.Y1Vector,
            pVector.Y2Vector, points),
        center = centerOfMassCalc(minDistanceCluster.Y1_, minDistanceCluster.Y2_)
    return center
}

function kMeansAlgorithmManhattan(vectorXCoordinate, vectorYCoordinate) {

    let pVector = calcDistanceManhattan(vectorXCoordinate, vectorYCoordinate)
    let minDistanceCluster = calcMinDistance(pVector.Y1Vector,
        pVector.Y2Vector, vectorXCoordinate)

    return centerOfMassCalc(minDistanceCluster.Y1_, minDistanceCluster.Y2_)

}

let firstEvklid, firstManhattan
canvas.addEventListener("click", e => {


    if (position_x === 0) {
        ctx.fillStyle = "#000"
        let x = e.offsetX
        let y = e.offsetY
        let point = {x, y}
        points.push(point)
        console.log(point)
        ctx.fillRect(x, y, 3, 3)
        position_x = 1
    } else if (position_x === 1) {
        let x = e.offsetX
        let y = e.offsetY
        let point = {x, y}
        points.push(point)
        console.log(point)
        ctx.fillRect(x, y, 3, 3)
        position_x = 2
    } else if (position_x === 2) {
        let x = e.offsetX
        let y = e.offsetY
        let point = {x, y}
        points.push(point)
        console.log(point)
        ctx.fillRect(x, y, 3, 3)
        position_x = 3
    } else if (position_x === 3) {
        let x = e.offsetX
        let y = e.offsetY
        let point = {x, y}
        points.push(point)
        console.log(point)
        ctx.fillRect(x, y, 3, 3)
        position_x = 4
    } else if (position_x === 4) {
        let x = e.offsetX
        let y = e.offsetY
        let point = {x, y}
        points.push(point)
        console.log(point)
        ctx.fillRect(x, y, 3, 3)
        position_x = 5
    } else if (position_x === 5) {
        let x = e.offsetX
        let y = e.offsetY
        let point = {x, y}
        points.push(point)
        console.log(point)
        ctx.fillRect(x, y, 3, 3)
        position_x = 6
    } else if (position_x === 6) {
        let x = e.offsetX
        let y = e.offsetY
        let point = {x, y}
        points.push(point)
        console.log(point)
        ctx.fillRect(x, y, 3, 3)
        position_x = 7
    } else if (cluster === 0) {
        ctx.fillStyle = "#000"
        let x = e.offsetX
        let y = e.offsetY
        let point = {x, y}
        clusterPoints.push(point)
        console.log(point)
        ctx.fillRect(x, y, 8, 8)
        cluster = 1
    } else if (cluster === 1) {
        let x = e.offsetX
        let y = e.offsetY
        let point = {x, y}
        clusterPoints.push(point)
        console.log(point)
        ctx.fillRect(x, y, 8, 8)
        cluster = 2
    } else if (cluster === 2) {

        ctx.fillStyle = "#ff0000"
        firstEvklid = kMeansAlgorithmEvklid(points, clusterPoints)
        firstManhattan = kMeansAlgorithmManhattan(points, clusterPoints)

        for (let i = 0; i < firstEvklid.length; i++) {
            ctx.fillRect(Math.round(firstEvklid[i].x), Math.round(firstEvklid[i].y), 8, 8)
        }

        for (let i = 0; i < firstManhattan.length; i++) {
            ctx.fillRect(Math.round(firstManhattan[i].x), Math.round(firstManhattan[i].y), 8, 8)
        }

        ctx.fillStyle = "#000bff"
        let secondEvklid = kMeansAlgorithmEvklid(points, firstEvklid)
        let secondManhattan = kMeansAlgorithmManhattan(points, firstManhattan)

        for (let i = 0; i < secondEvklid.length; i++) {
            ctx.fillRect(Math.round(secondEvklid[i].x), Math.round(secondEvklid[i].y), 8, 8)
        }

        for (let i = 0; i < secondManhattan.length; i++) {
            ctx.fillRect(Math.round(secondManhattan[i].x), Math.round(secondManhattan[i].y), 8, 8)
        }

        ctx.fillStyle = "#49ff00"
        let thirdEvklid = kMeansAlgorithmEvklid(points, secondEvklid)
        let thirdManhattan = kMeansAlgorithmManhattan(points, secondManhattan)

        for (let i = 0; i < thirdEvklid.length; i++) {
            ctx.fillRect(Math.round(thirdEvklid[i].x), Math.round(thirdEvklid[i].y), 8, 8)
        }


        for (let i = 0; i < thirdManhattan.length; i++) {
            ctx.fillRect(Math.round(thirdManhattan[i].x), Math.round(thirdManhattan[i].y), 8, 8)
        }

        ctx.fillStyle = "#dc1b5e"
        let fourthEvklid = kMeansAlgorithmEvklid(points, thirdEvklid)
        let fourthManhattan = kMeansAlgorithmManhattan(points, thirdManhattan)

        for (let i = 0; i < fourthEvklid.length; i++) {
            ctx.fillRect(Math.round(fourthEvklid[i].x), Math.round(fourthEvklid[i].y), 8, 8)
        }

        for (let i = 0; i < fourthManhattan.length; i++) {
            ctx.fillRect(Math.round(fourthManhattan[i].x), Math.round(fourthManhattan[i].y), 8, 8)
        }

        console.log(firstEvklid)
        console.log(secondEvklid)
        console.log(firstEvklid)
        console.log(fourthEvklid)
        console.log('-------------------------------------------')
        console.log(firstManhattan)
        console.log(secondManhattan)
        console.log(thirdManhattan)
        console.log(fourthManhattan)

        cluster = 3
    }

    for (let i = 0; i < Y1Cluster.length; i++) {
        ctx.fillStyle = '#97e004'
        ctx.fillRect(Y1Cluster[i].x, Y1Cluster[i].y, 3, 3)
    }

    for (let i = 0; i < Y2Cluster.length; i++) {
        ctx.fillStyle = '#b700ff'
        ctx.fillRect(Y2Cluster[i].x, Y2Cluster[i].y, 3, 3)
    }

})
