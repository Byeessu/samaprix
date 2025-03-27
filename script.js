document.getElementById("search").addEventListener("input", function() {
    let filter = this.value.toLowerCase();
    let items = document.querySelectorAll("#products li");
    items.forEach(item => {
        if (item.innerText.toLowerCase().includes(filter)) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });
});