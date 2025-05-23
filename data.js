/*
    Berisi kelas-kelas dan data menu, termasuk kategori-kategori dan item-item.
    Ini memudahkan mengubah harga, nama, gambar, dan Kustomisasi.
*/


class MenuCategory {
    /**
     * @param {string} name 
     * @param {MenuItem[]} items
     * @param {string} icon_path
     * @param {string} id 
     */
    constructor(name, items, icon_path, id) {
        this.name = name;
        this.items = items;
        this.icon_path = icon_path;
        this.id = id;
    }
}

class MenuItem {
    /**
     * @param {string} name 
     * @param {int} price 
     * @param {string} description 
     * @param {Customization[]} customizations 
     * @param {string} icon_path 
     * @param {string} id 
     */
    constructor(name, price, description, customizations, icon_path, id) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.customizations = customizations;
        this.icon_path = icon_path;
        this.id = id;
    }

    isFree() {
        return this.price == 0;
    }
}

class Customization {
    /**
     * @param {string} name 
     * @param {Choice[]} choices 
     * @param {string} id 
     * @param {int} max_choices
     * @param {int} min_choices 
     */
    constructor(name, choices, id, max_choices = 1, min_choices = 1) {
        this.name = name;
        this.choices = choices;
        this.max_choices = max_choices;
        this.min_choices = min_choices;
        this.id = id;
    }

    isRequired() {
        return this.min_choices > 0;
    }

    isSingle() {
        return this.max_choices == 1;
    }
}

class Choice {
    /**
     * @param {string} name
     * @param {int} price
    *  @param {string} id 
    *  @param {string | null} shortName
    */
    constructor(name, price, id, shortName) {
        this.name = name;
        this.price = price;
        this.id = id;
        this.shortName = shortName
    }

    isFree() {
        return this.price == 0;
    }
}

class Discount {

    /**
     * 
     * @param {string} name 
     * @param {string} description
     * @param {string} longDescription
     * @param {Function} condition 
     */
    constructor(name, description, longDescription, condition) {
        this.name = name;
        this.description = description;
        this.longDescription = longDescription;
        this.condition = condition;
    }
}

class DiscountedItem {
    /**
     * @param {string} itemId 
     * @param {number} discountGetter 
     */
    constructor(itemId, discountGetter) {
        this.itemId = itemId;
        this.discount = discountGetter;
    }
}

// DEVON REINHART
const CUSTOMIZATION_SUGAR = new Customization(
    "Gula",
    [
        new Choice("No Sugar (0%)", 0, "sugar_0", "Sugar: None (0%)"),
        new Choice("Slight Sugar (25%)", 0, "sugar_25", "Sugar: Slight (25%)"),
        new Choice("Half Sugar (50%)", 0, "sugar_50", "Sugar: Half (50%)"),
        new Choice("Less Sugar (75%)", 0, "sugar_75", "Sugar: Less (75%)"),
        new Choice("Normal Sugar (100%)", 0, "sugar_100", "Sugar: Normal (100%)"),
        new Choice("Extra Sugar (125%)", 0, "sugar_125", "Sugar: Extra (125%)"),
    ],
    "customization_sugar"
);

const CUSTOMIZATION_ICE = new Customization(
    "Es",
    [
        new Choice("Hot", 0, "ice_hot", null),
        new Choice("No Ice", 0, "ice_none", "Ice: None"),
        new Choice("Less Ice", 0, "ice_less", "Ice: Less"),
        new Choice("Normal Ice", 0, "ice_normal", "Ice: Normal"),
        new Choice("Extra Ice", 0, "ice_extra", "Ice: Extra"),
    ],
    "customization_ice"
);

const CUSTOMIZATION_SIZE = new Customization(
    "Ukuran",
    [
        new Choice("Small", 0, "size_small", "Size: Small"),
        new Choice("Medium", 0, "size_medium", "Size: Medium"),
        new Choice("Large", 4000, "size_large", "Size: Large"),
    ],
    "customization_size"
);

