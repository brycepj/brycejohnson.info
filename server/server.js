const path = require('path');
const express = require('express');
const app = express();

const PUBLIC_DIR = path.resolve(__dirname, '../blog/_site');

app.use(express.static(PUBLIC_DIR));

console.log(`Listening on port 4000, serving files from ${PUBLIC_DIR}`);

app.listen(4000);
