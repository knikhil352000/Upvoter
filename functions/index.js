const functions = require('firebase-functions');

//http request 1

exports.randomNumber = functions.https.onRequest((request, response) => {
    const number = Math.round(Math.random() * 100);
    response.send(number.toString());
})

exports.redirectFunctions = functions.https.onRequest((request, response) => {
    
    response.redirect('www.google.com');
})

//http callable function
exports.sayHello = functions.https.onCall((data, context) => {
    const name = data.name;
    return `HELLO ${name}`;
})



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// }); 
