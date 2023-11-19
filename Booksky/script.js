
// displaying the popup


var show_popup = document.getElementById("addbks")

var popuptab = document.querySelector(".popup-tab")
var popupoverlay = document.querySelector(".popup-overlay")

var bookForm = document.querySelector("form");


show_popup.addEventListener("click",function(){

    popupoverlay.style.display ="block"
    popuptab.style.display ="block"

})


// closing the popup

var add = document.getElementById("add")
var cancel = document.getElementById("close_popup")


add.addEventListener("click", function(event){
    event.preventDefault()

    var title = document.getElementById("book-title-input").value
    var author = document.getElementById("book-author-input").value
    var desc = document.getElementById("book-descrp-input").value


    // creaing new div and putting the inputed values

    var div = document.createElement("div")
    div.setAttribute("class","book-container")

    div.innerHTML =`<h2>${title}</h2>
                    <h3>${author}</h3>
                    <p> ${desc}</p>
                    <button class="del_bk" onclick="delBook(event)">Delete</button>
                    `

    //selecting the container to append

    var container = document.querySelector(".Container")

    container.append(div)


    popupoverlay.style.display ="None"
    popuptab.style.display ="None"

    // reseting the form

    bookForm.reset(); 
})

cancel.addEventListener("click", function(event){
    event.preventDefault()

    popupoverlay.style.display ="None"
    popuptab.style.display ="None"

    // reseting the form
    
    bookForm.reset(); 
})



// deleting added content

function delBook(event){

    event.target.parentNode.remove()

}