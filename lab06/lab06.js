/* Алгоритмы кластерного анализа данных */

let canvas = document.getElementById('lab06')
let ctx = canvas.getContext('2d');

class Point {
    
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    print() {
        console.log("x= " + this.x + 'y= ' + this.y)
    }
}

function calcDistanceEvklid(vectorXCoordinate, vectorYCoordinate) {

    let vectorCalcDistanceY1 = [], vectorCalcDistanceY2 = []
    for (let i = 0; i < vectorYCoordinate.length; i++) {
        for (let j = 0; j < vectorXCoordinate.length; j++) {
            if (i === 0) {
                let p = Math.sqrt(((vectorYCoordinate[i].x - vectorXCoordinate[j].x) ** 2)
                    + ((vectorYCoordinate[i].y - vectorXCoordinate[j].y) ** 2))
                vectorCalcDistanceY1.push(p)
            }
            if (i === 1) {
                let p = Math.sqrt(((vectorYCoordinate[i].x - vectorXCoordinate[j].x) ** 2)
                    + ((vectorYCoordinate[i].y - vectorXCoordinate[j].y) ** 2))
                vectorCalcDistanceY2.push(p)
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
                let p = Math.abs(vectorYCoordinate[i].x - vectorXCoordinate[j].x)
                    + Math.abs(vectorYCoordinate[i].y - vectorXCoordinate[j].y)
                    vectorCalcDistanceY1.push(p)
            }
            if (i === 1) {
                let p = Math.abs(vectorYCoordinate[i].x - vectorXCoordinate[j].x)
                    + Math.abs(vectorYCoordinate[i].y - vectorXCoordinate[j].y)
                vectorCalcDistanceY2.push(p)
            }
        }
    }

    return {
        Y1Vector: vectorCalcDistanceY1,
        Y2Vector: vectorCalcDistanceY2
    }
}

let Y1Cluster = [], Y2Cluster = []
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

    return [x_Y1 / Y1_.length, y_Y1 / Y1_.length, x_Y2 / Y2_.length, y_Y2 / Y2_.length]

}

function kMeansAlgorithmEuclidean(vectorXCoordinate, vectorYCoordinate) {

    let pVector = calcDistanceEvklid(vectorXCoordinate, vectorYCoordinate)
    let minDistanceCluster = calcMinDistance(pVector.Y1Vector,
        pVector.Y2Vector, vectorXCoordinate)

    return centerOfMassCalc(minDistanceCluster.Y1_, minDistanceCluster.Y2_)

}

function kMeansAlgorithmManhattan(vectorXCoordinate, vectorYCoordinate) {

    let pVector = calcDistanceManhattan(vectorXCoordinate, vectorYCoordinate)
    let minDistanceCluster = calcMinDistance(pVector.Y1Vector,
        pVector.Y2Vector, vectorXCoordinate)

    return centerOfMassCalc(minDistanceCluster.Y1_, minDistanceCluster.Y2_)

}

let position_x = 0,
    cluster = 0,
    points = [],
    clusterPoints = []


canvas.addEventListener("click", event => {

    if (position_x === 0) {
        ctx.fillStyle = "#000"
        let x1 = event.offsetX
        let y1 = event.offsetY
        let point = new Point(x1, y1)
        points.push(point)
        console.log(point)
        ctx.fillRect(x1, y1, 3, 3)
        position_x = 1
    } else if (position_x === 1) {
        let x1 = event.offsetX
        let y1 = event.offsetY
        let point = new Point(x1, y1)
        points.push(point)
        console.log(point)
        ctx.fillRect(x1, y1, 3, 3)
        position_x = 2
    } else if (position_x === 2) {
        let x1 = event.offsetX
        let y1 = event.offsetY
        let point = new Point(x1, y1)
        points.push(point)
        console.log(point)
        ctx.fillRect(x1, y1, 3, 3)
        position_x = 3
    } else if (position_x === 3) {
        let x1 = event.offsetX
        let y1 = event.offsetY
        let point = new Point(x1, y1)
        points.push(point)
        console.log(point)
        ctx.fillRect(x1, y1, 3, 3)
        position_x = 4
    } else if (position_x === 4) {
        let x1 = event.offsetX
        let y1 = event.offsetY
        let point = new Point(x1, y1)
        points.push(point)
        console.log(point)
        ctx.fillRect(x1, y1, 3, 3)
        position_x = 5
    } else if (position_x === 5) {
        let x1 = event.offsetX
        let y1 = event.offsetY
        let point = new Point(x1, y1)
        points.push(point)
        console.log(point)
        ctx.fillRect(x1, y1, 3, 3)
        position_x = 6
    } else if (position_x === 6) {
        let x1 = event.offsetX
        let y1 = event.offsetY
        let point = new Point(x1, y1)
        points.push(point)
        console.log(point)
        ctx.fillRect(x1, y1, 3, 3)
        position_x = 7
    } else if (cluster === 0) {
        ctx.fillStyle = "#000"
        let x1 = event.offsetX, y1 = event.offsetY
        let point = new Point(x1, y1)
        clusterPoints.push(point)
        console.log(point)
        ctx.fillRect(x1, y1, 8, 8)
        cluster = 1
    } else if (cluster === 1) {
        let x1 = event.offsetX, y1 = event.offsetY
        let point = new Point(x1, y1)
        clusterPoints.push(point)
        console.log(point)
        ctx.fillRect(x1, y1, 8, 8)
        cluster = 2
    } else if (cluster === 2) {

        let searchCenterEuclidean = kMeansAlgorithmEuclidean(points, clusterPoints)
        let searchCenterManhattan = kMeansAlgorithmManhattan(points, clusterPoints)

        ctx.fillStyle = "#ff0000"
        ctx.fillRect(searchCenterEuclidean[0], searchCenterEuclidean[1], 8, 8)
        ctx.fillRect(searchCenterEuclidean[2], searchCenterEuclidean[3], 8, 8)

        ctx.fillStyle = "#0400ff"
        ctx.fillRect(searchCenterManhattan[0], searchCenterManhattan[1], 8, 8)
        ctx.fillRect(searchCenterManhattan[2], searchCenterManhattan[3], 8, 8)

        for (let i = 0; i < Y1Cluster.length; i++) {
            ctx.fillStyle = '#97e004'
            ctx.fillRect(Y1Cluster[i].x, Y1Cluster[i].y, 3, 3)
        }

        for (let i = 0; i < Y2Cluster.length; i++) {
            ctx.fillStyle = '#b700ff'
            ctx.fillRect(Y2Cluster[i].x, Y2Cluster[i].y, 3, 3)
        }
        cluster = 3
    }
})
