const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


let a=['one','ok','two','to'];
let preprocess=[];



//run once and store result for efficency
app.listen(5000,()=>{
    for(let i=0;i<a.length;i++){
        for(let j=0;j<a[i].length;j++){
            if(a[i].startsWith());
        }
    }
});


app.get('/prefixes', (req, res) => {
    const body = req.query.keywords;
    const arr = body.split(',');
    
});

