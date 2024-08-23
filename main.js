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

        document.getElementById("estrellasContainer").setAttribute("valid",true)
    })
}

// *********************** VALIDACION ITEMS DENTRO DEL DROPDOWN *******************************

let items = document.querySelectorAll(".dropdown-item")

items.forEach(element => {
    element.addEventListener("click",()=>{  
        let valueEscogido = element.innerHTML
        let objetivo = element.getAttribute("value")
        let containerObjetivo = element.getAttribute("cont")
        document.getElementById(containerObjetivo).setAttribute("valid",true)

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

// ******************************************* VALIDAR LAS CHECKLISTS ***************************

function updateButtonText() {
    const checkboxes = document.querySelectorAll('.form-check-input:checked');
    const button = document.getElementById('formGenero');
    let selected = [];

    checkboxes.forEach((checkbox) => {
        selected.push(checkbox.value);
        let objetivo = checkbox.getAttribute("cont")
        document.getElementById(objetivo).setAttribute("valid",true)
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

// **********************************************************************

// ************************* MANEJAR DOM CON LOS DATOS ***********************************

let recursos = [{
    nombre: "ciclo",
    genero: "ciclo",
    plataforma: "ciclo",
    estado: "ciclo",
    formato: "ciclo",
    fecha: "ciclo",
    valor: "ciclo",
    texto: "ciclo"
}]

const enviarDatos = function(data) {
    let nombre = data.nombre
    let genero = data.genero
    let plataforma = data.plataforma
    let estado = data.estado
    let formato = data.formato
    let fecha = data.fecha
    let valor = data.valor
    let texto = data.texto
    console.log(data);
    
    let dataSourceHtml = `
        <div class="card text-bg-secondary mb-3" style="max-width: 18rem;">
            <div class="card-header">${formato}</div>
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">${genero}</p>
                <p class="card-text">${plataforma}</p>
                <p class="card-text">${estado}</p>
                <p class="card-text">${fecha}</p>
                <p class="card-text">${valor}</p>
                <p class="card-text">${texto}</p>
            </div>
        </div>
`
    let cardContainer = document.createElement("section")
    cardContainer.classList.add("col")
    cardContainer.innerHTML = dataSourceHtml
    document.getElementById("card-container").appendChild(cardContainer)
}

const crearObjeto = function(){
    let nombreData = document.getElementById("nombreRecurso").value //value
    let generoData = document.getElementById("formGenero").innerText
    let plataformaData = document.getElementById("formPlataforma").innerText
    let estadoData = document.getElementById("formEstado").innerText
    let formatoData = document.getElementById("formFormato").innerText
    let fechaData = document.getElementById("endDateRecurso").value
    let valorData = document.getElementById("formPuntuacion").getAttribute("value")
    let textoData = document.getElementById("reseñaRecurso").value

    let objeto = {
        nombre : nombreData,
        genero : generoData,
        plataforma : plataformaData,
        estado : estadoData,
        formato : formatoData,
        fecha : fechaData,
        valor : valorData,
        texto : textoData,
    }
    return objeto
}

// Validar envio del formulario completo //

let btnSubir = document.getElementById("botonSubirInfo")
let formulario = document.getElementById("menu-dropdown-datos")

btnSubir.addEventListener("click",(event)=>{
    
    let generosValid = JSON.parse(document.getElementById("generoContainer").getAttribute("valid"))
    let plataformasValid = JSON.parse(document.getElementById("plataformaContainer").getAttribute("valid"))
    let estadosValid = JSON.parse(document.getElementById("estadoContainer").getAttribute("valid"))
    let formatoValid = JSON.parse(document.getElementById("formatoContainer").getAttribute("valid"))
    let estrellasValid = JSON.parse(document.getElementById("estrellasContainer").getAttribute("valid"))

    // validacion genero vacio
    if (document.getElementById('formGenero').textContent == "Géneros") {
        generosValid = false
    }

    if (formulario.checkValidity() && generosValid && plataformasValid && estadosValid && formatoValid && estrellasValid) {
        let datos = crearObjeto()
        
        console.log('bien');
        let principalDropdown = new bootstrap.Dropdown(formulario)
        principalDropdown.toggle()
        enviarDatos(datos)
        // agregar datos a card
    }else{
        formulario.reportValidity()

        const toastLiveExample = document.getElementById('liveToast')
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastBootstrap.show()
    }
})


