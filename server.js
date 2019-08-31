const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

let userArray = []


class User {
    constructor(name) {
      this.name = name;
      this.userID = guidGenerator();
      this.answers = [];
      this.imageID = null;
      this.codePart = null;
      this.matched = false;
    }
  }

/* Connect to the game */

// Collect name and genereate ID
app.post('/connect', (req, res) => {
    try {

        let name = req.body.name

        let user = new User(name, [],"","")

       userArray.push(user)
       
    
        res.status(200).send(user)
        
    } catch (err) {
        console.log("err: ", err)
        res.status(500).send("server error")
    }
  });


// Generates IDs
  function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

// Gets user array
app.get('/userarray', (req, res) => {
    try {
        res.send(userArray)
        
    } catch (err) {
        console.log("err: ", err)
        res.status(500).send("server error")
    }
  });



/* Save answers from users */

/*
let answers = {
    tool: null,
    food:null,
    date: null,
    game:null,
    vegan: null,
    hack: null,
    drugs: null, 
    music: null, 
    ai: null
};
*/



// Collect form answers
  app.post('/answers', async(req, res) => {
    try {
        let imageID
        let codePart

        let {answers,userID} = req.body.answers
        console.log("req body: ", req.body)
    
        let activeUser = userArray.find(user => user.userID === userID)
        activeUser.answers = answers

       await imageID, codePart = match(activeUser)
    
        res.send(answers)
        //res.json(imageID, codePart)
        
    } catch (err) {
console.log("err: ", err)
        res.status(500).send("server error")
        
    }

  });


/* Generate images based on match with answers */

function match(activeUser) {

    console.log("activeUser: ", activeUser);

    
    //let imageID = "dogdoctor1"
    //let codePart= "dog"


    //while user is not matched, keep checking

    let baseline = 5;

 
    let matchArray = {}

    if(userArray.length>=5){

        // while you are not matched
        while (!activeUser.matched) {
            

            userArray.forEach(element => {
                let nmbrOfMatches = activeUser.answers.compare(element.answers).length; 
                if(nmbrOfMatches>=baseline && activeUser!=element){
                    matchArray[element.userID] = nmbrOfMatches
                }
            });

            matchArray


        }
    }



    //when user matches, return imageID and codePart
  



    return imageID, codePart
}


    Array.prototype.compare = function(arr2) {
        var ret = [];
        this.sort();
        arr2.sort();
        for(var i = 0; i < this.length; i += 1) {
            if(arr2.indexOf(this[i]) > -1){
                ret.push(this[i]);
            }
        }
        return ret;
      };
      /*
      var array1 = ["cat", "sum","fun", "run", "hut"];
      var array2 = ["bat", "cat","dog","sun", "hut", "gut"];
      
      var bla = array1.diff(array2); 
*/


/* Check match code */

// Send match code
app.post('/code', (req, res) => {
    try {

        let code = req.body.code
        console.log("code: ", code)

        if (code === "qwerty") {
            // send result page as JSON
            res.status(200).send("Correct Code!")

        }else{
            // not matching

        res.status(400).send("Wrong Code")

        }
    } catch (err) {
        res.status(500).send("server error")
    }
  });



/* Send matching results! */

// Get matching results
  app.get('/results', (req, res) => {

    console.log("response: ", req)

    res.json({"result":hello})
    res.send("res: ", res)
  });


/*
// Create create match code (standard length should be 12 because you can divide it by 2 and 3)
  function makeMatchCode(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 */


// Listen to PORT 8000
app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});
