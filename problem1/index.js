const express = require('express');
const bodyParser = require('body-parser');
const { URL } = require('url');
const axios = require('axios');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(5000);

function isValidUrl(urlString) {
  try {
    const url = new URL(urlString);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (err) {
    return false;
  }
}

app.get('/numbers', async(req, res) => {
    const set = new Set();
    const body = req.query.url;
    for(let i=0;i<body.length;i++){
        if(isValidUrl(body[i])){
          const timeout = 500;

          const promises = body.map(url =>
            axios.get(url, { timeout })
              .then(response => {
                for (const element of response.data.numbers) {
                  set.add(element);
            }
              })
              .catch(error => console.log(`Error fetching ${url}: ${error.message}`))
          );

          Promise.all(promises)
          .then(results => {
                const sortedSet = Array.from(set).sort((a, b) => a - b);
                console.log(sortedSet);
                res.status(200).send({"numbers" :sortedSet});
          })
          .catch(error => console.log(`Error fetching data: ${error.message}`));
        }
    }
});
