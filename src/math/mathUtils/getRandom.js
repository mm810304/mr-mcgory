export function getRandomInt(max) {
    const rawNum = Math.floor(Math.random() * max);
    const posOrNeg = Math.random()  > .5 ? 1 : -1;
    const finalNum = rawNum * posOrNeg;
    return finalNum;
}

export function getRandomPositiveNum(int) {
return Math.floor(Math.random() * int);
}