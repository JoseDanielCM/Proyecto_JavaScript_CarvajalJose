// ESTRELLAS //

let estrellas = document.querySelectorAll(".stars");
for (const star of estrellas) {
    star.addEventListener("click",()=>{
        valorStar = Number(star.getAttribute("value"))
        document.getElementById("formPuntuacion").setAttribute("value",valorStar)
        for (const starR of estrellas) {
            starR.classList.remove("starActive");
        }

        for (const starON of estrellas) {
            if (starON.getAttribute("value")<=valorStar) {
                starON.classList.add("starActive")
            }
        }
    })
}

// ******************************************************

let items = document.querySelectorAll(".dropdown-item")

items.forEach(element => {
    element.addEventListener("click",()=>{
        let valueEscogido = element.innerHTML
        let objetivo = element.getAttribute("value")
        

        let elementoObjetivo = document.getElementById(objetivo)
        elementoObjetivo.innerHTML = valueEscogido
        elementoObjetivo.classList.remove("btn-danger")
        elementoObjetivo.classList.remove("btn-succes")
        elementoObjetivo.classList.remove("btn-warning")

        let color = element.getAttribute("color")
        
        if (color !== null) {
            elementoObjetivo.classList.remove("btn-secondary")
            elementoObjetivo.classList.add(`btn-${color}`)
        }
    })
});

