const $I = (id) => document.getElementById(id);
const $Q = (id) => document.querySelector(id);
const $QA = (id) => document.querySelectorAll(id);
const $CE = (type) => document.createElement(type);
// DEVON REINHART

function FormatRupiah(value) {
    if (value === undefined || value === null) {
        return "";
    }

    if (value === 0) {
        return "GRATIS";
    }

    let result = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value);

    return result;
}


/**
 * 
 * @param {HTMLElement} element 
 * @param {number} multiplier 
 */
function ShakeElement(element, multiplier = 1, duration = -1) {
    element.classList.add("shake");
    if (multiplier != 1) {
        element.style.setProperty("--shake-multiplier", multiplier);
    }
    if (duration != -1) {
        element.style.animationDuration = duration + "s";
    }
    element.addEventListener("animationend", () => {
        element.classList.remove("shake");
        element.style.removeProperty("--shake-multiplier");
    });
}

function AlertElement(element, duration = -1) {
    if (duration != -1) {
        element.style.animationDuration = duration + "s";
    }
    element.classList.add("flash-red");
    element.addEventListener("animationend", () => {
        element.classList.remove("flash-red");
    });
}
