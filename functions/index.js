const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

//auth triggers(new user signUP)

exports.newUserSignup = functions.auth.user().onCreate(user => {
    return admin.firestore().collection('users').doc(user.uid).set({
        email : user.email,
        upvotedOn: []
    });
    //for background triggers you must return a value/promise
});

//auth triggers(user deleted)

exports.userDeleted = functions.auth.user().onDelete(user => {
    const doc = admin.firestore().collection('users').doc(user.uid);
    return doc.delete();
    //for background triggers you must return a value/promise
});

//http callable functions

exports.addRequest = functions.https.onCall((data, context) => {
    if(!context.auth){
        throw new functions.https.HttpsError(
            'unauthenticated',
            'Only Authenticated Users Are Allowed to Add Request'
        );
    }
    if(data.text.length > 30){
        throw new functions.https.HttpsError(
            'invalid-argument',
            'Request should be less than 30 characters'
        );
    }
    return admin.firestore().collection('requests').add({
        text: data.text,
        upvotes: 0
    });
});

//Upvote callable function
exports.upvote = functions.https.onCall((data, context) => {
    if(!context.auth){
        throw new functions.https.HttpsError(
            'unauthenticated',
            'Only Authenticated Users Are Allowed to Add Request'
        );
    }
    // get refs for user doc & request doc
    const user = admin.firestore().collection('users').doc(context.auth.uid);
    const request = admin.firestore().collection('requests').doc(data.id);

    return user.get().then(doc => {
        //check if the user has already upvoted
        if(doc.data().upvotedOn.includes(data.id)){
            throw new functions.https.HttpsError(
                'failed-precondition',
                'You can only upvote something once'
            );
        }

        //update user array
        return user.update({
            upvotedOn: [...doc.data().upvotedOn, data.id]
        }) 
        .then(() => {
            //updates votes on the request
            return request.update({
                upvotes: admin.firestore.FieldValue.increment(1)
            })
        })
    })
    
})


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
