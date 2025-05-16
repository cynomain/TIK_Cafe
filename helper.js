const $I = (id) => document.getElementById(id);
const $Q = (id) => document.querySelector(id);
const $QA = (id) => document.querySelectorAll(id);
const $CE = (type) => document.createElement(type);
// DEVON REINHART

const INTL_RUPIAH = Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
});
function FormatRupiah(value, zeroHandling = 1) {
    if (value === undefined || value === null) {
        return "";
    }

    if (value === 0) {
        switch (zeroHandling) {
            case 1:
                return "GRATIS"
            case 2:
                return "";
            default:
                break;
        }
    }

    let result = INTL_RUPIAH.format(value);

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

/**
 * @param {String} HTML representing a single node (which might be an Element,
                   a text node, or a comment).
 * @return {Node}
 */
function htmlToNode(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    const nNodes = template.content.childNodes.length;
    if (nNodes !== 1) {
        throw new Error(
            `html parameter must represent a single node; got ${nNodes}. ` +
            'Note that leading or trailing spaces around an element in your ' +
            'HTML, like " <img/> ", get parsed as text nodes neighbouring ' +
            'the element; call .trim() on your input to avoid this.'
        );
    }
    return template.content.firstChild;
}

const td = htmlToNode('<td>foo</td>'),
    div = htmlToNode('<div><span>nested</span> <span>stuff</span></div>');

/**
 * @param {String} HTML representing any number of sibling nodes
 * @return {NodeList} 
 */
function htmlToNodes(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
}


function clamp(value, min, max) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
}

function randomRange(minIncl, maxExcl) {
  return Math.random() * (maxExcl - minIncl) + minIncl;
}