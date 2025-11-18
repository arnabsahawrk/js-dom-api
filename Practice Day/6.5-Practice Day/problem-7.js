const numbers = [1, 2, 3, 3, 4, 4, 5, 6, 7, 8, 9, 10];

let set = [];
for (let i = 0; i < numbers.length; i++) {
  if (!set.includes(numbers[i])) set.push(numbers[i]);
}

console.log(...set);
