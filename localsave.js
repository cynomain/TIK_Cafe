const LOCALSAVE_KEYS = {
    TableNumber: "user_table_number",
    Cart: "user_cart",
}

const LocalSave = {
    SaveCart(CartItems, tableNumber) {
        localStorage.setItem(LOCALSAVE_KEYS.TableNumber, tableNumber);
        localStorage.setItem(LOCALSAVE_KEYS.Cart, JSON.stringify(CartItems));
    },
    HasCart() {
        return localStorage.getItem(LOCALSAVE_KEYS.Cart) != null;
    },
    GetTableNumber() {
        return parseInt(localStorage.getItem(LOCALSAVE_KEYS.TableNumber)) ?? 0;
    },
    GetCart() {
        const cart = localStorage.getItem(LOCALSAVE_KEYS.Cart) ?? "[]";
        let array = cart ? JSON.parse(cart) : [];
        let final = [];
        array.forEach(e => {
            let menuItem = null;
            for (let i = 0; i < CATEGORIES.length; i++) {
                let c = CATEGORIES[i];
                let found = c.items.find(x => x.id == e.menuItem.id);
                if (found) {
                    menuItem = found;
                    break;
                }
            }
            if (menuItem === null) {
                console.log("Failed to load CartItem")
                console.log(e);
                return;
            }
            let cartItem = new CartItem(
                menuItem,
                e.selectedCustomizations,
                e.amount
            )
            final.push(cartItem)
        });
        return final;
    }
};
// DEVON REINHART
