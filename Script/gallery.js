 window.addEventListener("load", function () {
   var contact=document.getElementById("contact");
   contact=window.addEventListener("click",function(){window.open("contactus.html","_self", "Contact Us")});

     var Order = [{
         Name: "Steak",
         Describe: "Steak Beefy's by Sir Ian Botham",
         Salary: 30,
         Image: "calamari_appetizer_delicious.jpg"
            }, {
         Name: "Noodles",
         Describe: "Veg Hakka Noodles",
         Salary: 10,
         Image: "food-gallery-steak.jpg"
            }, {
         Name: "Sandwich",
         Describe: "Corn Paneer Sandwich",
         Salary: 40,
         Image: "IMGP3166.jpg"
            }, {
         Name: "Pasta",
         Describe: "Red Sauce Pasta",
         Salary: 80,
         Image: "unnamed3.jpg"
            }, {
         Name: "Pasta",
         Describe: "White Sauce Pasta",
         Salary: 90,
         Image: "unnamed1.jpg"
            }, {
         Name: "Steak",
         Describe: "Bun and Grain Shack",
         Salary: 100,
         Image: "unnamed2.jpg"
            }, {
         Name: "Steak",
         Describe: "Steak Beefy's ",
         Salary: 130,
         Image: "b4.jpg"
            }, {
         Name: "Steak",
         Describe: "Red Sauce Pasta",
         Salary: 300,
         Image: "images5.jpeg"
            }, {
         Name: "Steak",
         Describe: "Red Sauce Pasta",
         Salary: 340,
         Image: "unnamed2.jpg"
            }];



     console.log(Order.length + " Lenght " + Order);

     for (var x = 0; x < Order.length; x++) {
         //  console.log("Salary = "+Order[x].Describe +" Image = "+Order[x].Image);
         addItem(Order[x].Image, Order[x].Describe,x);
     }

     var getOrderButtons = document.getElementsByClassName("viewbutton");
     ActionGetOrderButton(getOrderButtons);

 });

 function ActionGetOrderButton(OrderButtonsArray) {
     for (var x = 0; x < OrderButtonsArray.length; x++) {
        OrderButtonsArray[x].addEventListener("click",function(obj){
           console.log(obj.target.value) ;
        });
     }
 }

 function addItem(img, Desc,count) {
     console.log("Decribe = " + Desc + " Image = " + img);
     var GalleryDesign = document.createElement("div");
     GalleryDesign.classList.add("Gallery_Design");
     GalleryDesign.style.backgroundImage = "url(Images/" + img + ")";

     var GalleryButton = document.createElement("div");
     GalleryButton.classList.add("Gallery_Button");
     var Add_Button = document.createElement("button");
     Add_Button.classList.add("viewbutton");
     Add_Button.textContent = "GET ORDER";
     Add_Button.setAttribute("value","button"+(count+1));

     var OrderDescribe = document.createElement("span");
     OrderDescribe.classList.add("Gallery_Describe");
     OrderDescribe.textContent = Desc;


     GalleryButton.appendChild(Add_Button);
     GalleryDesign.appendChild(GalleryButton);
     GalleryDesign.appendChild(OrderDescribe);

     var AllView = document.getElementById("ViewAll");
     AllView.appendChild(GalleryDesign);


     console.log(AllView);
 }