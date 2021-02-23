 window.addEventListener("load", function () {

     Order = [{
         Name: "Steak",
         Describe: "Steak Beefy's by Sir Ian Botham",
         Price: 30,
         Image: "calamari_appetizer_delicious.jpg"
            }, {
         Name: "Noodles",
         Describe: "Veg Hakka Noodles",
         Price: 10,
         Image: "food-gallery-steak.jpg"
            }, {
         Name: "Sandwich",
         Describe: "Corn Paneer Sandwich",
         Price: 40,
         Image: "IMGP3166.jpg"
            }, {
         Name: "Pasta",
         Describe: "Red Sauce Pasta",
         Price: 80,
         Image: "unnamed3.jpg"
            }, {
         Name: "Pasta",
         Describe: "White Sauce Pasta",
         Price: 90,
         Image: "unnamed1.jpg"
            }, {
         Name: "Steak",
         Describe: "Bun and Grain Shack",
         Price: 100,
         Image: "unnamed2.jpg"
            }, {
         Name: "Steak",
         Describe: "Steak Beefy's ",
         Price: 130,
         Image: "b4.jpg"
            }, {
         Name: "Steak",
         Describe: "Red Sauce Pasta",
         Price: 300,
         Image: "images5.jpeg"
            }, {
         Name: "Steak",
         Describe: "Red Sauce Pasta",
         Price: 340,
         Image: "unnamed2.jpg"
            }];
     UserLocation = "";
     // called method to create product templets
     addItem();
     // add event Listener to all button GETORDER
     var getOrderButtons = document.getElementsByClassName("viewbutton");
     ActionGetOrderButton(getOrderButtons);
     // to close page from          X
     closebutton = document.getElementById("close");
     ClosePage(closebutton);
     // to show map to choise location to deliver order
     var LocButton = document.getElementById("SendOrderPageChoiseLoc");
     GetUserLocation(LocButton);



     // to Buy order Button
     var buyButton = document.getElementById("SendOrderPage_buy");
     BuyOrder_SendMail(buyButton);

 });

 function addItem() {
     for (var x = 0; x < Order.length; x++) {
         /*console.log("Decribe = " + Order[x].Describe + " Image = " + Order[x].Image);*/
         var GalleryDesign = document.createElement("div");
         GalleryDesign.classList.add("Gallery_Design");
         GalleryDesign.style.backgroundImage = "url(Images/" + Order[x].Image + ")";

         var GalleryButton = document.createElement("div");
         GalleryButton.classList.add("Gallery_Button");
         var Add_Button = document.createElement("button");
         Add_Button.classList.add("viewbutton");
         Add_Button.textContent = "GET ORDER";
         Add_Button.setAttribute("value", "button" + (x));

         var OrderDescribe = document.createElement("span");
         OrderDescribe.classList.add("Gallery_Describe");
         OrderDescribe.textContent = Order[x].Describe;


         GalleryButton.appendChild(Add_Button);
         GalleryDesign.appendChild(GalleryButton);
         GalleryDesign.appendChild(OrderDescribe);

         var AllView = document.getElementById("ViewAll");
         AllView.appendChild(GalleryDesign);
     }
     /*console.log(AllView);*/
 }

 function ActionGetOrderButton(OrderButtonsArray) {
     for (var x = 0; x < OrderButtonsArray.length; x++) {
         OrderButtonsArray[x].addEventListener("click", function (obj) {
//             console.log(obj.target.value);
             // this to show popup windwo
             model = document.getElementById("SendOrdermodel");
             model.style.display = "block";
             buttonId = obj.target.value.charAt(obj.target.value.length - 1);
            /* console.log("ID " + buttonId);
             console.log(" Image" + Order[buttonId].Image);
             console.log(" Price" + Order[buttonId].Price);
             console.log(" Desc" + Order[buttonId].Describe);*/

             var img = Order[buttonId].Image;
             var pric = Order[buttonId].Price;
             var Desc = Order[buttonId].Describe;

             document.getElementById("OrderImage").style.backgroundImage = "";
             document.getElementById("Ordersalary").innerText = "";
             document.getElementById("OrderDesc").innerText = "";
             document.getElementById("OrderCount").innerText="";
             
             document.getElementById("OrderImage").style.backgroundImage = "url(Images/" + img + ")";
             document.getElementById("Ordersalary").innerText = "Price :" + pric + "$";
             document.getElementById("OrderDesc").innerText = "Description :" + Desc;
             
           /*  var getcount = JSON.parse(localStorage.getItem("mahmoud"));
             var nameindex = getcount.indexOf(Order[buttonId].Name);
            console.log(" COUBT      "+getcount+"mmmmmmmm "+getcount[(parseInt(nameindex) + 2)]);
             document.getElementById("OrderCount").value =getcount[(parseInt(nameindex) + 2)];*/
             
             

         });
     }
 }

 function ClosePage(clobutto) {
//     console.log("clobutto" + clobutto);
     clobutto.addEventListener("click", function (obj) {
         model.style.display = "none";
     });
 }

 function GetUserLocation(Loc) {
     Loc.addEventListener("click", function () {
         mapPageModel = document.getElementById("mapPage");
         model.style.display = "none";
         mapPageModel.style.display = "block";

         //1- check availability of geolocation inside user browser (navigator)
         if (navigator.geolocation) {
             navigator.geolocation.getCurrentPosition(getposition, errorhandeler)
         } else {
             alert("YOUR BROWSER NOT SUPPORT GEOLOCATION")
         }
     });
     /*this DONE button */
     var CancelMap = document.getElementById("CancelMapPage");
     CancelMap.addEventListener("click", function () {
         mapPageModel.style.display = "none";
         model.style.display = "block";
         /*console.log("User Location" + UserLocation);*/
     });
 }

 function getposition(position) {
     // latitude , longitude , timestamp
     //console.log(arguments[0]);
     var lat = position.coords.latitude;
     var lng = position.coords.longitude;

     initMap(lat, lng);

 }

 function errorhandeler(error) {
     alert("error");
     switch (error.code) {
         case error.PERMISSION_DENIED:
             mymap.innerText = "you refused Request !... ";
             break;
         case error.POSITION_UNAVAILABLE:
             mymap.innerText = "POSITION_UNAVAILABLE";
             break;
         case error.TIMEOUT:
             mymap.innerText = "TIMEOUT";
             break;
         case error.UNKOWN_ERROR:
             mymap.innerText = "UNKOWN_ERROR";
             break;
         default:
     }
 }

 function initMap(la, ln) {
     const myLatLng = {
         lat: la,
         lng: ln
     };
     const map = new google.maps.Map(document.getElementById("map"), {
         zoom: 17,
         center: myLatLng,
     });
     var marker;

     google.maps.event.addListener(map, 'click', function (event) {
         if (marker) {
             marker.setPosition(event.latLng);
         } else {
             marker = new google.maps.Marker({
                 position: event.latLng,
                 map: map
             });
         }
         UserLocation = event.latLng;
     });
 }
 function BuyOrder_SendMail(buy) {
     buy.addEventListener("click", function () {
         /*console.log("UserLocation "+UserLocation)*/

         var CountValue = document.getElementById("OrderCount").value;
         if ((parseInt(CountValue) > 0) && (parseInt(CountValue) < 10)) {

             if (UserLocation) {
                 var tolocStor = [];
                 var na = Order[buttonId].Name;
                 var pri = "$"+Order[buttonId].Price;
                 var cou = CountValue;
                 if("loggedUser" in localStorage){ 
                     user = localStorage.getItem("loggedUser");
                 }else{
                     localStorage.setItem("loggedUser",JSON.stringify(null));
                     alert("PLEASE LOGIN FIREST")
                     window.location.replace("./login.html");
                 }
                                 
                 var usercart = JSON.parse(localStorage.getItem(user));
                 if (usercart) {
                     var exist = usercart.includes(Order[buttonId].Name)
                     /*console.log("EXIST " + exist);*/
                     if (exist) {
                         var stat = confirm("YOU WANT TO UPDATE ORDER");
                         if (stat) {
                             /*console.log("cart " + usercart)*/
                             var itemName = usercart.indexOf(Order[buttonId].Name);
                     /*console.log("index of " + Order[buttonId].Name + "=" + itemName)*/
                             usercart[(parseInt(itemName) + 2)] = parseInt(CountValue);
                             localStorage.setItem(user, JSON.stringify(usercart))
                     
                         } else {
                             model.style.display = "none";
                         }
                     } else {
                         usercart.push(na);
                         usercart.push(pri);
                         usercart.push(cou);
                         localStorage.setItem(user, JSON.stringify(usercart));
                         localStorage.setItem(user+"Location",JSON.stringify(UserLocation))
                     }
                 } else {
                     tolocStor.push(na);
                     tolocStor.push(pri);
                     tolocStor.push(cou);
                     localStorage.setItem(user, JSON.stringify(tolocStor));
                     localStorage.setItem(user+"Location",JSON.stringify(UserLocation))
                 }     
                    model.style.display = "none";

             } else {
                 alert("MUST CHOOSE LOCATION")
             }
         } else {
             var CountInvalidMessage = document.getElementById("OrderCount");
             CountInvalidMessage.setCustomValidity(" ONLY BETWEEN 1 AND 10 ");
             CountInvalidMessage.reportValidity();
         }

     });
 }