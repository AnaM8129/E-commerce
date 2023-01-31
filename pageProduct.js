//PÁGINA---- PAGEPRODUCT

//CAPTURAR INFORMACIÓN DEL FORMULARIO
const form = document.querySelector(".form");
const inputEmail = document.getElementById("email__input");
const inputNumber = document.getElementById("input__number");
const inputDate = document.getElementById("input__date");
const inputCvc = document.getElementById("input__cvc");
const inputName = document.getElementById("card-name__input");

const handleSubmit = (e) => {
  e.preventDefault();
  let newInformationCard = [];
  let informationCard = {
    email: inputEmail.value,
    number: inputNumber.value,
    date: inputDate.value,
    cvc: inputCvc.value,
    name: inputName.value,
  };
  newInformationCard.push(informationCard);
  form.reset();
  // console.log(informationCard);
  //ALERTA DE COMPRA
  Swal.fire({
    html: "<b class='title-thanks-section'>¡Gracias por tu compra!</b>",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/2721/2721975.png",
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: "image",
    confirmButtonText: "Seguir comprando",
    confirmButtonColor: "#0ac763",
  });
  localStorage.setItem("newCard", JSON.stringify(newInformationCard));
  // console.log(localStorage);
};

form.addEventListener("submit", (e) => handleSubmit(e));
