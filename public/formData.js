const sujet = document.querySelector('#sujet');
const email = document.querySelector('#email');
const texte = document.querySelector('#text');
const button = document.querySelector('#submit');
const chatEmail = document.querySelector("#chat-email");
const chatNom = document.querySelector("#chat-nom");
const chatButton = document.querySelector('#chat-submit');
const modal = document.querySelector('.modal');
const modalButton = document.querySelector('.modal-footer button');

const x = 'test1';
const y = 'test2';

modalButton.addEventListener('click', (event) => {
    event.preventDefault();
    modal.classList.remove('show');
});


const sendMail = (event) => {
     //event.preventDefault();
    if(email.value.length !== 0){
        mail = email.value;
    }else{
        mail = chatEmail.value;
    }

    if(texte.value.length !== 0){
        content = texte.value;
    }else{
        content = chatNom.value;
    }


    const data = {
        e: mail,
        t: content
    }

    if(data.t.length === 0 || data.e.length === 0){
        modal.classList.add('show');
        modal.style.display = 'block';
    }else{
        button.setAttribute('disabled', '');
        console.log(data);
        fetch('/email', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({ data })
        })
        .then(response => response.json())
        .then((dataFromServer) => {
            const result = dataFromServer[0].statusCode;
            if(result === 202){
                document.querySelector('.alert-primary').style.display = 'block';
                email.value = '';
                texte.value = '';
                chatEmail.value = '';
                chatNom.value = '';
                button.removeAttribute("disabled", "");
                button.setAttribute('enabled', '');
            }else{
                document.querySelector('.alert-danger').style.display = 'block';
                email.value = '';
                texte.value = '';
                chatEmail.value = '';
                chatNom.value = '';
                button.removeAttribute("disabled", "");
                button.setAttribute('enabled', '');
            }
        })
        .catch((err) => {
            console.log('Mon erreur:' + ' ' + err);
        })
    }
}


button.addEventListener('click', sendMail);
chatButton.addEventListener('click', sendMail);

//'https://limitless-sierra-16446.herokuapp.com/email' ==> URL ajax
