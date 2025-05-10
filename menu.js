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

var DialogData = {
    menuItem: null,
    customization: null,
    quantity: 1,
}

function SetMenuDialog(menuItem) {
    let btn_add2cart = $I("mdialog-btn-add-to-cart");
    let btn_cancel = $I("mdialog-btn-cancel");
    let img = $I("mdialog-img");
    let title = $I("mdialog-title");
    let description = $I("mdialog-description");
    let price = $I("mdialog-price");
    let customizations = $I("mdialog-customizations");

    let quantityInput = $I("mdialog-q-quantity");
    let quantityReduce = $I("mdialog-q-btn-reduce");
    let quantityIncrease = $I("mdialog-q-btn-Increase");

    img.src = menuItem.imgPath;
    title.innerText = menuItem.name;
    price.innerText = FormatRupiah(menuItem.price);
    DialogData.menuItem = menuItem;
    DialogData.customization = menuItem.customizations;
    DialogData.quantity = 1;
}

/**
 * 
 * @param {Customization} customization
 */
function BuildMenuCustomization(customization) {
    const ICON_RADIO_UNCHECKED = "assets/icons/generic/radio_unchecked.svg";
    const ICON_RADIO_CHECKED = "assets/icons/generic/radio_checked.svg";
    const ICON_CHECKBOX_UNCHECKED = "assets/icons/generic/checkbox_no.svg";
    const ICON_CHECKBOX_CHECKED = "assets/icons/generic/checkbox_yes.svg";

    let CustomizationController = {
        Customization: customization,
        MainElement: null,
        Selected: [],
        Elements: [],
        SetSelection: function (index) {
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

                        this.Elements[index].classList.add("shake");

                        this.Elements[index].addEventListener("animationend", () => {
                            this.Elements[index].classList.remove("shake");
                        });
                    }
                }
            }

        },
        UpdateElement: function (index) {
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
        },
        UpdateAllElements: function () {
            this.Elements.forEach((element, index) => {
                this.UpdateElement(index);
            });
        },

        AlertTitle: function () {
            let title = this.MainElement.querySelector("&>*:first-child");

            title.classList.add("flash-red");
            title.addEventListener("animationend", () => {
                title.classList.remove("flash-red");
            });
        }
    }

    CustomizationController.Selected = Array.from({ length: customization.choices.length }, () => false);

    let mainDiv = document.createElement("div");
    mainDiv.className = "customization selection";

    let instruction = "(";
    instruction += (customization.isRequired() ? "wajib" : "opsional") + ", ";
    instruction += "pilih ";
    // Hanya 1
    if (customization.isSingle()) {
        instruction += "salah satu";
    } else {
        instruction += customization.min_choices + " hingga " + customization.max_choices + " pilihan";
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

        btn.addEventListener("click", (e) => {
            CustomizationController.SetSelection(index);
        });

        CustomizationController.Elements.push(btn);
        selections.appendChild(btn);
    });

    mainDiv.appendChild(selections);
    CustomizationController.MainElement = mainDiv;

    return [mainDiv, CustomizationController];
}

let test = BuildMenuCustomization(CUSTOMIZATION_TOPPINGS);
let test2 = BuildMenuCustomization(CUSTOMIZATION_MILK);
$Q(".customizations").appendChild(test[0]);
$Q(".customizations").appendChild(test2[0]);
