const reviews = document.querySelectorAll(".review");
const dots = document.querySelectorAll(".dot");

let current = 0;

function showSlide(index) {
    reviews.forEach((review) => {
        review.classList.remove("active");
    });
    dots.forEach((dot) => {
        dot.classList.remove("active");
    });

    reviews[index].classList.add("active");
    dots[index].classList.add("active");
}

document.querySelector(".next").onclick = () => {
    current++;

    if (current >= reviews.length) {
        current = 0;
    }

    showSlide(current);
};

document.querySelector(".prev").onclick = () => {
    current--;

    if (current < 0) {
        current = reviews.length - 1;
    }

    showSlide(current);
};

setInterval(() => {
    current++;

    if (current >= reviews.length) {
        current = 0;
    }

    showSlide(current);
}, 3000);

const cartIcon = document.querySelector(".cart-icon");
const cartTab = document.querySelector(".cart-tab");
const cartBtn = document.querySelector(".close-btn");
const cardList = document.querySelector(".card-list");
const cartlist = document.querySelector(".cart-list");
const cartTotal = document.querySelector(".cart-total");
const cartValue = document.querySelector(".cart-value");
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");
const bars = document.querySelector(".fa-bars");

cartIcon.addEventListener("click", () =>
    cartTab.classList.add("cart-tab-active"),
);
cartBtn.addEventListener("click", () =>
    cartTab.classList.remove("cart-tab-active"),
);
hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("mobile-menu-active");
    bars.classList.toggle("fa-bars");
    bars.classList.toggle("fa-xmark");
});

let productList = [];
let cartProduct = [];

const showCard = () => {
    productList.forEach((product) => {
        const orderCard = document.createElement("div");
        orderCard.classList.add("order-card");

        orderCard.innerHTML = `
        <div class="card-image">
            <img src=${product.image} />
        </div>
        <h4>${product.name}</h4>
        <h4 class="price">${product.price}</h4>
        <a href="#" class="btn card-btn">Add to Cart</a>`;

        cardList.appendChild(orderCard);

        const cardBtn = orderCard.querySelector(".card-btn");
        cardBtn.addEventListener("click", (e) => {
            e.preventDefault();
            alert('Add to cart "Successfull"');

            addToCart(product);
        });
    });
};

const updateCartTotal = () => {
    let total = 0;

    const cartItems = cartlist.querySelectorAll(".cart-list-1");

    cartItems.forEach((item) => {
        const price = parseFloat(
            item.querySelector(".item-price").textContent.replace("$", ""),
        );

        total += price;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
};

const addToCart = (product) => {
    const existingProduct = cartProduct.find((item) => item.id === product.id);
    if (existingProduct) {
        alert("Item already in your cart!");
        return;
    }

    cartProduct.push(product);

    let quantity = 1;
    let price = parseFloat(product.price.replace("$", ""));

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-list-1");

    cartItem.innerHTML = `
    <div class="item">
        <img src="${product.image}" />
    </div>
    <div>
        <h4 style="font-size: 20px;">${product.name}</h4>
        <h4 class="item-price">${product.price}</h4>
    </div>
    <div class="quantity-btn">
        <a href="#" class="cart-quantity minus">
            <i class="fa-solid fa-minus"></i>
        </a>
        <h4 class="quantity-value">${quantity}</h4>
        <a href="#" class="cart-quantity plus">
            <i class="fa-solid fa-plus"></i>
        </a>
    </div>`;

    cartlist.appendChild(cartItem);
    updateCartTotal();
    updateCartValue();

    const plusBtn = cartItem.querySelector(".plus");
    const quantityValue = cartItem.querySelector(".quantity-value");
    const itemTotal = cartItem.querySelector(".item-price");

    plusBtn.addEventListener("click", (e) => {
        e.preventDefault();
        quantity++;
        quantityValue.textContent = quantity;
        itemTotal.textContent = `$${(price * quantity).toFixed(2)}`;

        updateCartTotal();
        updateCartValue();
    });

    const minusBtn = cartItem.querySelector(".minus");

    minusBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (quantity > 1) {
            quantity--;
            quantityValue.textContent = quantity;
            itemTotal.textContent = `$${(price * quantity).toFixed(2)}`;

            updateCartTotal();
            updateCartValue();
        } else {
            cartItem.remove();
            cartProduct = cartProduct.filter((item) => item.id !== product.id);

            updateCartTotal();
            updateCartValue();
        }
    });
};

const updateCartValue = () => {
    let totalItems = 0;

    const cartItems = cartlist.querySelectorAll(".cart-list-1");

    cartItems.forEach((item) => {
        const quantity = parseInt(
            item.querySelector(".quantity-value").textContent,
        );

        totalItems += quantity;
    });

    cartValue.textContent = totalItems;
};

const initApp = () => {
    fetch("products.json")
        .then((Response) => Response.json())
        .then((data) => {
            productList = data;
            showCard();
        });
};

initApp();
