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
    * @param {string} id 
    */
    constructor(name, price, id) {
        this.name = name;
        this.price = price;
        this.id = id;
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
        new Choice("No Sugar (0%)", 0, "sugar_0"),
        new Choice("Slight Sugar (25%)", 0, "sugar_25"),
        new Choice("Half Sugar (50%)", 0, "sugar_50"),
        new Choice("Less Sugar (75%)", 0, "sugar_75"),
        new Choice("Normal Sugar (100%)", 0, "sugar_100"),
        new Choice("Extra Sugar (125%)", 0, "sugar_125"),
    ],
    "customization_sugar"
);

const CUSTOMIZATION_ICE = new Customization(
    "Es",
    [
        new Choice("Hot", 0, "ice_hot"),
        new Choice("No Ice", 0, "ice_none"),
        new Choice("Less Ice", 0, "ice_less"),
        new Choice("Normal Ice", 0, "ice_normal"),
        new Choice("Extra Ice", 0, "ice_extra"),
    ],
    "customization_ice"
);

const CUSTOMIZATION_SIZE = new Customization(
    "Ukuran",
    [
        new Choice("Small", 0, "size_small"),
        new Choice("Medium", 0, "size_medium"),
        new Choice("Large", 4000, "size_large"),
    ],
    "customization_size"
);

const CUSTOMIZATION_TOPPINGS = new Customization(
    "Topping",
    [
        new Choice("Boba", 4000, "topping_boba"),
        new Choice("Popping Boba", 4500, "topping_poppingboba"),
        new Choice("Pudding", 5000, "topping_pudding"),
        new Choice("Grass Jelly", 2000, "topping_grassjelly"),
        new Choice("Coconut Jelly", 3000, "topping_coconutjelly"),
        //new Choice("Red Bean", 2000, "topping_redbean"),
        new Choice("Chia Seed", 1000, "topping_chiaseed"),
        new Choice("Espresso Shot", 5000, "topping_espressoshot"),
        new Choice("Ice Cream", 6000, "topping_icecream"),
    ],
    "customization_toppings",
    5,
    0
);

const CUSTOMIZATION_MILK = new Customization(
    "Susu",
    [
        new Choice("No Milk", 0, "milk_none"),
        new Choice("Full Cream Milk", 0, "milk_fullcream"),
        new Choice("Low Fat Milk", 1000, "milk_lowfat"),
        new Choice("Almond Milk", 6000, "milk_almond"),
        new Choice("Soy Milk", 5000, "milk_soy"),
        new Choice("Oat Milk", 5000, "milk_oat"),
        new Choice("Creamer", 2000, "milk_creamer"),
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
            "assets/menu/kopi/espresso.jpg",
            "coffee_espresso"
        ),
        new MenuItem(
            "Americano",
            18000,
            "Espresso yang diencerkan dengan air panas untuk rasa yang lembut.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR],
            "assets/menu/kopi/americano.jpg",
            "coffee_americano"
        ),
        new MenuItem(
            "Cappuccino",
            25000,
            "Espresso dengan susu kukus dan lapisan busa.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/cappuccino.jpg",
            "coffee_cappuccino"
        ),
        new MenuItem(
            "Latte",
            25000,
            "Espresso dengan susu kukus dan busa ringan.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/latte.jpg",
            "coffee_latte"
        ),
        new MenuItem(
            "Mocha",
            28000,
            "Espresso dengan sirup cokelat dan susu kukus.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/mocha.jpg",
            "coffee_mocha"
        ),
        new MenuItem(
            "Macchiato",
            20000,
            "Espresso dengan sedikit busa susu di atasnya.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/macchiato.jpg",
            "coffee_macchiato"
        ),
        new MenuItem(
            "Flat White",
            24000,
            "Espresso dengan susu kukus dan tekstur lembut.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/flat_white.jpg",
            "coffee_flatwhite"
        ),
        new MenuItem(
            "Affogato",
            30000,
            "Espresso yang dituangkan di atas satu scoop es krim vanila.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/affogato.jpg",
            "coffee_affogato"
        ),
        new MenuItem(
            "Cold Brew",
            20000,
            "Kopi dingin yang diseduh dengan rasa yang halus dan menyegarkan.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_ICE, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/cold_brew.jpg",
            "coffee_coldbrew"
        ),
        new MenuItem(
            "Caramel Macchiato",
            32000,
            "Espresso dengan sirup karamel, susu kukus, dan busa.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/caramel_macchiato.jpg",
            "coffee_caramelmacchiato"
        ),
        new MenuItem(
            "Vanilla Latte",
            30000,
            "Espresso dengan sirup vanila dan susu kukus.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/vanilla_latte.jpg",
            "coffee_vanillalatte"
        ),
        new MenuItem(
            "Hazelnut Latte",
            30000,
            "Espresso dengan sirup hazelnut dan susu kukus.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/hazelnut_latte.jpg",
            "coffee_hazelnutlatte"
        ),
        new MenuItem(
            "Ballerina Cappucina",
            2000000,
            ">:D",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_ICE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/ballerina.png",
            "coffee_ballerinacappucina"
        ),
    ],
    "assets/icons/menu/coffee.svg",
    "coffee"
);

