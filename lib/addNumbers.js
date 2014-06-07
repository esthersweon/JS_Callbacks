var readline = require('readline');

var reader = readline.createInterface ({
  input: process.stdin,
  output: process.stdout
});

function addNumbers(sum, numsLeft, completionCallback) {
  if (numsLeft > 0) {
    numsLeft -= 1;
    reader.question("Give a number ", function(num) {
    sum += parseInt(num);
    console.log(sum);
    addNumbers(sum, numsLeft, completionCallback);
  })
  } else {
    completionCallback(sum);
  };
};

addNumbers(0, 4, function (sum) {
  console.log("Total Sum: " + sum);
});