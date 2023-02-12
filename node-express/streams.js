const { writeFileSync, createReadStream } = require('fs');

for (let i = 0; i < 1000; i++) {
  writeFileSync('./content/big.txt', `hello world ${i}\n`, { flag: 'a' });
}

const stream = createReadStream('./content/big.txt');

stream.on('data', (result) => {
  console.log(result);
});
