const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

//auth triggers(new user signUP)

exports.newUserSignup = functions.auth.user().onCreate(user => {
    return admin.firestore().collection('users').doc(user.uid).set({
        email : user.email,
        upvotedOn: []
    })
    //for background triggers you must return a value/promise
});

//auth triggers(user deleted)

exports.userDeleted = functions.auth.user().onDelete(user => {
    const doc = admin.firestore().collection('users').doc(user.uid);
    return doc.delete();
    //for background triggers you must return a value/promise
});


// //http request 1

// exports.randomNumber = functions.https.onRequest((request, response) => {
//     const number = Math.round(Math.random() * 100);
//     response.send(number.toString());
// })

// exports.redirectFunctions = functions.https.onRequest((request, response) => {
    
//     response.redirect('www.google.com');
// })

// //http callable function
// exports.sayHello = functions.https.onCall((data, context) => {
//     const name = data.name;
//     return `HELLO ${name}`;
// })



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// }); 
