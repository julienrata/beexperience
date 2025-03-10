const http = require('http');

// Make a simple GET request to the API
const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/',
  method: 'GET'
}, (res) => {
  console.log('Status Code:', res.statusCode);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', data);
  });
});

req.on('error', (e) => {
  console.error('Error:', e.message);
});

req.end();