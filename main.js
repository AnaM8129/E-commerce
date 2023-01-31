//CONSTANTES PARA EL MODAL DE UBICACIÓN
const buttonOpenUbication = document.getElementById("button-open-ubication");
const modal = document.getElementById("modal");
const deleteModal = document.getElementById("delete-modal");
const saveUbication = document.getElementById("save-ubication");
const showUbication = document.getElementById("ubication-container__show");
const showUbicationModal = document.getElementById("show-ubication-modal");

//CONSTANTES PARA EL MODAL DE COMPRAS
const shoppingModal = document.querySelector(".modal-shopping");
const carritoButtom = document.getElementById("carritoCompra");
const deleteCarritoButton = document.getElementById("close-shopping__button");

//CONSTANTES PARA LA API DE UBICACIÓN
const API_URL = "http://localhost:3000/Cuidades";
const selectDepartamento = document.getElementById("select-ubication");
const selectCiudad = document.getElementById("select-ubication-cui");

//CONSTANTES LOS ELEMENTOS PARA LA API DE PRODUCTOS CON DESCUENTO
const APIDiscountUrl = "http://localhost:3000/promociones";
const cardSection = document.querySelector(".cards-products__section-descount");

//CONSTANTES DE LOS ELEMENTOS PARA LA API DE PRODUCTOS GEGENRALES
const APIGeneralProducts = "http://localhost:3000/products";
const cardProductsSection = document.querySelector(
  ".cards-products__section-general"
);

//CONSTANTE/VARIABLES PARA AGREGAR PRODUCTOS AL CARRITO
const productContainer = document.querySelector(".shopping-list__container");
let shoppingCardArray = [];
let total = 0;

//BOTONES DE ABRIR Y CERRAR MODAL DE UBICACIÓN
buttonOpenUbication.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.remove("hidden");
});

deleteModal.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.add("hidden");
});

//BOTÓN PARA ABRIR Y CERRAR EL MODAL DE COMPRAS
carritoButtom.addEventListener("click", (e) => {
  e.preventDefault();
  shoppingModal.classList.remove("hidden-shopping");
});

deleteCarritoButton.addEventListener("click", (e) => {
  e.preventDefault();
  shoppingModal.classList.add("hidden-shopping");
});

//BOTÓN PARA GUARGAR LA INFORMACIÓN DE UBICACIÓN Y PINTARLA
saveUbication.addEventListener("click", () => {
  let valorSelect = selectDepartamento.value;
  console.log(valorSelect);
  showUbication.innerText = `${valorSelect}`;
  modal.classList.add("hidden");
  showUbicationModal.innerHTML += `<img src="./imagenes/Union.png" alt="ubication icon" />
  <p>Entregar en:</p><b>${valorSelect}</b>`;
  // console.log(showUbicationModal);
});

//PINTAR LA API DE UBICACIÓN
const getUbication = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  console.log(data);
  renderUbication(data);
  // renderUbicationCiudad(data);
};

const renderUbication = (data) => {
  selectDepartamento.innerHTML = "";
  data.forEach((element) => {
    selectDepartamento.innerHTML += `
    <select id="select-ubication" class="select-Ubication">
             <option hidden selected>Selecciona tu departamento</option>
             <option>${element.departamento}</option>
    </select>
    `;
  });
};

getUbication();

//PINTAR LA API DE PRODUCTOS EN DESCUENTO
const getDescuento = async () => {
  const response = await fetch(APIDiscountUrl);
  const data = await response.json();
  console.log(data);
  rederDescuento(data);
};

const rederDescuento = (data) => {
  cardSection.innerHTML = "";
  data.forEach((element) => {
    cardSection.innerHTML += ` 
    <div class="card-product" id="${element.id}">
        <p id="card-product__descuento">32% dto.</p>
        <figure class="card-product__figure">
          <img
            id="card-product__img"
            src="${element.url}"
            alt="Producto"
          />
        </figure>
        <div class="card-product__details-container">
          <p id="precio-producto">${element.price}$</p>
          <p id="cantidad-producto">${element.weight}</p>
        </div>
        <h6 id="nombre-producto">${element.name}</h6>
        <button class="agregar-al-carrito">Agregar</button>
      </div>
    `;
  });
};

getDescuento();

//PINTAR LA API DE LOS PRODUCTOS GENERALES
const getProducts = async () => {
  const response = await fetch(APIGeneralProducts);
  const data = await response.json();
  console.log(data);
  renderProducts(data);
  // modalProduct(data);
  // addListProduct(data);
};

