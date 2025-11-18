let result = 75;
result = 102;
result = -9;
result = 95;
result = 28;

if (result <= 100 && result >= 80) {
  console.log('A+');
} else if (result <= 79 && result >= 70) {
  console.log('A');
} else if (result <= 69 && result >= 60) {
  console.log('A-');
} else if (result <= 59 && result >= 50) {
  console.log('B');
} else if (result <= 49 && result >= 40) {
  console.log('C');
} else if (result <= 39 && result >= 33) {
  console.log('D');
} else if (result <= 33 && result >= 0) {
  console.log('F');
} else {
  console.log('Invalid');
}
