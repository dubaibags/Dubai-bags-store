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

Papa.parse(sheetURL, {
    download: true,
    header: true,
    skipEmptyLines: true,

    complete: function(results){

        const list = document.getElementById("product-list");

        list.innerHTML = "";

        results.data.forEach(item=>{

            if(!item.Product) return;

            if(String(item.Available).trim().toLowerCase()!="yes") return;

            list.innerHTML += `
            <div class="card" data-category="${item.Category}">
                <img src="${String(item.Image).trim()}" alt="${item.Product}">
                <h3>${item.Product}</h3>
                <p><b>AED ${item.Price}</b></p>
                <button onclick="order('${item.Product}','${item.Price}')">
                    Order on WhatsApp
                </button>
            </div>
            `;

        });

    }

});
