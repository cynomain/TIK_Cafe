const menuGrid = $Q(".menu-grid");
const tabsHost = $Q(".tabs");
const animHost = $Q(".anim");
const animCartImg = $I("cart-anim");


const ICON_RADIO_UNCHECKED = "assets/icons/generic/radio_unchecked.svg";
const ICON_RADIO_CHECKED = "assets/icons/generic/radio_checked.svg";
const ICON_CHECKBOX_UNCHECKED = "assets/icons/generic/checkbox_no.svg";
const ICON_CHECKBOX_CHECKED = "assets/icons/generic/checkbox_yes.svg";
var SELECTED_TAB = "none";

// Cache a template MenuItemCard for cloning
var MenuItemCardTemplate = null;

function makeMenuItemCardTemplate() {
    if (MenuItemCardTemplate) return;
    let btn = document.createElement("button");
    btn.className = "menu-item";

    let img = document.createElement("img");
    img.className = "menu-image";
    img.width = 160;
    img.height = 160;
    img.loading = "lazy";

    let h2 = document.createElement("h2");
    h2.className = "menu-name";

    let p = document.createElement("p");
    p.className = "menu-price";

    btn.appendChild(img);
    btn.appendChild(h2);
    btn.appendChild(p);

    MenuItemCardTemplate = btn;
}

makeMenuItemCardTemplate();

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

    GetSelectionsAsIDArray() {
        let arr = [];
        this.Selected.forEach((b, i) => {
            if (b) {
                arr.push(this.Customization.choices[i].id);
            }
        });
        return arr;
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

                    Toast.showToast("Cek lagi pilihan!")
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
console.log("Loading time: " + p1 == p2 ? "Instant" : (p2 - p1 + " ms"));


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
    //menuGrid.innerText = "";
    SELECTED_TAB = id;
    /*
    CategoryMenuElements[id].forEach(x => {
        menuGrid.appendChild(x);
    })
        */

    menuGrid.replaceChildren(...CategoryMenuElements[id]);

    UpdateTabs();
}


GoToTab(CATEGORIES[0].id);


/**
 * 
 * @param {MenuItem} menuItem 
 * @returns {Element} 
*/
function CreateMenuItemCard(menuItem) {
    // Clone the template
    let btn = MenuItemCardTemplate.cloneNode(true);

    let img = btn.querySelector(".menu-image");
    let h2 = btn.querySelector(".menu-name");
    let p = btn.querySelector(".menu-price");

    img.src = menuItem.icon_path;
    h2.innerText = menuItem.name;
    p.innerText = FormatRupiah(menuItem.price);

    // Remove previous event listeners by replacing the node
    let newBtn = btn.cloneNode(true);
    let newImg = newBtn.querySelector(".menu-image");
    let newH2 = newBtn.querySelector(".menu-name");
    let newP = newBtn.querySelector(".menu-price");

    newImg.src = menuItem.icon_path;
    newH2.innerText = menuItem.name;
    newP.innerText = FormatRupiah(menuItem.price);

    newBtn.onclick = () => {
        SetMenuDialog(menuItem);
        OpenMenuDialog();
    };

    return newBtn;
}

// DEVON REINHART

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
    action: 0,
    cartItemUUID: null,
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

        MenuDialogUI.price.innerText = FormatRupiah(totalPrice);
    },
    changeQuantity: function (value) {
        if (isNaN(value) || value < 1) {
            MenuDialogData.quantity = 1;
        } else if (value > 99) {
            MenuDialogData.quantity = 99;
        } else {
            MenuDialogData.quantity = value;
        }
        MenuDialogData.updateDialogPrice();
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
            Toast.showToast("Cek lagi pilihan!");

            setTimeout(() => {
                unfulfilledCustomization.AlertTitle();
                ShakeElement(elementToShake, 1);
                ShakeElement(dialogMenu, .25);
            }, 750);
            return false;
        }
        // DEVON REINHART

        let customs = [];
        MenuDialogData.customizationControllers.forEach(x => {
            x.Selected.forEach((y, i) => {
                if (y) {
                    customs.push(x.Customization.choices[i].id);
                }
            });
        })
        let cartItem = new CartItem(MenuDialogData.menuItem, customs, MenuDialogData.quantity);
        console.log("adding to cart")
        console.log(cartItem);
        Cart.addItem(cartItem);

        Toast.showToast("Telah ditambahkan ke keranjang!");
        return true;
    }

}
var MenuDialogUI = {
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
    primaryButtonImg: $Q("#mdialog-btn-add-to-cart>img"),
    primaryButtonText: $Q("#mdialog-btn-add-to-cart>p")
};

