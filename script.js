
const phone = "971542461192";

document.getElementById("checkout").addEventListener("click", function () {
    const message = "Hello, I want to order from Dubai Bags.";
    window.open(
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
        "_blank"
    );
});
