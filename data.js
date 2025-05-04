const CUSTOMIZATION_SUGAR = new Customization(
    "Gula",
    [
        new Choice("No Sugar (0%)", 0),
        new Choice("Slight Sugar (25%)", 0),
        new Choice("Half Sugar (50%)", 0),
        new Choice("Less Sugar (75%)", 0),
        new Choice("Normal Sugar (100%)", 0),
        new Choice("Extra Sugar (125%)", 0),
    ]
)

const CUSTOMIZATION_ICE = new Customization(
    "Es",
    [
        new Choice("Hot", 0),
        new Choice("No Ice", 0),
        new Choice("Less Ice", 0),
        new Choice("Normal Ice", 0),
        new Choice("Extra Ice", 0),
    ]
)

const CUSTOMIZATION_SIZE = new Customization(
    "Ukuran",
    [
        new Choice("Small", 0),
        new Choice("Medium", 0),
        new Choice("Large", 0),
    ]
)

const CUSTOMIZATION_TOPPINGS = new Customization(
    "Topping",
    [
        new Choice("Boba", 5000),
        new Choice("Pudding", 5000),
        new Choice("Grass Jelly", 5000),
        new Choice("Coconut Jelly", 5000),
        new Choice("Red Bean", 5000),
        new Choice("Chia Seed", 5000),
        new Choice("Aloe Vera", 5000),
        new Choice("Espresso Shot", 5000),
        new Choice("Ice Cream", 6000),
    ],
    max_choices = 3,
    min_choices = 0
)

const CUSTOMIZATION_MILK = new Customization(
    "Susu",
    [
        new Choice("No Milk", 0),
        new Choice("Full Cream Milk", 0),
        new Choice("Low Fat Milk", 1000),
        new Choice("Almond Milk", 6000),
        new Choice("Soy Milk", 5000),
        new Choice("Oat Milk", 5000),
    ]
)

const CATEGORY_COFFEE = new MenuCategory(
    "Kopi",
    [
        new MenuItem(
            "Espresso",
            15000,
            "Espresso dengan rasa yang kaya dan kuat.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR],
            "assets/menu/kopi/espresso.png"
        ),
        new MenuItem(
            "Americano",
            18000,
            "Espresso yang diencerkan dengan air panas untuk rasa yang lembut.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR],
            "assets/menu/kopi/americano.png"
        ),
        new MenuItem(
            "Cappuccino",
            25000,
            "Espresso dengan susu kukus dan lapisan busa.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/cappuccino.png"
        ),
        new MenuItem(
            "Latte",
            25000,
            "Espresso dengan susu kukus dan busa ringan.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/latte.png"
        ),
        new MenuItem(
            "Mocha",
            28000,
            "Espresso dengan sirup cokelat dan susu kukus.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/mocha.png"
        ),
        new MenuItem(
            "Macchiato",
            20000,
            "Espresso dengan sedikit busa susu di atasnya.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/macchiato.png"
        ),
        new MenuItem(
            "Flat White",
            24000,
            "Espresso dengan susu kukus dan tekstur lembut.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/flat_white.png"
        ),
        new MenuItem(
            "Affogato",
            30000,
            "Espresso yang dituangkan di atas satu scoop es krim vanila.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/affogato.png"
        ),
        new MenuItem(
            "Cold Brew",
            20000,
            "Kopi dingin yang diseduh dengan rasa yang halus dan menyegarkan.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_ICE, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/cold_brew.png"
        ),
        new MenuItem(
            "Iced Americano",
            20000,
            "Espresso dengan air dingin dan es.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_ICE, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/iced_americano.png"
        ),
        new MenuItem(
            "Iced Latte",
            27000,
            "Espresso dengan susu dingin dan es.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_ICE, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/iced_latte.png"
        ),
        new MenuItem(
            "Iced Mocha",
            30000,
            "Espresso dengan sirup cokelat, susu dingin, dan es.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_ICE, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/iced_mocha.png"
        ),
        new MenuItem(
            "Caramel Macchiato",
            32000,
            "Espresso dengan sirup karamel, susu kukus, dan busa.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/caramel_macchiato.png"
        ),
        new MenuItem(
            "Vanilla Latte",
            30000,
            "Espresso dengan sirup vanila dan susu kukus.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/vanilla_latte.png"
        ),
        new MenuItem(
            "Hazelnut Latte",
            30000,
            "Espresso dengan sirup hazelnut dan susu kukus.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/kopi/hazelnut_latte.png"
        )
    ],
    icon_path = "assets/icons/menu/coffee.svg"
)

