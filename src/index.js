const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

//let pagination = localStorage.getItem("pagination");
let prodIni = 0;

const getData = async (api) => {
  await fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;

      //Primer Problema
      let newProductos = products.slice(prodIni,prodIni+10); //Tercer Problema
      
      let output = newProductos.map(product => {

        if(product.id <= 200)
          desplegarProducto(product);
        
        if(product.id == 200)
        {
          alert("Todos los productos Obtenidos");
          $observe.remove();
        }
          
      });
    })
    .catch(error => console.log(error));
}

const loadData = async () => {
   await getData(API);
}

const intersectionObserver = new IntersectionObserver(async (entries) => {
  // logic...
  entries.forEach(async(entry) => {
    if (entry.intersectionRatio > 0) {
      //console.log("entries");
      entry.target.classList.add('in-viewport');
      await buscarSig10Prod();
    }
  }); 
  

}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
const buscarSig10Prod = async () => {
 
  //localStorage.setItem("pagination", prodIni); //Se elimina el LocalStorage
  await loadData();
  prodIni = prodIni + 10;
}

//Segundo Problema
const desplegarProducto = (product) => {
  let card = document.createElement('article');
        card.classList.add('Card');

        let image = document.createElement('img');
        image.src = product.images[0];

        let newItem = document.createElement("section");
        newItem.classList.add('item');
        newItem.innerHTML = `${product.id} - ${product.title}`;

        let descripItem = document.createElement("small");
        descripItem.innerHTML = `$ ${product.price}`;

        card.appendChild(image);
        card.appendChild(newItem);
        card.appendChild(descripItem);

        $app.appendChild(card);
}

/*
document.addEventListener("DOMContentLoaded", async () => {
  await loadData();
  
})

//Primer Problema
window.addEventListener("scroll", (e) => {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    console.log("bottom");
    btnSiguiente.style.display = "none";
    buscarSig10Prod();
 }
})

let btnSiguiente = document.querySelector("#ObtenerSig10");
btnSiguiente.addEventListener("click", () => {
  buscarSig10Prod();
})
*/