let temp_animAddToCartAmount = 0;
MenuDialogUI.btn_add2cart.addEventListener("click", (e) => {
    temp_animAddToCartAmount = Cart.getAmountOfItems();
    if (MenuDialogData.cartItemUUID != null) {
        let ci = Cart.Items.find(x => x.uuid == MenuDialogData.cartItemUUID);
        ci.amount = MenuDialogData.quantity;
        let customs = [];
        MenuDialogData.customizationControllers.forEach(x => {
            customs = customs.concat(x.GetSelectionsAsIDArray());
        })
        console.log(customs);

        //Check for same
        let same = Cart.checkForSame(MenuDialogData.menuItem, customs);
        if (same && same.uuid != MenuDialogData.cartItemUUID) {
            same.amount += MenuDialogData.quantity;
            Cart.removeItem(MenuDialogData.cartItemUUID);
        } else {
            ci.setCustoms(customs);
        }

        CloseMenuDialog();
        CartUI.updateCart();
        return;
    }
    if (MenuDialogData.addToCart()) {
        CloseMenuDialog();
        AnimateItemToCart(MenuDialogData.menuItem.icon_path);
    }
});

MenuDialogUI.btn_cancel.addEventListener("click", () => {
    CloseMenuDialog();
})
// DEVON REINHART

MenuDialogUI.quantityInput.addEventListener("input", (e) => {
    let value = parseInt(MenuDialogUI.quantityInput.value);
    if (!isNaN(value)) {
        MenuDialogData.changeQuantity(value);
    }

    if (MenuDialogUI.quantityInput.value === "") {
        //DialogData.quantity = 1; 
    } else {
        MenuDialogUI.quantityInput.value = MenuDialogData.quantity;
    }
});

MenuDialogUI.quantityInput.addEventListener("blur", (e) => {
    if (MenuDialogUI.quantityInput.value === "") {
        //DialogData.quantity = previousValue; // Revert to previous value if blank
        MenuDialogUI.quantityInput.value = MenuDialogData.quantity;
    }
});

MenuDialogUI.quantityReduce.addEventListener("click", (e) => {
    MenuDialogData.changeQuantity(MenuDialogData.quantity - 1);
    MenuDialogUI.quantityInput.value = MenuDialogData.quantity;
});

MenuDialogUI.quantityIncrease.addEventListener("click", (e) => {
    MenuDialogData.changeQuantity(MenuDialogData.quantity + 1);
    MenuDialogUI.quantityInput.value = MenuDialogData.quantity;
});
// DEVON REINHART



/**
 * 
 * @param {MenuItem} menuItem 
 * @param {number} amount 
 * @param {number} action 
 * @param {CartItem|null} cartItem 
 */
