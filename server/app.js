const express = require('express');

const app = express();
const port = process.env.PORT || 8081;

app.use(express.static('public_html'));
app.listen(port, function() {
  console.log('Server is running on http://localhost:8081');
})