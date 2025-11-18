let year = 2000;
year = 1900;
year = 2024;
year = 2023;
year = 2400;
year = 2100;

if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) console.log('Leap Year');
else console.log('Not Leap Year');