const renderProducts = (data) => {
  cardProductsSection.innerHTML = "";
  data.forEach((element) => {
    cardProductsSection.innerHTML += `
    <div class="card-product" id="${element.id}">
        <p id="card-product__descuento">32% dto.</p>
        <figure class="card-product__figure">
          <img
            id="card-product__img"
            src="${element.url}"
            alt="Producto"
          />
        </figure>
        <div class="card-product__details-container">
          <p id="precio-producto">${element.price}$</p>
          <p id="cantidad-producto">${element.weight}</p>
        </div>
        <h6 id="nombre-producto">${element.name}</h6>
        <button class="agregar-al-carrito">Agregar</button>
      </div>
    `;
  });
};

getProducts();

//AGREGAR A LA SHOPPING CARD LOS PRODUCTOS GENERALES
const getAddButton = async () => {
  const response = await fetch(APIGeneralProducts);
  const data = await response.json();
  addListProduct(data);
};

//PINTAR LOS PRODUCTOS EN LA SHOPPING CARD
const addListProduct = (data) => {
  const addProduct = document.querySelectorAll(".agregar-al-carrito");
  addProduct.forEach((product) => {
    product.addEventListener("click", (event) => {
      // console.log("click");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Producto añadido",
        showConfirmButton: false,
        timer: 1500,
      });
      //BUSCAR EL ID DEL PRODUCTO CORRESPONDIENTE AL PRODUCTO
      let actualId = parseInt(event.target.parentNode.id);
      console.log(actualId);

      // CON EL ID ENCONTRAMOS EL OBJETO
      let actualProduct = data.find((item) => item.id == actualId);
      console.log(actualProduct);
      shoppingCardArray.push(actualProduct);

      productContainer.innerHTML += `
  <main class="shopping-list__container">
        <div class="product-list-container">
          <img
            class="shopping-list__container-img"
            src="${actualProduct.url}"
            alt="Aguacate"
          />
          <div class="shopping-list__container-information">
            <p id="shipping-list-name">${actualProduct.name}</p>
            <p id="shopping-list-price">${actualProduct.price}</p>
          </div>
          <div>
          <button id="eliminar-list-product">
          <img class="eliminar-button" src="./imagenes/eliminar.png" alt="Eliminar">
        </button>
          </div>
        </div>
      </main>
  `;
    });
  });
};
console.log(shoppingCardArray);
getAddButton();

//AGREGAR A LA SHOPPING CARD LOS PRODUCTOS CON DESCUENTO
const getAddButtonDescount = async () => {
  const response = await fetch(APIDiscountUrl);
  const data = await response.json();
  addListProductDescount(data);
  // eliminarDatos(data);
};

//PINTAR LOS PRODUCTOS CON DESCUENTO EN LA SHOPPING CARD
const addListProductDescount = (data) => {
  const addProduct = document.querySelectorAll(".agregar-al-carrito");
  // console.log(addProduct);
  addProduct.forEach((product) => {
    product.addEventListener("click", (event) => {
      // console.log("click");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Producto añadido",
        showConfirmButton: false,
        timer: 1500,
      });
      //BUSCAR EL ID DEL PRODUCTO CORRESPONDIENTE AL PRODUCTO
      let actualId = parseInt(event.target.parentNode.id);
      console.log(actualId);

      // CON EL ID ENCONTRAMOS EL OBJETO
      let actualProduct = data.find((item) => item.id == actualId);
      console.log(actualProduct);

      productContainer.innerHTML += `
  <main class="shopping-list__container">
        <div class="product-list-container">
          <img
            class="shopping-list__container-img"
            src="${actualProduct.url}"
            alt="Aguacate"
          />
          <div class="shopping-list__container-information">
            <p id="shipping-list-name">${actualProduct.name}</p>
            <p id="shopping-list-price">$${actualProduct.price}</p>
          </div>
          <div>
          <button id="eliminar-list-product">
          <img class="eliminar-button" src="./imagenes/eliminar.png" alt="Eliminar">
        </button>
          </div>
        </div>
      </main>
  `;
    });
  });
};
getAddButtonDescount();

// const getEliminarButton = async () => {
//   const response = await fetch(APIGeneralProducts);
//   const data = await response.json();
//   eliminarDatos(data);
// };

// const eliminarDatos = (data) => {
//   console.log(data);
//   const eliminarbutton = document.querySelectorAll("#eliminar-list-product");
//   // console.log(eliminarbutton);
// };
// getEliminarButton();