function SetMenuDialog(menuItem, preSelections = [], amount = 1, action = 0, cartItem = null) {
    MenuDialogUI.img.src = menuItem.icon_path;
    MenuDialogUI.title.innerText = menuItem.name;
    MenuDialogUI.description.innerText = menuItem.description;
    MenuDialogUI.price.innerText = FormatRupiah(menuItem.price);

    MenuDialogData.menuItem = menuItem;
    MenuDialogData.customizations = menuItem.customizations;
    MenuDialogData.customizationControllers = [];
    MenuDialogData.quantity = amount;
    MenuDialogData.action = action;
    MenuDialogData.cartItemUUID = cartItem;

    MenuDialogUI.quantityInput.value = MenuDialogData.quantity;

    MenuDialogUI.customizations.innerHTML = "";
    MenuDialogData.customizations.forEach((customization) => {
        let [element, controller] = BuildMenuCustomization(customization);
        controller.onChange = [(selected) => {
            controller.Selected = selected;
            MenuDialogData.updateDialogPrice();
        }];
        if (preSelections.length > 0) {
            controller.Customization.choices.forEach((x, i) => {
                if (preSelections.includes(x.id)) {
                    controller.SetSelection(i);
                }
            })
        }
        MenuDialogUI.customizations.appendChild(element);
        MenuDialogData.customizationControllers.push(controller);
    });

    if (MenuDialogData.customizations.length < 1) {
        MenuDialogUI.customizations.classList.add("disabled");
    } else {
        MenuDialogUI.customizations.classList.remove("disabled");

    }

    const PRIMARY_BUTTON_TEXTS = ["Tambah", "Ubah"];
    const PRIMRARY_BUTTON_ICONS = ["assets/icons/checkout/cart_add.svg", "assets/icons/generic/edit.svg"];

    MenuDialogUI.primaryButtonText.innerText = PRIMARY_BUTTON_TEXTS[action];
    MenuDialogUI.primaryButtonImg.src = PRIMRARY_BUTTON_ICONS[action];

    setTimeout(() => {
        MenuDialogUI.customizations.scrollTop = MenuDialogUI.title.offsetTop;
    }, 10);
}
// Cache for customization picker elements by customization id
const CustomizationPickerCache = {};

/**
 * 
 * @param {Customization} customization
 */
function BuildMenuCustomization(customization) {
    let customizationController = new CustomizationController(customization, null, [], [], []);

    customizationController.Selected = Array.from({ length: customization.choices.length }, () => false);

    let mainDiv;
    // Check cache
    if (CustomizationPickerCache[customization.id]) {
        mainDiv = CustomizationPickerCache[customization.id].cloneNode(true);
        const btns = Array.from(mainDiv.querySelectorAll(".option.icon-btn-label"));
        customizationController.Elements = btns;
        btns.forEach((btn, index) => {
            btn.onclick = () => customizationController.SetSelection(index);
        });
    } else {
        mainDiv = document.createElement("div");
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

            btn.onclick = () => customizationController.SetSelection(index);

            customizationController.Elements.push(btn);
            selections.appendChild(btn);
        });

        mainDiv.appendChild(selections);
        // Cache the built element (deep clone to avoid mutation)
        CustomizationPickerCache[customization.id] = mainDiv.cloneNode(true);
    }

    customizationController.MainElement = mainDiv;

    return [mainDiv, customizationController];
}

function AnimateItemToCart(iconPath) {
    animCartImg.src = iconPath;
    animCartImg.classList.add("animate");
    headerCartAmountText.innerText = temp_animAddToCartAmount;

    animCartImg.onanimationend = () => {
        animCartImg.classList.remove("animate");
        headerCartAmountText.innerText = Cart.getAmountOfItems();
    }
}

const TableDialogInput = $I("tabledialog-number");
const TableDialogOK = $I("tabledialog-close");
const TableHeaderButton = $I("header-btn-table");
const TableHeaderText = $I("header-table-number");
TableDialogInput.addEventListener("input", (e) => {
    let value = parseInt(TableDialogInput.value);
    if (!isNaN(value)) {
        TableDialogInput.value = clamp(value, 1, 50);
    } else {
        e.preventDefault();
    }
    TableDialogOK.disabled = (TableDialogInput.value == null || TableDialogInput.value.length == 0)
});

function ShowTableDialog(tablenum = 0) {
    Overlay_AllowClose = false;
    TableDialogInput.value = tablenum > 0 ? tablenum : "";
    TableDialogOK.disabled = (TableDialogInput.value == null || TableDialogInput.value.length == 0)
    OpenDialog(dialogTable);
}

TableDialogOK.onclick = () => {
    Cart.TableNumber = parseInt(TableDialogInput.value);
    TableHeaderText.innerText = Cart.TableNumber;
    CloseDialog(dialogTable);
    LocalSave.SaveCart(Cart.Items, Cart.TableNumber);
    Overlay_AllowClose = true;
}

TableHeaderButton.onclick = () => {
    ShowTableDialog(Cart.TableNumber);
}