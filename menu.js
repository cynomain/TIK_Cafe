const menuGrid = $Q(".menu-grid");
const overlay = $Q(".overlay");
const dialogMenu = $I("dialog-menuview");
const tabsHost = $Q(".tabs");
const animHost = $Q(".anim");
const animCartImg = $I("cart-anim");

const ICON_RADIO_UNCHECKED = "assets/icons/generic/radio_unchecked.svg";
const ICON_RADIO_CHECKED = "assets/icons/generic/radio_checked.svg";
const ICON_CHECKBOX_UNCHECKED = "assets/icons/generic/checkbox_no.svg";
const ICON_CHECKBOX_CHECKED = "assets/icons/generic/checkbox_yes.svg";

var SELECTED_TAB = "none";

class CustomizationController {
    /**
     * 
     * @param {Customization} customization 
     * @param {Element} mainElement 
     * @param {boolean[]} selected 
     * @param {Element[]} elements
     * @param {[]} onChange 
     */
    constructor(customization, mainElement, selected, elements, onChange) {
        this.Customization = customization;
        this.MainElement = mainElement;
        this.Selected = selected;
        this.Elements = elements;
        this.onChange = Array.isArray(onChange) ? onChange : [];
    }

    SetSelection(index) {
        if (this.Customization.isSingle()) {
            this.Selected = Array.from({ length: this.Customization.choices.length }, () => false);
            this.Selected[index] = true;
            this.UpdateAllElements();
        } else {
            if (this.Selected[index]) {
                this.Selected[index] = !this.Selected[index];
                this.UpdateElement(index);
            } else {
                let selectedCount = this.Selected.filter((selected) => selected).length;
                if (selectedCount < this.Customization.max_choices) {
                    this.Selected[index] = !this.Selected[index];
                    this.UpdateElement(index);
                } else {
                    //Alert
                    this.AlertTitle();

                    ShakeElement(dialogMenu, .25);
                    ShakeElement(this.Elements[index], 1);

                    Toast.showToast("Cek kriteria pilihan!")
                }
            }
        }

        this.onChange.forEach((callback) => {
            try {
                callback(this.Selected);
            }
            catch (e) {
                console.error("Error in CustomizationController.onChange callback: ", e);
            }
        });
    }

    UpdateElement(index) {
        let selectedIcon = this.Elements[index].querySelector("img");
        if (this.Selected[index]) {
            this.Elements[index].classList.add("active");

            if (this.Customization.isSingle()) {
                selectedIcon.src = ICON_RADIO_CHECKED;
            } else {
                selectedIcon.src = ICON_CHECKBOX_CHECKED;
            }
        } else {
            this.Elements[index].classList.remove("active");

            if (this.Customization.isSingle()) {
                selectedIcon.src = ICON_RADIO_UNCHECKED;
            } else {
                selectedIcon.src = ICON_CHECKBOX_UNCHECKED;
            }
        }
    }
    UpdateAllElements() {
        this.Elements.forEach((element, index) => {
            this.UpdateElement(index);
        });
    }

    AlertTitle() {
        let title = this.MainElement.querySelector("&>*:first-child");

        AlertElement(title);
    }
}

let p1 = performance.now();
const CategoryTabsElements = {};
CATEGORIES.forEach(category => {
    CategoryTabsElements[category.id] = CreateCategoryTab(category);
});

const CategoryMenuElements = {};
CATEGORIES.forEach(cat => {
    CategoryMenuElements[cat.id] = cat.items.map(x => CreateMenuItemCard(x));
})
let p2 = performance.now();
console.log("Loading time: " + p2 - p1 + " ms");


tabsHost.innerHTML = "";
for (const [key, value] of Object.entries(CategoryTabsElements)) {
    tabsHost.appendChild(value);
}


function UpdateTabs() {
    for (let key of Object.keys(CategoryTabsElements)) {
        if (key == SELECTED_TAB) {
            CategoryTabsElements[key].classList.add("active");
        } else {
            CategoryTabsElements[key].classList.remove("active");
        }
    }
}

function GoToTab(id) {
    if (id == SELECTED_TAB) {
        return;
    }
    menuGrid.innerText = "";
    SELECTED_TAB = id;
    CategoryMenuElements[id].forEach(x => {
        menuGrid.appendChild(x);
    })
    UpdateTabs();
}


GoToTab(CATEGORIES[0].id);

