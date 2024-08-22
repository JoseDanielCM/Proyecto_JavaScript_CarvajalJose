let items = document.querySelectorAll(".dropdown-item")

items.forEach(element => {
    element.addEventListener("click",()=>{
        console.log(element.innerHTML);
        
    })
});

    