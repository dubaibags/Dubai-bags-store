const phone = "971542461192";

const sheetURL =
"https://docs.google.com/spreadsheets/d/101ylvyeNgylkRFMf4TnnNncKqwjwpJ6bq9hIMbsDO6g/export?format=csv";

const urlParams = new URLSearchParams(window.location.search);
const selectedCategory = urlParams.get("category");

let cart = JSON.parse(localStorage.getItem("dubaiBagsCart")) || [];

function saveCart() {
    localStorage.setItem("dubaiBagsCart", JSON.stringify(cart));
    displayCart();
}

function addToCart(product, price) {

    const existing = cart.find(item => item.product === product);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            product: product,
            price: Number(price),
            quantity: 1
        });
    }

    saveCart();

    alert(product + " added to cart");
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
}

function displayCart() {

    const cartItems = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");

    if (!cartItems || !totalElement) return;

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">
                <p>
                    <b>${item.product}</b><br>
                    AED ${item.price} × ${item.quantity}
                    = AED ${itemTotal}
                </p>

                <button onclick="removeFromCart(${index})">
                    Remove
                </button>
            </div>
        `;
    });

    totalElement.textContent = "AED " + total;
}

function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty");
        return;
    }

    let text = "Hello Dubai Bags\n\nI want to order:\n\n";

    let total = 0;

    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;

        text += `${item.product} - AED ${item.price} × ${item.quantity} = AED ${itemTotal}\n`;

        total += itemTotal;
    });

    text += `\nTotal: AED ${total}`;

    window.open(
        `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
        "_blank"
    );
}

Papa.parse(sheetURL, {

    download: true,
    header: true,
    skipEmptyLines: true,

    complete: function(results) {

        const list = document.getElementById("product-list");

        if (list) {

            list.innerHTML = "";

            if (selectedCategory) {

                const title = document.getElementById("category-title");

                if (title) {
                    title.textContent = selectedCategory;
                }
            }

            results.data.forEach(item => {

                if (!item.Product) return;

                if (
                    String(item.Available || "")
                        .trim()
                        .toLowerCase() !== "yes"
                ) return;

                if (
                    selectedCategory &&
                    String(item.Category || "")
                        .trim()
                        .toLowerCase() !==
                    selectedCategory.trim().toLowerCase()
                ) return;

                const product = String(item.Product).trim();
                const price = String(item.Price).trim();
                const image = String(item.Image || "").trim();

                list.innerHTML += `
                    <div class="card">

                        <img src="${image}" alt="${product}">

                        <h3>${product}</h3>

                        <p><b>AED ${price}</b></p>

                        <button onclick='addToCart(${JSON.stringify(product)}, ${JSON.stringify(price)})'>
                            Add to Cart
                        </button>

                        <button onclick='order(${JSON.stringify(product)}, ${JSON.stringify(price)})'>
                            Order on WhatsApp
                        </button>

                    </div>
                `;
            });
        }

        displayCart();
    }
});

function order(product, price) {

    const text =
`Hello Dubai Bags

I want to order:

${product}

Price: AED ${price}`;

    window.open(
        `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
        "_blank"
    );
}

document.addEventListener("DOMContentLoaded", function() {

    const checkoutButton = document.getElementById("checkout");

    if (checkoutButton) {
        checkoutButton.onclick = checkout;
    }

    displayCart();
});