/**
 * 
 * @param {MenuItem} menuItem 
 * @returns {Element} 
*/
function CreateMenuItemCard(menuItem) {
    let btn = document.createElement("button");
    btn.className = "menu-item";

    let img = document.createElement("img");
    let h2 = document.createElement("h2");
    let p = document.createElement("p");

    img.src = menuItem.icon_path;
    h2.innerText = menuItem.name;
    p.innerText = FormatRupiah(menuItem.price);

    img.className = "menu-image";
    h2.className = "menu-name";
    p.className = "menu-price";

    img.loading = "lazy";

    btn.appendChild(img);
    btn.appendChild(h2);
    btn.appendChild(p);

    btn.onclick = () => {
        SetMenuDialog(menuItem);
        OpenMenuDialog();
    }

    return btn;
}

/**
 * 
 * @param {MenuCategory} category 
 */
function CreateCategoryTab(category) {
    let btn = document.createElement("button");
    let img = document.createElement("img");
    let p = document.createElement("p");

    btn.className = "tab";
    img.className = "icon";

    p.innerText = category.name;
    img.src = category.icon_path;

    btn.appendChild(img);
    btn.appendChild(p);

    btn.onclick = () => {
        GoToTab(category.id);
    };

    return btn;
}


/**
 * @typedef MenuDialogData
 * @type {object}
 * @property {Customization[]} customizations
 * @property {CustomizationController[]} customizationControllers
 * @property {MenuItem} menuItem
 * @property {number} quantity
 */

/**
 * @type {MenuDialogData}
 */
var MenuDialogData = {
    menuItem: null,
    customizations: [],
    quantity: 1,
    customizationControllers: [],
    updateDialogPrice: function () {
        let totalPrice = MenuDialogData.menuItem.price;
        MenuDialogData.customizationControllers.forEach((controller) => {
            controller.Selected.forEach((selected, index) => {
                if (selected) {
                    totalPrice += controller.Customization.choices[index].price;
                }
            });
        });

        totalPrice *= MenuDialogData.quantity;

        DialogUI.price.innerText = FormatRupiah(totalPrice);
    },
    changeQuantity: function (value) {
        if (isNaN(value) || value < 1) {
            this.quantity = 1;
        } else if (value > 99) {
            this.quantity = 99;
        } else {
            this.quantity = value;
        }
        this.updateDialogPrice();
    },
    addToCart: function () {
        let unfulfilledCustomization = MenuDialogData.customizationControllers.find((controller) => {
            if (controller.Customization.isRequired()) {
                let selectedCount = controller.Selected.filter((selected) => selected).length;
                return selectedCount < controller.Customization.min_choices;
            }
            return false;
        });

        if (unfulfilledCustomization) {
            let elementToShake = unfulfilledCustomization.MainElement;
            elementToShake.scrollIntoView({ behavior: "smooth", block: "center" });
            Toast.showToast("Cek kriteria pilihan!");

            setTimeout(() => {
                unfulfilledCustomization.AlertTitle();
                ShakeElement(elementToShake, 1);
                ShakeElement(dialogMenu, .25);
            }, 750);
            return false;
        }

        let customs = [];
        this.customizationControllers.forEach(x => {
            console.log(x)
            x.Selected.forEach((y, i) => {
                if (y) {
                    customs.push(x.Customization.choices[i].id);
                }
            });
        })
        console.log(customs)
        let cartItem = new CartItem(this.menuItem, customs, this.quantity);
        Cart.addItem(cartItem);

        Toast.showToast("Telah ditambahkan ke keranjang!");
        return true;
    }

}
var DialogUI = {
    btn_add2cart: $I("mdialog-btn-add-to-cart"),
    btn_cancel: $I("mdialog-btn-cancel"),
    img: $I("mdialog-img"),
    title: $I("mdialog-title"),
    description: $I("mdialog-description"),
    price: $I("mdialog-price"),
    customizations: $I("mdialog-customizations"),
    quantityInput: $I("mdialog-q-quantity"),
    quantityReduce: $I("mdialog-q-btn-reduce"),
    quantityIncrease: $I("mdialog-q-btn-increase"),
};

DialogUI.btn_add2cart.addEventListener("click", (e) => {
    if (MenuDialogData.addToCart()) {
        CloseMenuDialog();
        AnimateItemToCart(MenuDialogData.menuItem.icon_path);
    }
});

DialogUI.btn_cancel.addEventListener("click", () => {
    CloseMenuDialog();
})

