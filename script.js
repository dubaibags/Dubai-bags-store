const phone = "971542461192";

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

const sheetURL =
"https://docs.google.com/spreadsheets/d/101ylvyeNgylkRFMf4TnnNncKqwjwpJ6bq9hIMbsDO6g/export?format=csv";

const urlParams = new URLSearchParams(window.location.search);
const selectedCategory = urlParams.get("category");

Papa.parse(sheetURL, {
    download: true,
    header: true,
    skipEmptyLines: true,

    complete: function(results) {

        const list = document.getElementById("product-list");

        if (!list) return;

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
                    .toLowerCase() !== selectedCategory
                    .trim()
                    .toLowerCase()
            ) return;

            list.innerHTML += `
            <div class="card">
                <img src="${String(item.Image || "").trim()}" alt="${item.Product}">
                <h3>${item.Product}</h3>
                <p><b>AED ${item.Price}</b></p>

                <button onclick="order('${String(item.Product).replace(/'/g, "\\'")}','${item.Price}')">
                    Order on WhatsApp
                </button>
            </div>
            `;
        });

    }
});
