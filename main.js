let currentProducts = products;
const productSection = document.querySelector('.products')
const searchBar = document.querySelector('.search-bar-input')
const emptyState = document.querySelector('.empty-state')
let basket = []

let categories = new Set();

const renderProducts = (items) => {
    // clear list 
    productSection.innerHTML = ''
    // get all products 
    for (let i = 0; i < items.length; i++) {
        // create add class and render products 
        const NewProduct = document.createElement('div');
        NewProduct.classList = `product-item ${items[i].sale ? 'on-sale': ''}`;
        NewProduct.innerHTML = `
        <img src="${items[i].image}" alt="product-image">
        <p class="product-name">${items[i].name}</p>
        <p class="product-descriotion">${items[i].description}</p>
        <div class="product-price">
            <p class="price">${items[i].price.toFixed(2)}zł</p>
            <p class="price-sale">${(items[i].price - items[i].saleAmount).toFixed(2)} zł</p>
        </div>
        <button data-id="${items[i].id}" class="product-add-to-cart-btn">Dodaj do koszyka</button>
        <p class="product-item-sale-info">Promocja</p>`;

        productSection.appendChild(NewProduct)
    }
}

const renderCategories = (items) => {

    for (let i = 0; i < items.length; i++) {
        // remove duplicates from array 
        categories.add(items[i].category)
    }
    // console.log(categories)

    const categoriesItems = document.querySelector('.categories-items')
    categories = ['Wszystkie', ...categories]
    // console.log(categories)

    categories.forEach((category, index) => {
        const NewCategory = document.createElement('button')
        NewCategory.innerHTML = category
        NewCategory.dataset.category = category;

        index === 0 ? NewCategory.classList.add('active') : ''

        categoriesItems.appendChild(NewCategory)
    })

}
document.onload = renderProducts(currentProducts)
document.onload = renderCategories(currentProducts)


const categoriesButtons = document.querySelectorAll('.categories-items button')

categoriesButtons.forEach(btn => btn.addEventListener('click', (e) => {
    const category = e.target.dataset.category


    // remove class from all buttons and add only to clicked 
    categoriesButtons.forEach(btn => btn.classList.remove('active'))
    e.target.classList.add('active')

    currentProducts = products;


    if (category === 'Wszystkie') {
        currentProducts = products
    } else {
        currentProducts = currentProducts.filter((product) => product.category === category);
    }


    renderProducts(currentProducts)
}));

// Searching products 

searchBar.addEventListener('input', (e) => {
    let search = e.target.value

    const foundProducts = currentProducts.filter((product) => {
        if (product.name.toLowerCase().includes(search.toLowerCase())) {
            return product
        }
    })

    foundProducts.length === 0 ? emptyState.classList.add('active') : emptyState.classList.remove('active');
    renderProducts(foundProducts)
})


// added product to basked 
const addToBasketButtons = document.querySelectorAll('.product-add-to-cart-btn')

const addToBasket = (e) => {
    const selectedId = parseInt(e.target.dataset.id)

    const key = currentProducts.findIndex((product) => product.id === selectedId)
    basket.push(currentProducts.at(key))

    let basketTotal = basket.reduce((sum, product) => {
        return sum += product.price
    }, 0)

    basketTotal = basketTotal.toFixed(2)


    const cartAmount = document.querySelector('.cart-amount')

    cartAmount.innerHTML = `${basketTotal} zł`;
}

addToBasketButtons.forEach((btn) => btn.addEventListener('click', addToBasket))