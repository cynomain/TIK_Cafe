let cartDialog = $I("dialog-cart");
let cartItemAmount = $I("cdialog-amountitems");

let cartItemsContainer = $Q(".cart-items")

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

// DEVON REINHART

var Cart = {
    Items: [],
    addItem(menuItem, selectedCustomizations, amount) {
        let sortedCustomizations = [...selectedCustomizations].sort();
        let existingItem = this.Items.find(item =>
            item.menuItem.id === menuItem.id &&
            JSON.stringify([...item.selectedCustomizations].sort()) === JSON.stringify(sortedCustomizations)
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
        let item = this.Items.find(item => item.uuid === uuid);
        if (item) {
            Object.assign(item, updatedData);
        }
        return item;
    },

    removeItem(uuid) {
        this.Items = this.Items.filter(item => item.uuid !== uuid);
    }
}