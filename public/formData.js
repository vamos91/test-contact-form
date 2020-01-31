const sujet = document.querySelector('#sujet');
const email = document.querySelector('#email');
const texte = document.querySelector('#text');
const button = document.querySelector('#submit');

button.addEventListener('click', (event) => {
    event.preventDefault();
    const data = {
        s: sujet.value,
        e: email.value,
        t: texte.value
    }
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
        console.log('Donnée reçus: ' + dataFromServer);
    })
    .catch((err) => {
        console.log('Mon erreur' + err);
    })
});