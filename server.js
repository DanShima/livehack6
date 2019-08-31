const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

/* Save answers from users */


let answers;

// Collect form answers
  app.post('/answers', (req, res) => {

    answers = req.body
    console.log("req body: ", req.body)
    //console.log("res: ", res)

    res.send(req.body)

  });



/* Generate images based on answers */



  // Get image?
  app.get('/image', (req, res) => {

    console.log("response: ", req)

    res.send("res: ", res)
  });



/* Check match code */

// Send match code
app.post('/code', (req, res) => {

    answers = req.body
    console.log("req body: ", req.body)
    //console.log("res: ", res)

    res.send(req.body)

  });



/* Send matching results! */

// Get matching results
  app.get('/results', (req, res) => {

    console.log("response: ", req)

    res.json({"result":hello})
    res.send("res: ", res)
  });





app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});
