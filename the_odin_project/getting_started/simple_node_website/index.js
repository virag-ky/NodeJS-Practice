const http = require('http');
const express = require('express');
const { readFileSync } = require('fs');

const app = express();

const readHomePage = readFileSync('./index.html', 'utf8');
const readAboutPage = readFileSync('./about.html', 'utf8');
const readContactPage = readFileSync('./contact-me.html', 'utf8');
const readErrorPage = readFileSync('./404.html', 'utf8');

app.get('/', (req, res) => {
  res.status(200).send(readHomePage);
});

app.get('/about', (req, res) => {
  res.status(200).send(readAboutPage);
});

app.get('/contact-me', (req, res) => {
  res.status(200).send(readContactPage);
});

// const server = http.createServer((request, response) => {
//   if (request.url === '/') {
//     response.writeHead(200, { 'content-type': 'text/html' });
//     response.end(readHomePage);
//   } else if (request.url === '/about') {
//     response.writeHead(200, { 'content-type': 'text/html' });
//     response.end(readAboutPage);
//   } else if (request.url === '/contact-me') {
//     response.writeHead(200, { 'content-type': 'text/html' });
//     response.end(readContactPage);
//   } else {
//     response.writeHead(404, { 'content-type': 'text/html' });
//     response.end(readErrorPage);
//   }
// });

app.listen(8080, () => {
  console.log('server running on port 8080');
});