const CUSTOMIZATION_TOPPINGS = new Customization(
    "Topping",
    [
        new Choice("Boba", 4000, "topping_boba", null),
        new Choice("Popping Boba", 4500, "topping_poppingboba", null),
        new Choice("Pudding", 5000, "topping_pudding", null),
        new Choice("Grass Jelly", 2000, "topping_grassjelly", null),
        new Choice("Coconut Jelly", 3000, "topping_coconutjelly", null),
        //new Choice("Red Bean", 2000, "topping_redbean", null),
        new Choice("Chia Seed", 1000, "topping_chiaseed", null),
        new Choice("Espresso Shot", 5000, "topping_espressoshot", null),
        new Choice("Ice Cream", 6000, "topping_icecream", null),
    ],
    "customization_toppings",
    5,
    0
);

const CUSTOMIZATION_MILK = new Customization(
    "Susu",
    [
        new Choice("No Milk", 0, "milk_none", "Milk: None"),
        new Choice("Full Cream Milk", 0, "milk_fullcream", "Milk: Full Cream"),
        new Choice("Low Fat Milk", 1000, "milk_lowfat", "Milk: Low Fat"),
        new Choice("Almond Milk", 6000, "milk_almond", "Milk: Almond"),
        new Choice("Soy Milk", 5000, "milk_soy", "Milk: Soy"),
        new Choice("Oat Milk", 5000, "milk_oat", "Milk: Oat"),
        new Choice("Creamer", 2000, "milk_creamer", "Milk: Creamer"),
    ],
    "customization_milk"
);

const CATEGORY_COFFEE = new MenuCategory(
    "Kopi",
    [
        new MenuItem(
            "Espresso",
            15000,
            "Espresso dengan rasa yang kaya dan kuat.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR],
            "assets/menu/kopi/espresso.webp",
            "coffee_espresso"
        ),
        new MenuItem(
            "Americano",
            18000,
            "Espresso yang diencerkan dengan air panas untuk rasa yang lembut.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_ICE, CUSTOMIZATION_SUGAR],
            "assets/menu/kopi/americano.webp",
            "coffee_americano"
        ),
        new MenuItem(
            "Cappuccino",
            25000,
            "Espresso dengan susu kukus dan lapisan busa.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_ICE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/cappuccino.webp",
            "coffee_cappuccino"
        ),
        new MenuItem(
            "Latte",
            25000,
            "Espresso dengan susu kukus dan busa ringan.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_ICE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/latte.webp",
            "coffee_latte"
        ),
        new MenuItem(
            "Mocha",
            28000,
            "Espresso dengan sirup cokelat dan susu kukus.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_ICE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/mocha.webp",
            "coffee_mocha"
        ),
        new MenuItem(
            "Macchiato",
            20000,
            "Espresso dengan sedikit busa susu di atasnya.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_ICE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/macchiato.webp",
            "coffee_macchiato"
        ),
        new MenuItem(
            "Flat White",
            24000,
            "Espresso dengan susu kukus dan tekstur lembut.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_ICE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/flat_white.webp",
            "coffee_flatwhite"
        ),
        new MenuItem(
            "Affogato",
            30000,
            "Espresso yang dituangkan di atas satu scoop es krim vanila.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/affogato.webp",
            "coffee_affogato"
        ),
        new MenuItem(
            "Cold Brew",
            20000,
            "Kopi dingin yang diseduh dengan rasa yang halus dan menyegarkan.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_ICE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/cold_brew.webp",
            "coffee_coldbrew"
        ),
        new MenuItem(
            "Caramel Macchiato",
            32000,
            "Espresso dengan sirup karamel, susu kukus, dan busa.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_ICE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/caramel_macchiato.webp",
            "coffee_caramelmacchiato"
        ),
        new MenuItem(
            "Vanilla Latte",
            30000,
            "Espresso dengan sirup vanila dan susu kukus.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_ICE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/vanilla_latte.webp",
            "coffee_vanillalatte"
        ),
        new MenuItem(
            "Hazelnut Latte",
            30000,
            "Espresso dengan sirup hazelnut dan susu kukus.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_ICE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/hazelnut_latte.webp",
            "coffee_hazelnutlatte"
        ),
        new MenuItem(
            "Ballerina Cappucina",
            2000000,
            "Ballerina Cappuccina, mi-mi-mi-mi. È la moglie di Cappuccino Assassino E ama la musica, la-la-la-la. La sua passione è il Ballerino Lololo.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_ICE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/ballerina.webp",
            "coffee_ballerinacappucina"
        ),
    ],
    "assets/icons/menu/coffee.svg",
    "coffee"
);

