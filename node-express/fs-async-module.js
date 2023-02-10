const { readFile, writeFile } = require('fs');

readFile('./content/first.txt', 'utf8', (error, result) => {
  if (error) {
    console.log(error);
    return;
  }

  const first = result;
  readFile('./content/second.txt', 'utf8', (error, result2) => {
    if (error) {
      console.log(error);
      return;
    }
    const second = result2;
    writeFile(
      './content/result-async.txt',
      `Here is the result: ${first}, ${second}`,
      (error, result3) => {
        if (error) {
          console.log(error);
          return;
        }
        console.log(result3);
      }
    );
  });
});
