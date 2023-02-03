const fs = require('fs');

// Write to files
// fs.writeFile('test.txt', 'Maisy', (error) => {
//   if (error) {
//     console.log(error);
//   }
// });

// Synchronous version
// try {
//   fs.writeFileSync('test.txt', 'Hello');
// } catch (error) {
//   console.log(error);
// }

// Append to files

// fs.appendFile('test.txt', 'Learn NodeJS', (error) => {
//   if (error) {
//     console.log(error);
//   }
// });

// Read files

fs.readFile('test.txt', 'utf8', (error, data) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(data);
});
