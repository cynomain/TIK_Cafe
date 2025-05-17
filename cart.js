const cartItemAmount = $I("cdialog-amountitems");
const headerButtonCart = $I("header-btn-cart");
const headerCartAmountText = $I("header-cart-amount");

const cartItemsContainer = $Q(".cart-items");

const ICON_REMOVE = "assets/icons/generic/remove.svg";
const ICON_TRASH = "assets/icons/generic/delete.svg";

class CartItem {
  /**
 * @param {MenuItem} menuItem
 * @param {string[]} selectedCustomizations
 * @param {number} amount
 */
  constructor(menuItem, selectedCustomizations, amount) {
    this.menuItem = menuItem;
    this.selectedCustomizations = selectedCustomizations;
    this.amount = amount;
    this.uuid = crypto.randomUUID();
  }

  setCustoms(customs) {
    this.selectedCustomizations = [...customs].sort();
  }

  getSinglePrice() {
    let price = this.menuItem.price;
    this.selectedCustomizations.forEach((c) => {
      const customization = this.menuItem.customizations.find((x) =>
        x.choices.some((choice) => choice.id == c)
      );
      if (customization) {
        const choice = customization.choices.find((choice) => choice.id == c);
        if (choice) {
          price += choice.price;
        }
      }
    });
    return price;
  }

  getFinalPrice() {
    return this.getSinglePrice() * this.amount;
  }
}

class TableController {
  /**
   * 
   * @param {HTMLTableElement} tableHost 
   * @param {[][]} elements 
   */
  constructor(tableHost, elements) {
    this.tableHost = tableHost;
    this.elements = elements;

    this.updateElements();
  }

  updateElements() {
    let children = this.tableHost.querySelectorAll("tr");

    if (children.length > this.elements.length) {
      for (let i = children.length - 1; i >= this.elements.length; i--) {
        const c = children[i];
        c.remove();
      }
    }

    if (children.length < this.elements.length) {
      for (let i = children.length; i < this.elements.length; i++) {
        const e = this.elements[i];
        let row = this.createRowElement(e[0], e[1], e.length > 2 ? e[2] : false);
        this.tableHost.appendChild(row);
      }
      children = this.tableHost.querySelectorAll("tr");
    }

    for (let i = 0; i < this.elements.length; i++) {
      const e = this.elements[i];
      const c = children[i];
      let childchildren = c.children;
      let firstchild = childchildren[0];
      let secondchild = childchildren[1];
      let firstP = firstchild.children[0];
      let secondP = secondchild.children[0];
      firstP.innerText = e[0];
      secondP.innerText = e[1];
      if (e.length > 2 && e[2]) {
        firstchild.classList.add("main");
      } else {
        firstchild.classList.remove("main");
      }
    }
  }

  createRowElement(first, second, main = false) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    if (main) td1.classList.add("main");
    const p1 = document.createElement("p");
    p1.textContent = first;
    td1.appendChild(p1);

    const td2 = document.createElement("td");
    const p2 = document.createElement("p");
    p2.textContent = second;
    td2.appendChild(p2);

    tr.appendChild(td1);
    tr.appendChild(td2);
    return tr;
  }
}

class CartItemCardController {
  /**
   * 
   * @param {CartItem} cartItem 
   * @param {HTMLDivElement} mainElement 
   * @param {HTMLImageElement} image 
   * @param {HTMLButtonElement} editButton 
   * @param {HTMLTableElement} tableHost 
   * @param {HTMLButtonElement} addButton 
   * @param {HTMLButtonElement} removeButton 
   * @param {HTMLParagraphElement} quantityText 
   * @param {TableController} tableController
   */
  constructor(cartItem, mainElement, image, editButton, tableHost, addButton, removeButton, quantityText, tableController) {
    this.cartItem = cartItem;
    this.mainElement = mainElement;
    this.image = image;
    this.editButton = editButton;
    this.tableHost = tableHost;
    this.addButton = addButton;
    this.removeButton = removeButton;
    this.quantityText = quantityText;
    this.tableController = tableController;
    addButton.onclick = () => {
      this.addQuantity(1);
    };

    removeButton.onclick = () => {
      this.addQuantity(-1);
    };

    editButton.onclick = () => {
      this.openEditMenu();
    };

    this.removeButton.children[0].src = this.cartItem.amount <= 1 ? ICON_TRASH : ICON_REMOVE;

  }