const CATEGORY_NONCOFFEE = new MenuCategory(
    "Non-Kopi",
    [
        new MenuItem(
            "Matcha Latte",
            25000,
            "Minuman berbasis teh hijau matcha dengan susu yang lembut.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/nonkopi/matcha_latte.jpg",
            "noncoffee_matchalatte"
        ),
        new MenuItem(
            "Chocolate",
            22000,
            "Minuman cokelat hangat yang manis dan lezat.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/nonkopi/chocolate.jpg",
            "noncoffee_chocolate"
        ),
        new MenuItem(
            "Red Velvet Latte",
            27000,
            "Minuman dengan rasa red velvet yang creamy dan nikmat.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/nonkopi/red_velvet_latte.jpg",
            "noncoffee_redvelvetlatte"
        ),
        new MenuItem(
            "Taro Latte",
            26000,
            "Minuman berbasis taro dengan rasa manis dan lembut.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/nonkopi/taro_latte.jpg",
            "noncoffee_tarolatte"
        ),
        new MenuItem(
            "Thai Tea",
            20000,
            "Teh khas Thailand dengan rasa manis dan aroma rempah.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/nonkopi/thai_tea.jpg",
            "noncoffee_thaitea"
        ),
        new MenuItem(
            "Milk Tea",
            22000,
            "Teh dengan campuran susu yang lembut dan manis.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/nonkopi/milk_tea.jpg",
            "noncoffee_milktea"
        ),
        new MenuItem(
            "Lemon Tea",
            18000,
            "Teh dengan tambahan lemon segar untuk rasa yang menyegarkan.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_ICE],
            "assets/menu/nonkopi/lemon_tea.jpg",
            "noncoffee_lemontea"
        ),
        new MenuItem(
            "Honey Lemon",
            20000,
            "Minuman campuran madu dan lemon yang sehat dan menyegarkan.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_ICE],
            "assets/menu/nonkopi/honey_lemon.jpg",
            "noncoffee_honeylemon"
        ),
        new MenuItem(
            "Green Tea",
            19000,
            "Teh hijau dengan rasa yang ringan dan menenangkan.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_ICE],
            "assets/menu/nonkopi/green_tea.jpg",
            "noncoffee_greentea"
        ),
        new MenuItem(
            "Yakult Mix",
            25000,
            "Minuman segar dengan campuran Yakult dan buah-buahan.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_ICE],
            "assets/menu/nonkopi/yakult_mix.jpg",
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
            "assets/menu/makanan/croissant.jpg",
            "food_croissant"
        ),
        new MenuItem(
            "Chocolate Muffin",
            18000,
            "Muffin cokelat yang manis dan lembut.",
            [],
            "assets/menu/makanan/chocolate_muffin.jpg",
            "food_chocolatemuffin"
        ),
        new MenuItem(
            "Cheese Danish",
            22000,
            "Pastry dengan isian keju yang creamy.",
            [],
            "assets/menu/makanan/cheese_danish.jpg",
            "food_cheesedanish"
        ),
        new MenuItem(
            "Cinnamon Roll",
            25000,
            "Roti gulung dengan taburan kayu manis dan gula.",
            [],
            "assets/menu/makanan/cinnamon_roll.jpg",
            "food_cinnamonroll"
        ),
        new MenuItem(
            "Banana Bread",
            20000,
            "Roti pisang yang lembut dan manis.",
            [],
            "assets/menu/makanan/banana_bread.jpg",
            "food_bananabread"
        ),
        new MenuItem(
            "Apple Pie",
            30000,
            "Pai apel dengan rasa manis dan aroma kayu manis.",
            [],
            "assets/menu/makanan/apple_pie.jpg",
            "food_applepie"
        ),
        new MenuItem(
            "Butter Scone",
            15000,
            "Scone mentega yang lembut dan gurih.",
            [],
            "assets/menu/makanan/butter_scone.jpg",
            "food_butterscone"
        ),
        new MenuItem(
            "Brownie",
            25000,
            "Brownie cokelat yang kaya rasa dan lembut.",
            [],
            "assets/menu/makanan/brownie.jpg",
            "food_brownie"
        ),
        new MenuItem(
            "Macaron",
            30000,
            "Kue macaron dengan berbagai rasa manis.",
            [],
            "assets/menu/makanan/macaron.jpg",
            "food_macaron"
        ),
        new MenuItem(
            "Cheesecake",
            35000,
            "Cheesecake lembut dengan rasa keju yang kaya.",
            [],
            "assets/menu/makanan/cheesecake.jpg",
            "food_cheesecake"
        ),
        new MenuItem(
            "Tiramisu",
            40000,
            "Dessert khas Italia dengan rasa kopi dan keju mascarpone.",
            [],
            "assets/menu/makanan/tiramisu.jpg",
            "food_tiramisu"
        ),
        new MenuItem(
            "Pancake",
            25000,
            "Pancake lembut dengan sirup maple dan mentega.",
            [],
            "assets/menu/makanan/pancake.jpg",
            "food_pancake"
        ),
        new MenuItem(
            "Waffle",
            27000,
            "Waffle renyah dengan topping pilihan.",
            [],
            "assets/menu/makanan/waffle.jpg",
            "food_waffle"
        ),
        new MenuItem(
            "Donut",
            15000,
            "Donat manis dengan berbagai topping.",
            [],
            "assets/menu/makanan/donut.jpg",
            "food_donut"
        ),
        new MenuItem(
            "Pudding",
            20000,
            "Pudding lembut dengan berbagai rasa pilihan.",
            [],
            "assets/menu/makanan/pudding.jpg",
            "food_pudding"
        ),
        new MenuItem(
            "Creme Brulee",
            35000,
            "Dessert khas Perancis dengan lapisan gula karamel renyah.",
            [],
            "assets/menu/makanan/creme_brulee.jpg",
            "food_cremebrulee"
        ),
        new MenuItem(
            "Strawberry Shortcake",
            40000,
            "Kue lembut dengan lapisan krim dan stroberi segar.",
            [],
            "assets/menu/makanan/strawberry_shortcake.jpg",
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


const TAX = 0.12;