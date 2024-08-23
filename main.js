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

// que el dropdown no se cierre al dar click en labels de adentro
document.querySelectorAll('.dropdown-menu').forEach(function (dropdown) {
    dropdown.addEventListener('click', function (event) {
        event.stopPropagation();
    });
});

//

function updateButtonText() {
    const checkboxes = document.querySelectorAll('.form-check-input:checked');
    const button = document.getElementById('formGenero');
    let selected = [];

    checkboxes.forEach((checkbox) => {
        selected.push(checkbox.value);
    });

    // Si hay opciones seleccionadas, mostrarlas en el botón; si no, mostrar el texto por defecto.
    if (selected.length > 0) {
        button.textContent = selected.join(', ');
    } else {
        button.textContent = 'Géneros';
    }
}

// Escuchar cambios en los checkboxes
document.querySelectorAll('.form-check-input').forEach((checkbox) => {
    checkbox.addEventListener('change', updateButtonText);
});