  setItem(cartItem) {
    this.cartItem = cartItem;
    this.updateElements();
  }

  addQuantity(amount) {
    this.cartItem.amount = clamp(this.cartItem.amount + amount, 0, 99);
    if (this.cartItem.amount < 1) {
      //Wait confirm
      ShowMessage("Hapus " + this.cartItem.menuItem.name + "?",
        "Apakah anda ingin menghapus item ini? Pilihan anda juga akan terhapus.",
        true,
        null,
        () => { this.cartItem.amount = 1 },
        () => {
          this.destroyAnimation(
            () => {
              this.removeCartItem();
              Toast.showToast(`${this.cartItem.menuItem.name} dihapus dari keranjang`);
            }
          )
        }
      );
      return;
    }
    this.updateElements();
    CartUI.updateTotals();

  }
  // DEVON REINHART

  destroyAnimation(after) {
    this.mainElement.classList.add("destroyed");
    this.mainElement.addEventListener("transitionend", (e) => {
      //call only once
      if (e.propertyName == "transform") {
        after();
      }
    });
  }

  openEditMenu() {
    SetMenuDialog(this.cartItem.menuItem, this.cartItem.selectedCustomizations, this.cartItem.amount, 1, this.cartItem.uuid);
    OpenMenuDialog(true);
  }

  destroyElements() {
    this.mainElement.remove();
  }

  removeCartItem() {
    Cart.removeItem(this.cartItem.uuid);
    this.destroyElements();
  }

  cartItemExists() {
    return Cart.Items.some(x => x.uuid == this.cartItem.uuid);
  }

  destroyIfNonExistant() {
    if (!this.cartItemExists()) {
      this.destroyElements();
    }
  }

  updateElements() {
    this.image.src = this.cartItem.menuItem.icon_path;
    this.quantityText.innerText = this.cartItem.amount;
    let rows = GetCartItemRows(this.cartItem);
    this.tableController.elements = rows;
    this.tableController.updateElements();
    CartUI.updateItemCounters();
    this.removeButton.children[0].src = this.cartItem.amount <= 1 ? ICON_TRASH : ICON_REMOVE;
  }
}

headerButtonCart.addEventListener("click", () => {
  OpenCartDialog();
});

// DEVON REINHART

