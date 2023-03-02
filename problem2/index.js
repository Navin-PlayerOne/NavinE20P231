const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


let a=['bonfire', 'cardio', 'case', 'character', 'bonsai']
let preprocess={};



//run once and store result for efficency
app.listen(5000,()=>{
    for(let i=0;i<a.length;i++){
        let k = a[i];
        let tmp="";
        for(let j=0;j<k.length;j++){
            tmp+=k[j];
            if(a.filter((ke)=>ke.startsWith(tmp)).length == 1)
            break;
        }
        preprocess[k]=tmp;
    }
    console.log(preprocess);
});


app.get('/prefixes', (req, res) => {
    let ans=[]
    const body = req.query.keywords;
    const arr = body.split(',');
    for(let i=0;i<arr.length;i++){
        if(a.includes(arr[i])){
            ans.push({
                'keyword' : arr[i],
                'status' : 'found',
                'prefix' : preprocess[arr[i]]
            });
        }
        else{
            ans.push(
                {
                    "keyword": arr[i],
                    "status": "not_found",
                    "prefix": "not_applicable"
                }
            );
        }
    }
    res.send(ans);
});

