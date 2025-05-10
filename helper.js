const $I = (id) => document.getElementById(id);
const $Q = (id) => document.querySelector(id);
const $QA = (id) => document.querySelectorAll(id);
const $CE = (type) => document.createElement(type);

function FormatRupiah(value) {
    if (value === undefined || value === null) {
        return "";
    }

    if (value=== 0){
        return "GRATIS";
    }
    
    let result = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(value);

    return result;
}