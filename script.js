
const phone = "971542461192";

document.getElementById("checkout").addEventListener("click", function () {
    const message = "Hello, I want to order from Dubai Bags.";
    window.open(
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
        "_blank"
    );
});
const sheetURL =
"https://docs.google.com/spreadsheets/d/101ylvyeNgylkRFMf4TnnNncKqwjwpJ6bq9hIMbsDO6g/export?format=csv";

Papa.parse(sheetURL, {
    download: true,
    header: true,
    complete: function(results) {

     
        const container = document.getElementById("product-list");
        container.innerHTML = "";

        results.data.forEach(product => {

            if (product.Available !== "Yes") return;

            container.innerHTML += `
                <div class="card">
                    <img src="${product.Image}" alt="${product.Product}" width="180">
                    <h3>${product.Product}</h3>
                    <p>AED ${product.Price}</p>
                    <button>Add to Cart</button>
                </div>
            `;
        });

    }
});