var Cart = {
  TableNumber: 0,
  Items: [],
  checkForSame(menuItem, customizations) {
    let sortedCustomizations = [...customizations].sort();
    let existingItem = Cart.Items.find(
      (item) =>
        item.menuItem.id === menuItem.id &&
        JSON.stringify([...item.selectedCustomizations].sort()) ===
        JSON.stringify(sortedCustomizations)
    );
    return existingItem;
  },
  addItem(item) {
    let selectedCustomizations = item.selectedCustomizations;
    let menuItem = item.menuItem;
    let amount = item.amount;
    let existingItem = this.checkForSame(item.menuItem, selectedCustomizations);

    if (existingItem) {
      existingItem.amount += amount;
      CartUI.updateCart();
      LocalSave.SaveCart(Cart.Items, Cart.TableNumber);

      return existingItem;
    }

    let newItem = new CartItem(menuItem, selectedCustomizations, amount);
    Cart.Items.push(newItem);
    CartUI.updateCart();
    LocalSave.SaveCart(Cart.Items, Cart.TableNumber);

    return newItem;
  },

  removeItem(uuid) {
    let index = Cart.Items.findIndex(x => x.uuid == uuid);
    if (index != -1) {
      Cart.Items.splice(index, 1);
      LocalSave.SaveCart(Cart.Items, Cart.TableNumber);
      CartUI.updateCart();
      return true;
    }
    else {
      return false;
    }
  },

  calculateSubTotal() {
    let total = 0;
    Cart.Items.forEach(x => { total += x.getFinalPrice(); });
    return total;
  },
  calculateTax(price) {
    return price * (TAX);
  },
  calculateTotal() {
    let sub = Cart.calculateSubTotal();
    return sub + Cart.calculateTax(sub);
  },
  getAmountOfItems() {
    let count = 0;
    Cart.Items.forEach(x => {
      count += x.amount;
    })
    return count;
  },
  finishPurchase() {
    ShowMessage("Pesan?", "Apakah anda yakin untuk memesan menu-menu ini?\nTotal pembayaran: " + FormatRupiah(Cart.calculateTotal()) + ". \nIni akan ditambahkan ke bill anda.", true, null, null, () => {
      downloadTextFile(GenerateReceipt(Cart.Items), `struk-belanja-${Cart.TableNumber}.txt`);
      Cart.Items = [];
      LocalSave.SaveCart(Cart.Items, Cart.TableNumber);
      CartUI.updateCart();
      ShowMessage("Pesanan Diterima!", "Pesanan anda akan segera diantar ke meja " + Cart.TableNumber + ".", false, null, null, null, "assets/icons/generic/check.svg");
      CloseCartDialog();
    }, "assets/icons/generic/question.svg")


  }
};
function GenerateReceipt(CartItems) {
  function padRight(str, len) {
    return str + " ".repeat(Math.max(0, len - str.length));
  }
  function padLeft(str, len) {
    return " ".repeat(Math.max(0, len - str.length)) + str;
  }

  let time0 = performance.now();
  let nameWidth = 0, qtyWidth = 0, priceWidth = 0, totalWidth = 0;
  CartItems.forEach((item) => {
    nameWidth = Math.max(nameWidth, item.menuItem.name.length);
    qtyWidth = Math.max(qtyWidth, (`x${item.amount}`).length);
    priceWidth = Math.max(priceWidth, FormatRupiah(item.getSinglePrice()).length);
    totalWidth = Math.max(totalWidth, FormatRupiah(item.getFinalPrice()).length);
    item.selectedCustomizations.forEach((c) => {
      const customization = item.menuItem.customizations.find((x) =>
        x.choices.some((choice) => choice.id == c)
      );
      if (customization) {
        const choice = customization.choices.find((choice) => choice.id == c);
        if (choice) {
          nameWidth = Math.max(nameWidth, 3 + choice.name.length); // for " - "
          priceWidth = Math.max(priceWidth, FormatRupiah(choice.price).length);
        }
      }
    });
  });

  // Calculate the full width for the header/footer lines
  const col1 = nameWidth + 3; // item name
  const col2 = qtyWidth + 2;  // quantity
  const col3 = 2 + priceWidth; // "@ " + price
  const totalLineWidth = col1 + col2 + col3;

  let lines = [];
  const CafeName = "Cafe Lorem Ipsum";
  let titleEqLength = (totalLineWidth - CafeName.length - 2) / 2;
  lines.push("=".repeat(titleEqLength) + "  " + CafeName + "  " + "=".repeat(titleEqLength));
  const now = new Date();
  const dateStr = now.toLocaleDateString();
  const timeStr = now.toLocaleTimeString();
  const dateTimeStr = `${dateStr} ${timeStr}`;
  lines.push(
    padLeft("", Math.floor((totalLineWidth - dateTimeStr.length) / 2)) + dateTimeStr
  );

  const meja = "Meja " + Cart.TableNumber;
  lines.push(
    padLeft("", Math.floor((totalLineWidth - meja.length) / 2)) + meja
  );

  lines.push("");
  CartItems.forEach((item) => {
    // Center the datetime and table number
    if (lines.length === 2) {
      // Center dateTimeStr
      lines[1] = padLeft("", Math.floor((totalLineWidth - dateTimeStr.length) / 2)) + dateTimeStr;
    }
    if (lines.length === 3) {
      // Center meja
      lines[2] = padLeft("", Math.floor((totalLineWidth - meja.length) / 2)) + meja;
    }

    let line =
      padRight(`${item.menuItem.name}`, col1) +
      padRight(`x${item.amount}`, col2) +
      "@ " +
      padLeft(FormatRupiah(item.getSinglePrice()), priceWidth);
    lines.push(line);
    item.selectedCustomizations.forEach((c) => {
      const customization = item.menuItem.customizations.find((x) =>
        x.choices.some((choice) => choice.id == c)
      );
      if (customization) {
        const choice = customization.choices.find((choice) => choice.id == c);
        if (choice) {
          lines.push(
            padRight(`   - ${choice.name}`, col1 + col2) +
            padLeft(FormatRupiah(choice.price), priceWidth + 2)
          );
        }
      }
    });
    // Align "Total:" label and value with the price column
    lines.push(
      padRight("     Total:", col1 + col2) +
      padLeft(FormatRupiah(item.getFinalPrice()), priceWidth + 2)
    );
    lines.push("");
  });
  let subtotal = Cart.calculateSubTotal();
  let tax = Cart.calculateTax(subtotal);
  let total = Cart.calculateTotal();
  lines.push(
    padRight("Subtotal:", col1 + col2) +
    padLeft(FormatRupiah(subtotal), priceWidth + 2)
  );
  lines.push(
    padRight(`Pajak (${(TAX * 100).toFixed(0)}%):`, col1 + col2) +
    padLeft(FormatRupiah(tax), priceWidth + 2)
  );
  lines.push(
    padRight("TOTAL:", col1 + col2) +
    padLeft(FormatRupiah(total), priceWidth + 2)
  );
  lines.push("=".repeat(totalLineWidth));
  let time1 = performance.now();
  console.log("Generate receipt took " + (time1 - time0) + " ms");
  return lines.join("\n");
}

