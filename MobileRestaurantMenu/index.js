import { menuArray } from "./data.js";


const menuItem = document.getElementById("menu-items");
const cart = document.getElementById("cart")


let orderArray = []


menuItem.addEventListener("click", (e) => {

    const itemId = e.target.dataset.itemId

    if (itemId) {
        const itemObj = menuArray.filter(item => item.id === Number(itemId))[0]
        orderArray.push(itemObj)

        cart.classList.remove("hidden")
        handleAddItemClick(orderArray)
    }

})

cart.addEventListener("click", (e) => {
    const itemRemoveId = e.target.parentElement.dataset.itemId
    if (itemRemoveId) {
        orderArray.splice(orderArray.indexOf(orderArray.filter(item => item.id === Number(itemRemoveId))[0]), 1)
        handleAddItemClick(orderArray)
    }
})

document.getElementById("complete-order-btn").addEventListener("click", () => {
    document.getElementById("modal").classList.toggle("hidden")
})

document.getElementById("pay-btn").addEventListener("click", (e) => {
    e.preventDefault()
    document.getElementById("modal").classList.toggle("hidden")
    cart.innerHTML = `<div class="payment-complete-msg">Thanks, James! Your order is on its way!</div>`
    orderArray = []
    form.reset()
})

function handleAddItemClick(orderArray) {
    let bill = orderArray.map(orderItem => {
        return `<div class="bill-item"  data-item-id="${orderItem.id}">
        <div id="order-item-info"
        <h3>${orderItem.name}</h3>
        <button class="remove">remove</button>
        </div>
        <h3>${orderItem.price}</h3>
        </div>`
    }).join("")
    const total = orderArray.reduce((total, currentItem) => total + currentItem.price, 0)
    bill += `<div id="total-price" class="total-price">
    <h3>Total Price:</h3>
    <h3>${total}</h3>
    </div>`
    document.getElementById("order-item").innerHTML = bill
}

function renderMenu() {
    return menuArray.map((item) => {
        return `
        
        <div class="items" id="${item.id}">
        <div class="item-info">
        <div class="item-img">
        <h2>${item.emoji}</h2>
        </div>
        <div class="item-data">
        <h3>${item.name}</h3>
        <p>${item.ingredients.join(", ")}</p>
        <h4>${item.price}</h4>
        </div>
        </div>
        
        <button class="add-item" id="add-${item.id}" data-item-id="${item.id}">+</button> 
        </div>`
    }).join("")
}

menuItem.innerHTML = renderMenu()