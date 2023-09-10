let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'iPad',
        image: '1.jpeg',
        price: 80000
    },
    {
        id: 2,
        name: 'Air Pods',
        image: '2.jpeg',
        price: 15000
    },
    {
        id: 3,
        name: 'Fire TV Stick',
        image: '3.jpeg',
        price: 3000
    },
    {
        id: 4,
        name: 'Samsung Galaxy Z fold',
        image: '4.jpeg',
        price: 180000
    },
    {
        id: 5,
        name: 'Google Home',
        image: '5.jpeg',
        price: 4000
    },
    {
        id: 6,
        name: 'Samsung Curved LED TV',
        image: '6.jpeg',
        price: 400000   
    }
];

let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    alert("Added to cart")
    reloadCard();
}
function checkout(price){
    console.log(price)
    if(price != 0){
        listCards = [];
        alert("Purchase Successful!")
        reloadCard();
    }
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    // total.innerText = totalPrice.toLocaleString();
    var tempPrice = totalPrice;
    total.innerHTML = `<button style="background: transparent; border: none; width: 100%; height: 100%; font-weight: bold; font-size: large" onclick="checkout(${tempPrice})">${totalPrice.toLocaleString()}</button>`

    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}