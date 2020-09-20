export default function getWalls(w, h) {
    const blockSize = 50;
    const blockSizeOffSet = -(blockSize / 2);

    return {
        topX: (w / 2),
        topY: blockSizeOffSet,
        topWidth: w,
        topHeight: blockSize,
        bottomX: (w / 2),
        bottomY: h - (blockSizeOffSet + 5),
        bottomWidth: w,
        bottomHeight: blockSize,
        rightX: w - blockSizeOffSet,
        rightY: (h / 2),
        rightWidth: blockSize,
        rightHeight: h,
        leftX: blockSizeOffSet,
        leftY: (h / 2),
        leftWidth: blockSize,
        leftHeight: h
    }
}

