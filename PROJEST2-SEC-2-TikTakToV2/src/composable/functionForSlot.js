const shuffle = () => {
    // random number 0 to 8
    const slot1 = Math.floor(Math.random() * 9)
    const slot2 = Math.floor(Math.random() * 9)
    const slot3 = Math.floor(Math.random() * 9)
    const allSlot = [slot1, slot2, slot3]
    return allSlot
}

const testWin = (array) => {
    const slot1 = array[0]
    const slot2 = array[1]
    const slot3 = array[2]

    if (((slot1 === slot2 && slot2 === slot3) ||
        (slot1 === slot2 && slot3 === 8) ||
        (slot1 === slot3 && slot2 === 8) ||
        (slot2 === slot3 && slot1 === 8) ||
        (slot1 === slot2 && slot1 === 8) ||
        (slot1 === slot3 && slot1 === 8) ||
        (slot2 === slot3 && slot2 === 8))) {
        return 'YOU WIN!'
    } else {
        return 'YOU LOSE!'
    }
}

const countScore = (array) => {
    const slot1 = array[0]
    const slot2 = array[1]
    const slot3 = array[2]

    // SAME 3
    if (slot1 === slot2 && slot2 === slot3 && slot1 === 0) {
        return 100
    }
    if (slot1 === slot2 && slot2 === slot3 && slot1 === 1) {
        return 200
    }
    if (slot1 === slot2 && slot2 === slot3 && slot1 === 2) {
        return 300
    }
    if (slot1 === slot2 && slot2 === slot3 && slot1 === 3) {
        return 400
    }
    if (slot1 === slot2 && slot2 === slot3 && slot1 === 4) {
        return 500
    }
    if (slot1 === slot2 && slot2 === slot3 && slot1 === 5) {
        return 600
    }
    if (slot1 === slot2 && slot2 === slot3 && slot1 === 6) {
        return 700
    }
    if (slot1 === slot2 && slot2 === slot3 && slot1 === 7) {
        return 800
    }
    if (slot1 === slot2 && slot2 === slot3 && slot1 === 8) {
        return 1000
    }

    // SAME 2
    if (((slot1 === slot2 && slot3 === 8) && slot1 === 0) || ((slot1 === slot3 && slot2 === 8) && slot1 === 0) || ((slot2 === slot3 && slot1 === 8) && slot2 === 0)) {
        return 10
    }
    if (((slot1 === slot2 && slot3 === 8) && slot1 === 1) || ((slot1 === slot3 && slot2 === 8) && slot1 === 1) || ((slot2 === slot3 && slot1 === 8) && slot2 === 1)) {
        return 20
    }
    if (((slot1 === slot2 && slot3 === 8) && slot1 === 2) || ((slot1 === slot3 && slot2 === 8) && slot1 === 2) || ((slot2 === slot3 && slot1 === 8) && slot2 === 2)) {
        return 30
    }
    if (((slot1 === slot2 && slot3 === 8) && slot1 === 3) || ((slot1 === slot3 && slot2 === 8) && slot1 === 3) || ((slot2 === slot3 && slot1 === 8) && slot2 === 3)) {
        return 40
    }
    if (((slot1 === slot2 && slot3 === 8) && slot1 === 4) || ((slot1 === slot3 && slot2 === 8) && slot1 === 4) || ((slot2 === slot3 && slot1 === 8) && slot2 === 4)) {
        return 50
    }
    if (((slot1 === slot2 && slot3 === 8) && slot1 === 5) || ((slot1 === slot3 && slot2 === 8) && slot1 === 5) || ((slot2 === slot3 && slot1 === 8) && slot2 === 5)) {
        return 60
    }
    if (((slot1 === slot2 && slot3 === 8) && slot1 === 6) || ((slot1 === slot3 && slot2 === 8) && slot1 === 6) || ((slot2 === slot3 && slot1 === 8) && slot2 === 6)) {
        return 70
    }
    if (((slot1 === slot2 && slot3 === 8) && slot1 === 7) || ((slot1 === slot3 && slot2 === 8) && slot1 === 7) || ((slot2 === slot3 && slot1 === 8) && slot2 === 7)) {
        return 80
    }
    // SAME 77
    if ((slot1 === slot2 && slot1 === 8) || (slot1 === slot3 && slot1 === 8) || (slot2 === slot3 && slot2 === 8)) {
        return 500
    }
    else {
        return 0
    }
}

export { shuffle, testWin, countScore }
