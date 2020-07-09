const buttonCard = document.querySelectorAll('.card');
const formValue = document.querySelector('#text');

const arrayOfCardText = buttonCard[1].innerText.match(/[^\r\n]+/g);


buttonCard.forEach((a) => {
  a.addEventListener('click', (event) => {
    event.preventDefault();
    let arrayOfCardText = a.innerText.match(/[^\r\n]+/g);
    formValue.value = `J'aimerai des informations sur la formation suivante: ${arrayOfCardText[1]}`;
  });
});
