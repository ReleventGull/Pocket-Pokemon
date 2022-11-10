let array = new Array(10)

let otherArray = [[],[],[],[],[],[],[],[],[],[],[],[],[]]


console.log(array.length)
console.log(otherArray.length)


otherArray.forEach(thing => thing ? console.log("Hi (Other)!"): null)
array.forEach(thing => thing ? console.log("Hi!"): null)