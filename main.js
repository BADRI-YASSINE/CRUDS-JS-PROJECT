let products = document.getElementById('products');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');
let deleteAll = document.getElementById('deleteAll');
let search = document.getElementById('search');
let labelSearch = document.getElementById('labelSearch');
let SearchMood = 'products';
let labels = document.getElementsByTagName('label');
let productValidation = document.getElementById('productValidation');
let priceValidation = document.getElementById('priceValidation');
let categoryValidation = document.getElementById('categoryValidation');

// function-total
function CalculTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.classList.remove("bg-primary");
        total.classList.add("bg-success");
    }
    else {
        total.innerHTML = " ";
        total.classList.remove("bg-success");
        total.classList.add("bg-primary");
    }
}

// function-create-validation
let productData;
if (localStorage.productStorage != null) {
    productData = JSON.parse(localStorage.productStorage)
}
else {
    productData = [];
}

function createProduct() {
    let productObject = {
        products: products.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }
    if (products.value != '' && price.value != '' && category.value != '') {
        if (productObject.count > 1) {
            for (let i = 0; i < productObject.count; i++) {
                productData.push(productObject);
            }
        } else {
            productData.push(productObject);
        }
        localStorage.setItem('productStorage', JSON.stringify(productData));
        clearInputs();
        readData();
    } else {
        if (products.value == '') {
            products.classList.add('is-invalid');
            productValidation.classList.add('invalid-feedback');
            productValidation.innerHTML = '* Product is required';
        } else {
            products.classList.remove('is-invalid');
            products.classList.add('is-valid');
            productValidation.classList.remove('invalid-feedback');
            productValidation.innerHTML = '';
        }
        if (price.value == '') {
            price.classList.add('is-invalid');
            priceValidation.classList.add('invalid-feedback');
            priceValidation.innerHTML = '* Price is required';
        } else {
            price.classList.remove('is-invalid');
            price.classList.add('is-valid');
            priceValidation.classList.remove('invalid-feedback');
            priceValidation.innerHTML = '';
        }
        if (category.value == '') {
            category.classList.add('is-invalid');
            categoryValidation.classList.add('invalid-feedback');
            categoryValidation.innerHTML = '* Category is required';
        } else {
            category.classList.remove('is-invalid');
            category.classList.add('is-valid');
            categoryValidation.classList.remove('invalid-feedback');
            categoryValidation.innerHTML = '';
        }
    }
}

create.onclick = createProduct;

// function-clear-inputs-validation
function clearInputs() {
    products.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '0';
    count.value = '';
    category.value = '';
    total.classList.remove("bg-success");
    total.classList.add("bg-primary");
    products.classList.remove('is-invalid');
    products.classList.remove('is-valid');
    productValidation.classList.remove('invalid-feedback');
    productValidation.innerHTML = '';
    price.classList.remove('is-invalid');
    price.classList.remove('is-valid');
    priceValidation.classList.remove('invalid-feedback');
    priceValidation.innerHTML = '';
    category.classList.remove('is-invalid');
    category.classList.remove('is-valid');
    categoryValidation.classList.remove('invalid-feedback');
    categoryValidation.innerHTML = '';
}
// function-read
function readData() {
    let table = '';
    for (let i = 0; i < productData.length; i++) {
        table += `
        <tr>
             <td>${i}</td>
             <td>${productData[i].products}</td>
             <td>${productData[i].price}</td>
             <td>${productData[i].taxes}</td>
             <td>${productData[i].ads}</td>
             <td>${productData[i].discount}</td>
             <td>${productData[i].category}</td>
             <td>${productData[i].total}</td>
             <td><button class="btn btn-primary" onclick="updateProduct(${i})"><i class="fa-solid fa-pen-to-square"></i></button></td>
             <td><button class="btn btn-danger" onclick="deleteProduct(${i})"><i class="fa-solid fa-trash"></i></button></td>
        </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;
    if (productData.length > 0) {
        deleteAll.classList.remove('deletehide');
        deleteAll.classList.add('deleteshow');
        deleteAll.value = `Delete All (${productData.length})`;
    }
    else {
        deleteAll.classList.remove('deleteshow');
        deleteAll.classList.add('deletehide');
        deleteAll.value = `Delete All`;
    }
}
readData()
// function-delete
function deleteProduct(i) {
    productData.splice(i, 1);
    localStorage.setItem('productStorage', JSON.stringify(productData));
    readData();
}
// delete-all
deleteAll.onclick = function () {
    productData = [];
    localStorage.setItem('productStorage', JSON.stringify(productData));
    readData();
}
// function-update
function updateProduct(i) {
    products.value = productData[i].products;
    price.value = productData[i].price;
    taxes.value = productData[i].taxes;
    ads.value = productData[i].ads;
    discount.value = productData[i].discount;
    total.innerHTML = productData[i].total;
    count.value = productData[i].count;
    category.value = productData[i].category;
    productData.splice(i, 1);
    localStorage.setItem('productStorage', JSON.stringify(productData));
    readData();
}
// function-search
function getSearchMood(id) {
    if (id == 'searchProduct') {
        SearchMood = 'products';
        labelSearch.innerHTML = 'Search By Products';
    } else {
        SearchMood = 'category';
        labelSearch.innerHTML = 'Search By Category';
    }
    search.focus();
}

search.oninput = function () {
    let searchValue = search.value.toLowerCase();
    let table = '';
    for (let i = 0; i < productData.length; i++) {
        if (SearchMood == 'products' && productData[i].products.toLowerCase().includes(searchValue)) {
            table += `
            <tr>
                <td>${i}</td>
                <td>${productData[i].products}</td>
                <td>${productData[i].price}</td>
                <td>${productData[i].taxes}</td>
                <td>${productData[i].ads}</td>
                <td>${productData[i].discount}</td>
                <td>${productData[i].category}</td>
                <td>${productData[i].total}</td>
                <td><button class="btn btn-primary" onclick="updateProduct(${i})">Update</button></td>
                <td><button class="btn btn-primary" onclick="deleteProduct(${i})">Delete</button></td>
            </tr>`;
        } else if (SearchMood == 'category' && productData[i].category.toLowerCase().includes(searchValue)) {
            table += `
            <tr>
                <td>${i}</td>
                <td>${productData[i].products}</td>
                <td>${productData[i].price}</td>
                <td>${productData[i].taxes}</td>
                <td>${productData[i].ads}</td>
                <td>${productData[i].discount}</td>
                <td>${productData[i].category}</td>
                <td>${productData[i].total}</td>
                <td><button class="btn btn-primary" onclick="updateProduct(${i})">Update</button></td>
                <td><button class="btn btn-primary" onclick="deleteProduct(${i})">Delete</button></td>
            </tr>`;
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

// function-clean-data
function cleanData() {
    productData = productData.filter(product => product.products && product.price && product.category);
    localStorage.setItem('productStorage', JSON.stringify(productData));
    readData();
}


