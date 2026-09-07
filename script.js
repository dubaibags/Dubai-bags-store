
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

fetch(sheetURL)
.then(res => res.text())
.then(data => {
    console.log(data);
});
