// Daftar menu
const menuItems = [
    { name: "Martabak Telur Ayam", price: 30000 },
    { name: "Martabak Mesir", price: 35000 },
    { name: "Martabak Telur", price: 25000 },
    { name: "Roti Cane Kari", price: 20000 },
    { name: "Roti Cane Gula", price: 15000 },
];

// Keranjang belanja
let cart = [];

// Elemen HTML
const menuList = document.getElementById("menu-list");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

// Menampilkan daftar menu
menuItems.forEach((item, index) => {
    const menuItem = document.createElement("div");
    menuItem.className = "menu-item";
    menuItem.innerHTML = `
        <span>${item.name} - Rp ${item.price.toLocaleString()}</span>
        <button onclick="addToCart(${index})">Tambah</button>
    `;
    menuList.appendChild(menuItem);
});

// Menambahkan item ke keranjang
function addToCart(index) {
    const item = menuItems[index];
    cart.push(item);

    // Tambahkan ke daftar keranjang
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerText = '${item.name} - Rp ${item.price.toLocaleString()}';
    cartItems.appendChild(cartItem);

    // Perbarui total harga
    updateTotal();
}

// Menghitung total harga
function updateTotal() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalPrice.innerText = 'Total: Rp ${total.toLocaleString()}';
}

// Cetak struk
function printReceipt() {
    if (cart.length === 0) {
        alert("Keranjang kosong. Tambahkan pesanan terlebih dahulu!");
        return;
    }

    // Membuat struk pembelian
    let receipt = "=== Struk Pembelian ===\n";
    cart.forEach((item, index) => {
        receipt += '${index + 1}. ${item.name} - Rp ${item.price.toLocaleString()}\n';
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    receipt += '\nTotal: Rp ${total.toLocaleString()}\n\nTerima kasih atas pembeliannya!';

    // Membuka jendela baru untuk mencetak struk
    const receiptWindow = window.open("", "Struk Pembelian", "width=400,height=600");
    receiptWindow.document.write(`
        <pre>${receipt}</pre>
        <button onclick="window.print()">Cetak Struk</button>
    `);
    receiptWindow.document.close();

    // Reset keranjang
    resetCart();
}

// Reset keranjang
function resetCart() {
    cart = [];
    cartItems.innerHTML = "";
    totalPrice.innerText = "Total: Rp 0";
}