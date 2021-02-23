//itemquantity=0;
var User=localStorage.getItem('loggedUser')
window.addEventListener('load', function () {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    // var addToCartButtons = document.getElementsByClassName('shop-item-button')
    // for (var i = 0; i < addToCartButtons.length; i++) {
    //     var button = addToCartButtons[i]
    //     button.addEventListener('click', addToCartClicked)
    // }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
    var val = JSON.parse(localStorage.getItem(User))
    if( val!=null){
        retrivedatafromdatastorage();
        updateCartTotal();
    }
})

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
    var val = JSON.parse(localStorage.getItem(User))
    var loc = JSON.parse(localStorage.getItem(User+"Location"))
    loc=JSON.stringify(loc)
    //alert(val)
    //alert(loc)
    sendmail(val,loc);
    val.splice(0);
    localStorage.setItem(User, JSON.stringify(val));

}

function removeCartItem(event) {
    var buttonClicked = event.target
    var title = buttonClicked.parentElement.parentElement.getElementsByClassName('cart-item-title')[0].innerText
    buttonClicked.parentElement.parentElement.remove()
    //itemnameremoved=
    //alert(title);
    removefromstorage(title);
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    var shopItem = input.parentElement.parentElement
    var title = shopItem.getElementsByClassName('cart-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('cart-price')[0].innerText
    //var imageSrc = shopItem.getElementsByClassName('cart-item-image')[0].src
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    //localStorage.setItem("mahmoud", title+imageSrc+price+ input.value);
    saveiteminstorage(title,price,input.value);
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    //itemquantity=1;
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart if you want to increase the quantity use the number input below')
            return
        }

    }
    // <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
    var cartRowContents = `
        <div class="cart-item cart-column">
           
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    //localStorage.setItem("mahmoud", title+" "+price+" "+ itemquantity);
    saveiteminstorage(title,price, 1)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
    //alert(quantity)
    // localStorage.setItem("mahmoud", title+" "+price+" "+imageSrc+" "+ quantity)

}

function saveiteminstorage(title1, price1, quantity1) {
    if (localStorage.getItem(User) == null) {
        localStorage.setItem(User, '[]');
        alert('nullll')
    }
    if (localStorage.getItem(User) != null) {
        //alert('not null')
        var val = JSON.parse(localStorage.getItem(User))
        
        for (let index = 0; index < val.length; index++) {
            if (title1 == val[index]) {
                val[index + 2] = quantity1;
                localStorage.setItem(User, JSON.stringify(val));
                return
                //alert('thisitem is duplicated');
            }
        }
        val.push(title1);
        val.push(price1);
        val.push(quantity1);
        // localStorage.setItem(localStorage.getItem('loggedUser'),
        //  title1+" "+price1+" "+ quantity1);
        // localStorage.setItem("mahmoud", title+" "+price+" "+ input.value);
        localStorage.setItem(User, JSON.stringify(val));

    } else {
        alert('please login first')//for development
    }
}
function removefromstorage(title) {
    var val = JSON.parse(localStorage.getItem(User))
    //alert(val)
    for (let index = 0; index < val.length; index++) {
        if (title == val[index]) {
            val.splice(index, 3);
        }

    }
    //alert(val)
    localStorage.setItem(User, JSON.stringify(val));
}

function retrivedatafromdatastorage() {
    
    var val = JSON.parse(localStorage.getItem(User))
    var cartItems = document.getElementsByClassName('cart-items')[0]
    for (let index = 0; index < val.length; index+=3) {
        var cartRow = document.createElement('div')
        cartRow.classList.add('cart-row')
        var title=val[index]
        var price=val[index+1]
        var quant=val[index+2]
//<img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        var cartRowContents = `
        <div class="cart-item cart-column">
            
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="${quant}">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)

    }

    
    // var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    // for (var i = 0; i < cartItemNames.length; i++) {
    //     if (cartItemNames[i].innerText == title) {
    //         alert('This item is already added to the cart if you want to increase the quantity use the number input below')
    //         return
    //     }

    // }
    

}

function sendmail(items,location){
    window.location = "mailto:admin@gmail.com?body=  my items is " + items + " and my location is "+location+"&subject=buy request from : " + User ;



}