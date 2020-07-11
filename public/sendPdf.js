const pdfButton = document.querySelector('#newsletter-button');
const pdfInput = document.querySelector('#newsletter-input');

const sendPDF = (event) => {
    event.preventDefault();
    if (pdfInput.value.length !== 0) {
        mail = pdfInput.value;
        content = 'aucun contenue'
    }

    const data = {
        e: mail,
        t: content
    }

    if (data.t.length === 0 || data.e.length === 0) {
        modal.classList.add('show');
        modal.style.display = 'block';
    } else {
        button.setAttribute('disabled', '');
        console.log(data);
        fetch('/send-pdf', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data })
        })
            .then(response => response.json())
            .then((dataFromServer) => {
                const result = dataFromServer[0].statusCode;
                if (result === 202) {
                    document.querySelector('.alert-primary').style.display = 'block';
                    email.value = '';
                    texte.value = '';
                    chatEmail.value = '';
                    chatNom.value = '';
                    button.removeAttribute("disabled", "");
                    button.setAttribute('enabled', '');
                } else {
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


pdfButton.addEventListener('click', sendPDF); 