DialogUI.quantityInput.addEventListener("input", (e) => {
    let value = parseInt(DialogUI.quantityInput.value);
    if (!isNaN(value)) {
        MenuDialogData.changeQuantity(value);
        previousValue = MenuDialogData.quantity;
    }

    if (DialogUI.quantityInput.value === "") {
        //DialogData.quantity = 1; 
    } else {
        DialogUI.quantityInput.value = MenuDialogData.quantity;
    }
});

DialogUI.quantityInput.addEventListener("blur", (e) => {
    if (DialogUI.quantityInput.value === "") {
        //DialogData.quantity = previousValue; // Revert to previous value if blank
        DialogUI.quantityInput.value = MenuDialogData.quantity;
    }
});

DialogUI.quantityReduce.addEventListener("click", (e) => {
    MenuDialogData.changeQuantity(MenuDialogData.quantity - 1);
    DialogUI.quantityInput.value = MenuDialogData.quantity;
});

DialogUI.quantityIncrease.addEventListener("click", (e) => {
    MenuDialogData.changeQuantity(MenuDialogData.quantity + 1);
    DialogUI.quantityInput.value = MenuDialogData.quantity;
});

/**
 * 
 * @param {MenuItem} menuItem 
 */
function SetMenuDialog(menuItem) {
    DialogUI.img.src = menuItem.icon_path;
    DialogUI.title.innerText = menuItem.name;
    DialogUI.description.innerText = menuItem.description;
    DialogUI.price.innerText = FormatRupiah(menuItem.price);

    MenuDialogData.menuItem = menuItem;
    MenuDialogData.customizations = menuItem.customizations;
    MenuDialogData.customizationControllers = [];
    MenuDialogData.quantity = 1;

    DialogUI.quantityInput.value = MenuDialogData.quantity;

    DialogUI.customizations.innerHTML = "";
    MenuDialogData.customizations.forEach((customization) => {
        let [element, controller] = BuildMenuCustomization(customization);
        controller.onChange = [(selected) => {
            controller.Selected = selected;
            MenuDialogData.updateDialogPrice();
        }];
        DialogUI.customizations.appendChild(element);
        MenuDialogData.customizationControllers.push(controller);
    });

    setTimeout(() => {
        dialogMenu.scrollTop = DialogUI.title.offsetTop;
    }, 100);
}

/**
 * 
 * @param {Customization} customization
 */
function BuildMenuCustomization(customization) {
    let customizationController = new CustomizationController(customization, null, [], [], []);

    customizationController.Selected = Array.from({ length: customization.choices.length }, () => false);

    let mainDiv = document.createElement("div");
    mainDiv.className = "customization selection";

    let instruction = "(";
    instruction += (customization.isRequired() ? "wajib" : "opsional") + ", ";
    instruction += "pilih ";
    // Hanya 1
    if (customization.isSingle()) {
        instruction += "salah satu";
    } else {
        if (customization.min_choices > 0) {
            instruction += customization.min_choices + " ";
        }
        instruction += "hingga " + customization.max_choices + " pilihan";
    }
    instruction += ")";

    let title = document.createElement("p");
    title.innerText = customization.name + " " + instruction;
    mainDiv.appendChild(title);
    // DEVON REINHART
    let selections = document.createElement("div");
    selections.className = "selection-options";

    customization.choices.forEach((choice, index) => {
        let btn = document.createElement("button");
        btn.className = "option icon-btn-label";
        let icon = document.createElement("img");
        icon.src = customization.isSingle() ? ICON_RADIO_UNCHECKED : ICON_CHECKBOX_UNCHECKED;
        let p = document.createElement("p");
        p.innerText = choice.name;

        let price = document.createElement("p");
        price.innerText = FormatRupiah(choice.price);

        btn.appendChild(icon);
        btn.appendChild(p);
        btn.appendChild(price);

        btn.addEventListener("click", (e) => {
            customizationController.SetSelection(index);
        });

        customizationController.Elements.push(btn);
        selections.appendChild(btn);
    });

    mainDiv.appendChild(selections);
    customizationController.MainElement = mainDiv;

    return [mainDiv, customizationController];
}

function AnimateItemToCart(iconPath) {
    animCartImg.src = iconPath;
    animCartImg.classList.add("animate");
    animCartImg.onanimationend = () => {
        animCartImg.classList.remove("animate");
        console.log("DONT FORGET TO UPDATE CART AMOUNT");
    }
}