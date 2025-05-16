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
        return localStorage.getItem(LOCALSAVE_KEYS.TableNumber) ?? 0;
    },
    GetCart() {
        const cart = localStorage.getItem(LOCALSAVE_KEYS.Cart) ?? "[]";
        let array = cart ? JSON.parse(cart) : [];
        let final = [];
        array.forEach(e => {
            final.push(Object.assign(new CartItem(), e))
        });
        return final;
    }
};
