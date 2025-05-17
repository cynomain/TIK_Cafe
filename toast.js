/**
 * @type Toast
 * @typedef {object}
 * @method showToast
 */

/**
 * @type Toast
 */
var Toast = {
    parent: $Q(".toast-host"),
    showToast: function (text) {
        let el = this.elCreate(text);
        this.parent.appendChild(el);
        el.classList.add("closed")
        setTimeout(() => {
            el.classList.remove("closed");
        }, 100);
        setTimeout(() => {
            el.classList.add("closed");
            setTimeout(() => {
                el.remove();
            }, 500);
        }, 5000);
    },
    elCreate: function (text) {
        let div = document.createElement("div");
        div.className = "toast";
        let p = document.createElement("p");
        p.innerText = text;
        div.appendChild(p);
        return div;
    }
}
// DEVON REINHART
