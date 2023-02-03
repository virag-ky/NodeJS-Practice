const fs = require('fs');

// Reading files
fs.readFile('./docs/blog1.txt', (error, data) => {
  if (error) {
    console.log(error);
  }
  console.log(data.toString());
});

// Writing files
fs.writeFile('./docs/blog1.txt', 'Hello World', () => {
  console.log('file was written');
});

// Directories
if (!fs.existsSync('./assets')) {
  fs.mkdir('./assets', (error) => {
    if (error) {
      console.log(error);
    }
    console.log('folder created');
  });
} else {
  fs.rmdir('./assets', (error) => {
    if (error) {
      console.log(error);
    }
    console.log('folder deleted');
  });
}

// Deleting files
if (fs.existsSync('./docs/deleteme.txt')) {
  fs.unlink('./docs/deleteme.txt', (error) => {
    if (error) {
      console.log(error);
    }
    console.log('file deleted');
  });
}
