const phone = "971542461192";

const sheetURL =
"https://docs.google.com/spreadsheets/d/101ylvyeNgylkRFMf4TnnNncKqwjwpJ6bq9hIMbsDO6g/export?format=csv";

Papa.parse(sheetURL, {
    download: true,
    header: true,
    complete: function(results){

        const list = document.getElementById("product-list");

        list.innerHTML = "";

        results.data.forEach(item=>{

            if(item.Available !== "Yes") return;

            list.innerHTML += `
            <div class="card">

            <img src="${item.Image}" style="width:100%;border-radius:10px;">

            <h3>${item.Product}</h3>

            <p><b>AED ${item.Price}</b></p>

            <button onclick="order('${item.Product}',${item.Price})">
            Add To Cart
            </button>

            </div>
            `;
        });

    }
});

function order(product,price){

let text=`Hello Dubai Bags

I want to order:

${product}

Price: AED ${price}`;

window.open(

`https://wa.me/${phone}?text=${encodeURIComponent(text)}`,

"_blank");

}
