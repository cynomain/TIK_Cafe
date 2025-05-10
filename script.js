const $I = (id) => document.getElementById(id);
const $Q = (id) => document.querySelector(id);
const $QA = (id) => document.querySelectorAll(id);
const $CE = (type) => document.createElement(type);

const elMenuGrid = $Q(".menu-grid");
const elOverlay = $Q(".overlay");
const elDialogCard = $Q(".dialog-card");

function CreateMenuItem(name, imgPath, priceText) {
    let btn = document.createElement("button");
    btn.className = "menu-item";

    let img = document.createElement("img");
    let h2 = document.createElement("h2");
    let p = document.createElement("p");

    img.src = imgPath;
    h2.innerText = name;
    p.innerText = FormatRupiah(number);

    img.className = "menu-image";
    h2.className = "menu-name";
    p.className = "menu-price";

    //TODO: DIALOG

    return btn;
}

function BuildDialog() {

}

function BuildCustomSelection() {
    
}

function FormatRupiah(value) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(number);
}