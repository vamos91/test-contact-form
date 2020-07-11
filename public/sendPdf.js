// const pdfButton = document.querySelector('#newsletter-button');
// const pdfInput = document.querySelector('#newsletter-input');
const modal2 = document.querySelector('.modal');
const modalButton2 = document.querySelector('.modal-footer button');
let mail = '';
let content = '';

modalButton2.addEventListener('click', (event) => {
    event.preventDefault();
    modal2.classList.remove('show');
});

const sendPDF = (event) => {
    event.preventDefault();
    console.log('test');  
    if (pdfInput.value.length !== 0) {
        mail = pdfInput.value;
        content = 'aucun contenue'
    }

    const data = {
        e: mail,
        t: content
    }

    if (data.t.length === 0 || data.e.length === 0) {
        modal2.classList.add('show');
        modal2.style.display = 'block';
    } else {
        pdfButton.setAttribute('disabled', '');
        console.log(data);
        fetch('/sendpdf', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then((dataFromServer) => {
                
                const result = dataFromServer[0].statusCode;
                console.log(result);
                if (result === 202) {
                    document.querySelector('.alert-primary').style.display = 'block';
                    pdfInput.value = '';
                    pdfButton.removeAttribute("disabled", "");
                    pdfButton.setAttribute('enabled', '');
                } else {
                    document.querySelector('.alert-danger').style.display = 'block';
                    pdfInput.value = '';
                    pdfButton.removeAttribute("disabled", "");
                    pdfButton.setAttribute('enabled', '');
                }
            })
            .catch((err) => {
                console.log('Mon erreur:' + ' ' + err);
            })
    }
}


pdfButton.addEventListener('click', sendPDF); 