let arr = [{a:1,b:'q'},{a:2,b:'q'},{a:3,b:'q'},{a:4,b:'q'}]
let newArr = arr.map((item)=>item.a);
console.log(newArr)
console.log(Math.min(...newArr));