//DEVON REINHART

const CATEGORY_NONCOFFEE = new MenuCategory(
    "Non-Kopi",
    [
        new MenuItem(
            "Matcha Latte",
            25000,
            "Minuman berbasis teh hijau matcha dengan susu yang lembut.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_ICE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/nonkopi/matcha_latte.webp",
            "noncoffee_matchalatte"
        ),
        new MenuItem(
            "Chocolate",
            22000,
            "Minuman cokelat hangat yang manis dan lezat.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_ICE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/nonkopi/chocolate.webp",
            "noncoffee_chocolate"
        ),
        new MenuItem(
            "Red Velvet Latte",
            27000,
            "Minuman dengan rasa red velvet yang creamy dan nikmat.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_ICE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/nonkopi/red_velvet_latte.webp",
            "noncoffee_redvelvetlatte"
        ),
        new MenuItem(
            "Taro Latte",
            26000,
            "Minuman berbasis taro dengan rasa manis dan lembut.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_ICE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/nonkopi/taro_latte.webp",
            "noncoffee_tarolatte"
        ),
        new MenuItem(
            "Thai Tea",
            20000,
            "Teh khas Thailand dengan rasa manis dan aroma rempah.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_ICE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/nonkopi/thai_tea.webp",
            "noncoffee_thaitea"
        ),
        new MenuItem(
            "Milk Tea",
            22000,
            "Teh dengan campuran susu yang lembut dan manis.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_ICE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/nonkopi/milk_tea.webp",
            "noncoffee_milktea"
        ),
        new MenuItem(
            "Lemon Tea",
            18000,
            "Teh dengan tambahan lemon segar untuk rasa yang menyegarkan.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_ICE, CUSTOMIZATION_SUGAR],
            "assets/menu/nonkopi/lemon_tea.webp",
            "noncoffee_lemontea"
        ),
        new MenuItem(
            "Honey Lemon",
            20000,
            "Minuman campuran madu dan lemon yang sehat dan menyegarkan.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_ICE, CUSTOMIZATION_SUGAR],
            "assets/menu/nonkopi/honey_lemon.webp",
            "noncoffee_honeylemon"
        ),
        new MenuItem(
            "Green Tea",
            19000,
            "Teh hijau dengan rasa yang ringan dan menenangkan.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_ICE, CUSTOMIZATION_SUGAR],
            "assets/menu/nonkopi/green_tea.webp",
            "noncoffee_greentea"
        ),
        new MenuItem(
            "Yakult Mix",
            25000,
            "Minuman segar dengan campuran Yakult dan buah-buahan.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_ICE, CUSTOMIZATION_SUGAR],
            "assets/menu/nonkopi/yakult_mix.webp",
            "noncoffee_yakultmix"
        )
    ],
    "assets/icons/menu/tea.svg",
    "noncoffee"
);

