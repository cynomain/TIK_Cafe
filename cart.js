const dialogCart = $I("dialog-cart");
const cartItemAmount = $I("cdialog-amountitems");
const headerButtonCart = $I("header-btn-cart");
const headerCartAmountText = $I("header-cart-amount");

const cartItemsContainer = $Q(".cart-items");

/**
 * @param {MenuItem} menuItem
 * @param {string[]} selectedCustomizations
 * @param {number} amount
 */
class CartItem {
  constructor(menuItem, selectedCustomizations, amount) {
    this.menuItem = menuItem;
    this.selectedCustomizations = selectedCustomizations;
    this.amount = amount;
    this.uuid = crypto.randomUUID();
  }
}

class CartItemCardController {
    constructor (cartItem, mainElement, image, editButton, tableHost, addButton, removeButton, quantityText) {
        this.cartItem = cartItem;
        this.mainElement = mainElement;
        this.image = image;
        this.editButton = editButton;
        this.tableHost = tableHost;
        this.addButton = addButton;
        this.removeButton = removeButton;
        this.quantityText = quantityText;
    }

    addQuantity(amount) {
        if (Cart.Items.find(x => x.uuid)){
            
        }
    }
}

headerButtonCart.addEventListener("click", () => {
  OpenCartDialog();
});

// DEVON REINHART

var Cart = {
  Items: [],
  addItem(item) {
    let selectedCustomizations = item.selectedCustomizations;
    let menuItem = item.menuItem;
    let amount = item.amount;
    let sortedCustomizations = [...selectedCustomizations].sort();
    let existingItem = this.Items.find(
      (item) =>
        item.menuItem.id === menuItem.id &&
        JSON.stringify([...item.selectedCustomizations].sort()) ===
          JSON.stringify(sortedCustomizations)
    );

    if (existingItem) {
      existingItem.amount += amount;
      return existingItem;
    } else {
      let newItem = new CartItem(menuItem, sortedCustomizations, amount);
      this.Items.push(newItem);
      return newItem;
    }
  },

  updateItem(uuid, updatedData) {
    let item = this.Items.find((item) => item.uuid === uuid);
    if (item) {
      Object.assign(item, updatedData);
    }
    return item;
  },

  removeItem(uuid) {
    this.Items = this.Items.filter((item) => item.uuid !== uuid);
  },
};

var CartUI = {
  ItemAmount: $I("cdialog-amountitems"),
  ItemsHost: $Q("cart-items"),
  ItemElements: {},
  updateCart: () => {
    this.ItemAmount.innerText =
      Cart.Items.length + " item" + Cart.Items.length > 1 ? "s" : "";
    for (uuid in ItemElements) {

    }
  },
};

/**
 *
 * @param {CartItem} cartItem
 */
function CreateCartItemElement(cartItem) {
  const makeRow = (first, second, main = false) =>
    `<tr>
            <td ${main ? 'class="main"' : ""}><p>${first}</p></td>
            <td><p>${second}</p></td>
        </tr>
        `;

  let cartItemsText =
    makeRow(cartItem.menuItem.name, cartItem.menuItem.price, true) +
    cartItem.selectedCustomizations
      .map((c) => {
        cartItem.menuItem.customizations.some((x) =>
          x.choices.find((x) => x.id == c)
        );
      })
      .join("");

  let final = `
        <div class="cart-item">
            <div class="vertical">
              <img src="${cartItem.menuItem.icon_path}" class="cartmenu-image"/>
              <button class="edit icon-btn-label background iprimary" id="btn-edit">
                <img src="assets/icons/generic/edit.svg" />
                <p>Edit</p>
              </button>
            </div>
            <table class="cart-table">
              ${cartItemsText}
            </table>
            <div class="vertical quantity">
              <button class="icon-btn primary add" id="btn-q-add">
                <img src="assets/icons/generic/add.svg" />
              </button>
              <p id="q-quantity">10</p>
              <button class="icon-btn secondary remove" id="btn-q-remove">
                <img src="assets/icons/generic/remove.svg" />
              </button>
            </div>
          </div>
          `.trim();
  let el = htmlToNode(final);
}
CreateCartItemElement(
  new CartItem(CATEGORY_COFFEE.items[5], ["size_small", "sugar_less"])
);
