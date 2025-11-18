const arr = [12, 3, 19, 1, 8, 17, 4, 15, 6, 20, 2, 14, 9, 18, 5, 11, 7, 16, 10, 13];

arr.sort((a, b) => a - b); //Because of numeric sorting, javascript is wired it's sort values in terms of string, what the heck

console.log(...arr);