const CATEGORY_FOOD = new MenuCategory(
    "Makanan",
    [
        new MenuItem(
            "Croissant",
            20000,
            "Roti croissant dengan tekstur renyah dan lembut.",
            [],
            "assets/menu/makanan/croissant.webp",
            "food_croissant"
        ),
        new MenuItem(
            "Chocolate Muffin",
            18000,
            "Muffin cokelat yang manis dan lembut.",
            [],
            "assets/menu/makanan/chocolate_muffin.webp",
            "food_chocolatemuffin"
        ),
        new MenuItem(
            "Cheese Danish",
            22000,
            "Pastry dengan isian keju yang creamy.",
            [],
            "assets/menu/makanan/cheese_danish.webp",
            "food_cheesedanish"
        ),
        new MenuItem(
            "Cinnamon Roll",
            25000,
            "Roti gulung dengan taburan kayu manis dan gula.",
            [],
            "assets/menu/makanan/cinnamon_roll.webp",
            "food_cinnamonroll"
        ),
        new MenuItem(
            "Banana Bread",
            20000,
            "Roti pisang yang lembut dan manis.",
            [],
            "assets/menu/makanan/banana_bread.webp",
            "food_bananabread"
        ),
        new MenuItem(
            "Apple Pie",
            30000,
            "Pai apel dengan rasa manis dan aroma kayu manis.",
            [],
            "assets/menu/makanan/apple_pie.webp",
            "food_applepie"
        ),
        new MenuItem(
            "Butter Scone",
            15000,
            "Scone mentega yang lembut dan gurih.",
            [],
            "assets/menu/makanan/butter_scone.webp",
            "food_butterscone"
        ),
        new MenuItem(
            "Brownie",
            25000,
            "Brownie cokelat yang kaya rasa dan lembut.",
            [],
            "assets/menu/makanan/brownie.webp",
            "food_brownie"
        ),
        new MenuItem(
            "Macaron",
            30000,
            "Kue macaron dengan berbagai rasa manis.",
            [],
            "assets/menu/makanan/macaron.webp",
            "food_macaron"
        ),
        new MenuItem(
            "Cheesecake",
            35000,
            "Cheesecake lembut dengan rasa keju yang kaya.",
            [],
            "assets/menu/makanan/cheesecake.webp",
            "food_cheesecake"
        ),
        new MenuItem(
            "Tiramisu",
            40000,
            "Dessert khas Italia dengan rasa kopi dan keju mascarpone.",
            [],
            "assets/menu/makanan/tiramisu.webp",
            "food_tiramisu"
        ),
        new MenuItem(
            "Pancake",
            25000,
            "Pancake lembut dengan sirup maple dan mentega.",
            [],
            "assets/menu/makanan/pancake.webp",
            "food_pancake"
        ),
        new MenuItem(
            "Waffle",
            27000,
            "Waffle renyah dengan topping pilihan.",
            [],
            "assets/menu/makanan/waffle.webp",
            "food_waffle"
        ),
        new MenuItem(
            "Donut",
            15000,
            "Donat manis dengan berbagai topping.",
            [],
            "assets/menu/makanan/donut.webp",
            "food_donut"
        ),
        new MenuItem(
            "Pudding",
            20000,
            "Pudding lembut dengan berbagai rasa pilihan.",
            [],
            "assets/menu/makanan/pudding.webp",
            "food_pudding"
        ),
        new MenuItem(
            "Creme Brulee",
            35000,
            "Dessert khas Perancis dengan lapisan gula karamel renyah.",
            [],
            "assets/menu/makanan/creme_brulee.webp",
            "food_cremebrulee"
        ),
        new MenuItem(
            "Strawberry Shortcake",
            40000,
            "Kue lembut dengan lapisan krim dan stroberi segar.",
            [],
            "assets/menu/makanan/strawberry_shortcake.webp",
            "food_strawberryshortcake"
        ),
    ],
    "assets/icons/menu/bakery.svg",
    "food"
);



const CATEGORIES = [
    CATEGORY_COFFEE,
    CATEGORY_NONCOFFEE,
    CATEGORY_FOOD
]


const TAX = 0.11;