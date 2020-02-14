const sujet = document.querySelector('#sujet');
const email = document.querySelector('#email');
const texte = document.querySelector('#text');
const button = document.querySelector('#submit');
const modal = document.querySelector('.modal');
const modalButton = document.querySelector('.modal-footer button');

modalButton.addEventListener('click', (event) => {
    event.preventDefault();
    modal.classList.remove('show');
});

button.addEventListener('click', (event) => {
    event.preventDefault();
    const data = {
        // s: sujet.value,
        e: email.value,
        t: texte.value
    }

    if(data.t.length === 0 || data.e.length === 0){
        // alert('Vous navez pas remplis un des formulaire');
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
                button.removeAttribute("disabled", "");
            button.setAttribute('enabled', '');
            }else{
                document.querySelector('.alert-danger').style.display = 'block';
                email.value = '';
                texte.value = '';
                button.removeAttribute("disabled", "");
                button.setAttribute('enabled', '');
            }
        })
        .catch((err) => {
            console.log('Mon erreur:' + ' ' + err);
        })
    }  
});

//'https://limitless-sierra-16446.herokuapp.com/email' ==> URL ajax