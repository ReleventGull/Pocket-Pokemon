function arrayDiff(a, b) {
    let leftPointer = 0
    let rightPointer = 0
    //[2]  [1]
    while(rightPointer < b.length) {
      if (a[leftPointer] == b[rightPointer]) {
        a.splice(leftPointer, 1)
      }else if (leftPointer == a.length - 1) {
        rightPointer ++
        leftPointer = 0
      }else {
        leftPointer ++
      }
    }
    return a
  }

  console.log(arrayDiff([1,2,3, 3, 4, 6, 7, 8, 98, 8, 8, 8, 8, 8], [1,2]))

  console.log([1,2,3,3].indexOf(3))