const CATEGORY_NONCOFFEE = new MenuCategory(
    "Non-Kopi",
    [
        new MenuItem(
            "Matcha Latte",
            25000,
            "Minuman berbasis teh hijau matcha dengan susu yang lembut.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/nonkopi/matcha_latte.png"
        ),
        new MenuItem(
            "Chocolate",
            22000,
            "Minuman cokelat hangat yang manis dan lezat.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/nonkopi/chocolate.png"
        ),
        new MenuItem(
            "Red Velvet Latte",
            27000,
            "Minuman dengan rasa red velvet yang creamy dan nikmat.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/nonkopi/red_velvet_latte.png"
        ),
        new MenuItem(
            "Taro Latte",
            26000,
            "Minuman berbasis taro dengan rasa manis dan lembut.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/nonkopi/taro_latte.png"
        ),
        new MenuItem(
            "Thai Tea",
            20000,
            "Teh khas Thailand dengan rasa manis dan aroma rempah.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/nonkopi/thai_tea.png"
        ),
        new MenuItem(
            "Milk Tea",
            22000,
            "Teh dengan campuran susu yang lembut dan manis.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_MILK, CUSTOMIZATION_TOPPINGS],
            "assets/menu/nonkopi/milk_tea.png"
        ),
        new MenuItem(
            "Lemon Tea",
            18000,
            "Teh dengan tambahan lemon segar untuk rasa yang menyegarkan.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_ICE],
            "assets/menu/nonkopi/lemon_tea.png"
        ),
        new MenuItem(
            "Honey Lemon",
            20000,
            "Minuman campuran madu dan lemon yang sehat dan menyegarkan.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_ICE],
            "assets/menu/nonkopi/honey_lemon.png"
        ),
        new MenuItem(
            "Green Tea",
            19000,
            "Teh hijau dengan rasa yang ringan dan menenangkan.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_ICE],
            "assets/menu/nonkopi/green_tea.png"
        ),
        new MenuItem(
            "Yakult Mix",
            25000,
            "Minuman segar dengan campuran Yakult dan buah-buahan.",
            [CUSTOMIZATION_SIZE, CUSTOMIZATION_SUGAR, CUSTOMIZATION_ICE],
            "assets/menu/nonkopi/yakult_mix.png"
        )
    ], icon_path = "assets/icons/menu/tea.svg",);

const CATEGORY_FOOD = new MenuCategory(
    "Makanan",
    [
        new MenuItem(
            "Croissant",
            20000,
            "Roti croissant dengan tekstur renyah dan lembut.",
            [],
            "assets/menu/makanan/croissant.png"
        ),
        new MenuItem(
            "Chocolate Muffin",
            18000,
            "Muffin cokelat yang manis dan lembut.",
            [],
            "assets/menu/makanan/chocolate_muffin.png"
        ),
        new MenuItem(
            "Cheese Danish",
            22000,
            "Pastry dengan isian keju yang creamy.",
            [],
            "assets/menu/makanan/cheese_danish.png"
        ),
        new MenuItem(
            "Cinnamon Roll",
            25000,
            "Roti gulung dengan taburan kayu manis dan gula.",
            [],
            "assets/menu/makanan/cinnamon_roll.png"
        ),
        new MenuItem(
            "Banana Bread",
            20000,
            "Roti pisang yang lembut dan manis.",
            [],
            "assets/menu/makanan/banana_bread.png"
        ),
        new MenuItem(
            "Apple Pie",
            30000,
            "Pai apel dengan rasa manis dan aroma kayu manis.",
            [],
            "assets/menu/makanan/apple_pie.png"
        ),
        new MenuItem(
            "Butter Scone",
            15000,
            "Scone mentega yang lembut dan gurih.",
            [],
            "assets/menu/makanan/butter_scone.png"
        ),
        new MenuItem(
            "Brownie",
            25000,
            "Brownie cokelat yang kaya rasa dan lembut.",
            [],
            "assets/menu/makanan/brownie.png"
        ),
        new MenuItem(
            "Macaron",
            30000,
            "Kue macaron dengan berbagai rasa manis.",
            [],
            "assets/menu/makanan/macaron.png"
        ),
        new MenuItem(
            "Cheesecake",
            35000,
            "Cheesecake lembut dengan rasa keju yang kaya.",
            [],
            "assets/menu/makanan/cheesecake.png"
        ),
        new MenuItem(
            "Tiramisu",
            40000,
            "Dessert khas Italia dengan rasa kopi dan keju mascarpone.",
            [],
            "assets/menu/makanan/tiramisu.png"
        ),
        new MenuItem(
            "Pancake",
            25000,
            "Pancake lembut dengan sirup maple dan mentega.",
            [],
            "assets/menu/makanan/pancake.png"
        ),
        new MenuItem(
            "Waffle",
            27000,
            "Waffle renyah dengan topping pilihan.",
            [],
            "assets/menu/makanan/waffle.png"
        ),
        new MenuItem(
            "Donut",
            15000,
            "Donat manis dengan berbagai topping.",
            [],
            "assets/menu/makanan/donut.png"
        )
    ], icon_path = "assets/icons/menu/food.svg",);



const CATEGORIES = [
    CATEGORY_COFFEE,
    CATEGORY_NONCOFFEE,
    CATEGORY_FOOD
]

class MenuCategory {
    /**
     * @param {string} name - The name of the menu category.
     * @param {MenuItem[]} items - The items in the menu category.
     * @param {string} icon_path - The path to the icon for the menu category.
     */
    constructor(name, items, icon_path) {
        this.name = name;
        this.items = items;
        this.icon_path = icon_path;
    }
}

class MenuItem {
    /**
     * @param {string} name - The name of the menu item.
     * @param {int} price - The price of the menu item.
     * @param {string} description - The description of the menu item.
     * @param {Customization[]} customizations - The available customizations for the menu item.
     * @param {string} icon_path - The path to the icon for the menu item.
     */
    constructor(name, price, description, customizations, icon_path) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.customizations = customizations;
        this.icon_path = icon_path;
    }
}

class Customization {
    /**
     * @param {string} name - The name of the customization.
     * @param {Choice[]} choices - The available choices for the customization.
     * @param {int} max_choices - The maximum number of choices that can be selected.
     * @param {int} min_choices - The minimum number of choices that must be selected.
     */
    constructor(name, choices, max_choices = 1, min_choices = 1) {
        this.name = name;
        this.choices = choices;
        this.max_choices = max_choices;
        this.min_choices = min_choices;
    }
}

class Choice {
    /**
     * @param {string} name - The name of the choice.
     * @param {int} price - The price of the choice.
     */
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}