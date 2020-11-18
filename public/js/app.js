const requestModal = document.querySelector('.new-request');
const requestLink = document.querySelector('.add-request');
const requestForm = document.querySelector('.new-request form');

requestLink.addEventListener('click', () => {
    requestModal.classList.add('open');
});

requestModal.addEventListener('click', (e) => {
    if(e.target.classList.contains('new-request')){
        requestModal.classList.remove('open');
    }
});



//add new request
requestForm.addEventListener('submit', e => {
    e.preventDefault();
    const addRequest = firebase.functions().httpsCallable('addRequest');
    addRequest({
        text: requestForm.request.value
    })
    .then(() => {
        requestForm.reset();
        requestModal.classList.remove('open');
        registerForm.querySelector('.error').textContent = '';
    })
    .catch(error => {
        registerForm.querySelector('.error').textContent = error.message;
    })
})

//notification

const notification = document.querySelector('.notification');
const showNotification = (message) => {
    notification.textContent = message;
    notification.classList.add('active');
    setTimeout(() => {
        notification.classList.remove('active');
        notification.textContent = "";

    },4000);
}


// say hello function call
// const button = document.querySelector('.call');
// button.addEventListener('click', () => {
//     //get function reference
//     const sayHello = firebase.functions().httpsCallable('sayHello');
//     sayHello({name : 'Nikhil'}).then(result => {
//         console.log(result.data);
//     });
// });