function downloadTextFile(text, filename) {
  const blob = new Blob([text], { type: "text/plain;charset=UTF-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
}
// DEVON REINHART

var CartUI = {
  ItemAmount: $I("cdialog-amountitems"),
  ItemsHost: $Q(".cart-items"),
  ItemElements: {},
  PriceTableController: null,
  FinishButton: $I("cdialog-btn-buy"),
  updateItemCounters: () => {
    let amountOfItems = Cart.getAmountOfItems();
    headerCartAmountText.innerText = amountOfItems;
    CartUI.ItemAmount.innerText = amountOfItems > 0 ? (amountOfItems + " item") : "Kosong";
  },
  updateTotals: () => {
    let sub = Cart.calculateSubTotal();
    let tax = Cart.calculateTax(sub);
    CartUI.PriceTableController.elements[0][1] = FormatRupiah(sub);
    CartUI.PriceTableController.elements[1][1] = FormatRupiah(tax);
    CartUI.PriceTableController.elements[2][1] = FormatRupiah(sub + tax);
    CartUI.PriceTableController.updateElements();
  },
  updateCart: () => {
    CartUI.updateItemCounters();
    for (uuid in CartUI.ItemElements) {
      let find = Cart.Items.find(x => x.uuid == uuid);
      if (find === null || find === undefined) {
        CartUI.ItemElements[uuid].removeCartItem();
        CartUI.ItemElements[uuid].destroyElements();
        delete CartUI.ItemElements[uuid];
        continue;
      }

      CartUI.ItemElements[uuid].updateElements();
    }

    for (let i = 0; i < Cart.Items.length; i++) {
      const item = Cart.Items[i];
      if (!Object.keys(CartUI.ItemElements).includes(item.uuid)) {
        //need to create more
        let cartController = CreateCartItemController(item);
        CartUI.ItemElements[item.uuid] = cartController;
        CartUI.ItemsHost.appendChild(cartController.mainElement);
        continue;
      }
      CartUI.ItemElements[item.uuid].updateElements();
    }

    CartUI.updateTotals();
    CartUI.FinishButton.disabled = Cart.Items.length < 1;
  },


};

CartUI.ItemsHost.innerText = "";

let priceTableHost = $Q(".totals>.cart-table");
CartUI.PriceTableController = new TableController(priceTableHost, [
  ["Subtotal", "-"],
  ["Pajak (" + (TAX * 100) + "%)", "-"],
  ["Total", "-", true]
]);

/**
 * 
 * @param {CartItem} cartItem 
 */
function GetCartItemRows(cartItem) {
  let tableRows = [[cartItem.menuItem.name, FormatRupiah(cartItem.menuItem.price), true]];
  cartItem.selectedCustomizations.forEach((c) => {
    const customization = cartItem.menuItem.customizations.find((x) =>
      x.choices.some((choice) => choice.id == c)
    );
    if (customization) {
      const choice = customization.choices.find((choice) => choice.id == c);
      if (choice) {
        tableRows.push(["- " + choice.name, FormatRupiah(choice.price)]);
      }
    }
  });
  tableRows.push([
    cartItem.amount > 1 ? `  Total (${cartItem.amount})` : "Total",
    FormatRupiah(cartItem.getFinalPrice())
  ])
  return tableRows;
}

/**
 *
 * @param {CartItem} cartItem
 */
function CreateCartItemController(cartItem) {

  // Create main cart item container
  const container = document.createElement("div");
  container.className = "cart-item";

  // Left vertical section (image + edit button)
  const vertical = document.createElement("div");
  vertical.className = "vertical";

  const img = document.createElement("img");
  img.src = cartItem.menuItem.icon_path;
  img.className = "cartmenu-image";
  vertical.appendChild(img);

  const editBtn = document.createElement("button");
  editBtn.className = "edit icon-btn-label background iprimary";
  editBtn.id = "btn-edit";
  const editIcon = document.createElement("img");
  editIcon.src = "assets/icons/generic/edit.svg";
  editBtn.appendChild(editIcon);
  const editText = document.createElement("p");
  editText.textContent = "Ubah";
  editBtn.appendChild(editText);
  vertical.appendChild(editBtn);

  container.appendChild(vertical);

  const table = document.createElement("table");
  table.className = "cart-table";


  let tableController = new TableController(table, GetCartItemRows(cartItem));

  container.appendChild(table);

  const quantityDiv = document.createElement("div");
  quantityDiv.className = "vertical quantity";

  const addBtn = document.createElement("button");
  addBtn.className = "icon-btn primary add";
  addBtn.id = "btn-q-add";
  const addIcon = document.createElement("img");
  addIcon.src = "assets/icons/generic/add.svg";
  addBtn.appendChild(addIcon);
  quantityDiv.appendChild(addBtn);

  const quantityText = document.createElement("p");
  quantityText.id = "q-quantity";
  quantityText.textContent = cartItem.amount;
  quantityDiv.appendChild(quantityText);

  const removeBtn = document.createElement("button");
  removeBtn.className = "icon-btn secondary remove";
  removeBtn.id = "btn-q-remove";
  const removeIcon = document.createElement("img");
  removeIcon.src = "assets/icons/generic/remove.svg";
  removeBtn.appendChild(removeIcon);
  quantityDiv.appendChild(removeBtn);

  container.appendChild(quantityDiv);

  let cartController = new CartItemCardController(cartItem, container, img, editBtn, table, addBtn, removeBtn, quantityText, tableController);
  return cartController;
}

$I("cdialog-btn-close").addEventListener("click", () => {
  CloseCartDialog();
});

$I("cdialog-btn-buy").addEventListener("click", () => {
  Cart.finishPurchase();
})

Cart.TableNumber = LocalSave.GetTableNumber();
Cart.Items = LocalSave.GetCart();
TableHeaderText.innerText = Cart.TableNumber;

CartUI.updateCart();