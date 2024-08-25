// ESTRELLAS //

let estrellas = document.querySelectorAll(".stars");

for (const star of estrellas) {
    star.addEventListener("click", () => {
        valorStar = Number(star.getAttribute("value"))
        document.getElementById("formPuntuacion").setAttribute("value", valorStar)
        for (const starR of estrellas) {
            starR.classList.remove("starActive");
        }

        for (const starON of estrellas) {
            if (starON.getAttribute("value") <= valorStar) {
                starON.classList.add("starActive")
            }
        }

        document.getElementById("estrellasContainer").setAttribute("valid", true)
    })
}


// *********************** VALIDACION ITEMS DENTRO DEL DROPDOWN *******************************

let items = document.querySelectorAll(".dropdown-item")

items.forEach(element => {
    element.addEventListener("click", () => {
        let valueEscogido = element.innerHTML
        let objetivo = element.getAttribute("value")
        let containerObjetivo = element.getAttribute("cont")
        document.getElementById(containerObjetivo).setAttribute("valid", true)

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
document.getElementById('menuGeneros').addEventListener('click', function (event) {
    event.stopPropagation();
});

// ******************************************* VALIDAR LAS CHECKLISTS ***************************

function updateButtonText() {
    const checkboxes = document.querySelectorAll('.form-check-input:checked');
    const button = document.getElementById('formGenero');
    let selected = [];

    checkboxes.forEach((checkbox) => {
        selected.push(checkbox.value);
        let objetivo = checkbox.getAttribute("cont")
        document.getElementById(objetivo).setAttribute("valid", true)
    });

    // si seleccion mostrarla, sino "Géneros"
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


const crearObjeto = function () {
    let nombreData = document.getElementById("nombreRecurso").value //value
    let generoData = document.getElementById("formGenero").innerText
    let plataformaData = document.getElementById("formPlataforma").innerText
    let estadoData = document.getElementById("formEstado").innerText
    let formatoData = document.getElementById("formFormato").innerText
    let fechaData = document.getElementById("endDateRecurso").value
    let valorData = document.getElementById("formPuntuacion").getAttribute("value")
    let textoData = document.getElementById("reseñaRecurso").value

    let objeto = {
        nombre: nombreData,
        genero: generoData,
        plataforma: plataformaData,
        estado: estadoData,
        formato: formatoData,
        fecha: fechaData,
        valor: valorData,
        texto: textoData,
    }
    return objeto
}

// Validar envio del formulario completo //

let btnSubir = document.getElementById("botonSubirInfo")
let formulario = document.getElementById("menu-dropdown-datos")

btnSubir.addEventListener("click", async (event) => {

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
        // *************** subir datoss*******************
        console.log('bien');
        let principalDropdown = new bootstrap.Dropdown(formulario)
        principalDropdown.toggle()
        // subir a la api
        // #region SUBIR API ***********
        const subir = await fetch('https://66c9dc4559f4350f064da9c1.mockapi.io/api/v1/resources/', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(datos),
        });
        document.getElementById("card-container").innerHTML = ""
        cargarPagina()
        // agregar datos a card
    } else {
        formulario.reportValidity()

        const toastLiveExample = document.getElementById('liveToast')
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastBootstrap.show()
    }
})

const cargarPagina = async function () {
    let identificadorResources = 0
    const traer = await fetch('https://66c9dc4559f4350f064da9c1.mockapi.io/api/v1/resources/');
    const dataResources = await traer.json()

    dataResources.forEach((data) => {
        identificadorResources++
        let nombre = data.nombre
        let genero = data.genero
        let plataforma = data.plataforma
        let estado = data.estado
        let formato = data.formato
        let fecha = data.fecha
        let valor = data.valor
        let texto = data.texto

        let dataSourceHtml = `
            <div class="card text-bg-secondary" style="max-width: 18rem;">
                <div class="card-header">
                    <button class="btn btn-primary btnEditar">Editar</button>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                    <p class="card-text">${formato}</p>
                    <p class="card-text">${genero}</p>
                    <p class="card-text">${plataforma}</p>
                    <p class="card-text">${estado}</p>
                    <p class="card-text">${fecha}</p>   
                    <div id="star${identificadorResources}" value="${valor}" class="estrellasCards estrellasQuietas">
                        <div cont="star${identificadorResources}" class="stars${identificadorResources}" value="1">★</div>
                        <div cont="star${identificadorResources}" class="stars${identificadorResources}" value="2">★</div>
                        <div cont="star${identificadorResources}" class="stars${identificadorResources}" value="3">★</div>
                        <div cont="star${identificadorResources}" class="stars${identificadorResources}" value="4">★</div>
                        <div cont="star${identificadorResources}" class="stars${identificadorResources}" value="5">★</div>
                    </div>
                    <p class="card-text">${texto}</p>
                </div>
            </div>

    `
        let cardContainer = document.createElement("section")
        cardContainer.classList.add("col")
        cardContainer.setAttribute("id", identificadorResources)
        cardContainer.innerHTML = dataSourceHtml
        document.getElementById("card-container").appendChild(cardContainer)

        let estrellas = document.querySelectorAll(`.stars${identificadorResources}`)

        estrellas.forEach(star => {
            if (Number(star.getAttribute("value")) <= Number(valor)) {
                star.classList.add("starActive")
            }
        });


        // #region ************************* BOTON EDITAR *********************************************

        let botonEditar = cardContainer.querySelector("button.btnEditar")

        botonEditar.addEventListener("click", async () => {
            let idCambios = cardContainer.getAttribute("id")
            const DBresource = await fetch(`https://66c9dc4559f4350f064da9c1.mockapi.io/api/v1/resources/${idCambios}`)
            const resourcesData = await DBresource.json()

            const isEditing = botonEditar.textContent === 'Editar';

            let listaGeneros = resourcesData.genero.split(", ")

            // quitar cardContainer.remove()
            if (isEditing) {
                // MODO EDICIONNNNN ******************************************
                const cardData = cardContainer.querySelector(".card-body")
                cardData.innerHTML = `
                    <textarea class="edicion-text formularioActivate">${resourcesData.nombre}</textarea>

                    <div class="dropdown">
                        <button id="edicion-formato${idCambios}" class="edicion-text btn btn-secondary dropdown-toggle" type="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            ${resourcesData.formato}
                        </button>
                        <ul class="dropdown-menu">
                            <li><a value="edicion-formato${idCambios}" class="edicion-item${idCambios} dropdown-item"
                                    href="#">Serie</a></li>
                            <li><a value="edicion-formato${idCambios}" class="edicion-item${idCambios} dropdown-item"
                                    href="#">Película</a></li>
                            <li><a value="edicion-formato${idCambios}" class="edicion-item${idCambios} dropdown-item"
                                    href="#">Libro</a></li>
                        </ul>
                    </div>

                    <div valid="false" id="generoContainer" class="dropdown">
                        <button id="edicionGenero${idCambios}" class="btn btn-secondary dropdown-toggle edicion-text edicionGeneros" type="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            ${resourcesData.genero}</button>
                        <ul class="generosMenus dropdown-menu px-3">

                            <li>
                                <div class="form-check">
                                    <input cont="generoContainer" class="form-check-input genEditInput${idCambios}"
                                        type="checkbox" value="Acción" id="editAccion${idCambios}">
                                    <label class="form-check-label" for="editAccion${idCambios}">
                                        Acción
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="form-check">
                                    <input cont="generoContainer" class="form-check-input genEditInput${idCambios}"
                                        type="checkbox" value="Ciencia Ficción" id="editSciFi${idCambios}">
                                    <label class="form-check-label" for="editSciFi${idCambios}">
                                        Ciencia Ficción
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="form-check">
                                    <input cont="generoContainer" class="form-check-input genEditInput${idCambios}"
                                        type="checkbox" value="Romance" id="editRomance${idCambios}">
                                    <label class="form-check-label" for="editRomance${idCambios}">
                                        Romance
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="form-check">
                                    <input cont="generoContainer" class="form-check-input genEditInput${idCambios}"
                                        type="checkbox" value="Misterio" id="editMisterio${idCambios}">
                                    <label class="form-check-label"
                                        for="editMisterio${idCambios}">
                                        Misterio
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="form-check">
                                    <input cont="generoContainer" class="form-check-input genEditInput${idCambios}"
                                        type="checkbox" value="Fantasía" id="editFantasia${idCambios}">
                                    <label class="form-check-label"
                                        for="editFantasia${idCambios}">
                                        Fantasía
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="form-check">
                                    <input cont="generoContainer" class="form-check-input genEditInput${idCambios}"
                                        type="checkbox" value="Drama" id="editDrama${idCambios}">
                                    <label class="form-check-label" for="editDrama${idCambios}">
                                        Drama
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="form-check">
                                    <input cont="generoContainer" class="form-check-input genEditInput${idCambios}"
                                        type="checkbox" value="Comedia" id="editComedia${idCambios}">
                                    <label class="form-check-label"
                                        for="editComedia${idCambios}">
                                        Comedia </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="dropdown">
                        <button id="edicion-plataforma${idCambios}" class="edicion-text btn btn-secondary dropdown-toggle" type="button"
                        data-bs-toggle="dropdown" aria-expanded="false">
                            ${resourcesData.plataforma}
                        </button>
                        <ul class="dropdown-menu">
                            <li><a value="edicion-plataforma${idCambios}" class="edicion-item${idCambios} dropdown-item" href="#">Netflix</a></li>
                            <li><a value="edicion-plataforma${idCambios}" class="edicion-item${idCambios} dropdown-item" href="#">Amazon</a></li>
                            <li><a value="edicion-plataforma${idCambios}" class="edicion-item${idCambios} dropdown-item" href="#">Fisico</a></li>
                            <li><a value="edicion-plataforma${idCambios}" class="edicion-item${idCambios} dropdown-item" href="#">Kindle</a></li>
                            <li><a value="edicion-plataforma${idCambios}" class="edicion-item${idCambios} dropdown-item" href="#">HBO</a></li>
                        </ul>
                    </div>

                    <div class="dropdown">
                        <button id="edicion-estado${idCambios}" class="edicion-text btn btn-secondary dropdown-toggle" type="button"
                        data-bs-toggle="dropdown" aria-expanded="false">
                            ${resourcesData.estado}
                        </button>
                        <ul class="dropdown-menu">
                            <li><a color="success" value="edicion-estado${idCambios}" class="edicion-item${idCambios} dropdown-item" 
                            href="#">Terminado</a></li>
                            <li><a color="warning" value="edicion-estado${idCambios}" class="edicion-item${idCambios} dropdown-item" 
                            href="#">Progreso</a></li>
                            <li><a color="danger" value="edicion-estado${idCambios}" class="edicion-item${idCambios} dropdown-item" 
                            href="#">Pendiente</a></li>
                        </ul>
                    </div>

                    <div class="mt-2">
                        <input type="date" class="form-control edicion-text" id="editDate"
                            value="${resourcesData.fecha}" required>
                    </div>

                    <div id="star${idCambios}" value="${resourcesData.valor}" class="edicion-text estrellasCards">
                        <div cont="star${idCambios}" class="stars${idCambios}" value="1">★</div>
                        <div cont="star${idCambios}" class="stars${idCambios}" value="2">★</div>
                        <div cont="star${idCambios}" class="stars${idCambios}" value="3">★</div>
                        <div cont="star${idCambios}" class="stars${idCambios}" value="4">★</div>
                        <div cont="star${idCambios}" class="stars${idCambios}" value="5">★</div>
                    </div>

                    <textarea class="edicion-text formularioActivate">${resourcesData.texto}</textarea>
                `
                
                arreglarCheckBoxInterior()
                // colocar chek a los que ya traia antes
                let listaInputs = document.querySelectorAll(`.genEditInput${idCambios}`)
                listaInputs.forEach(element => {
                    if (listaGeneros.includes(element.getAttribute("value"))) {
                        element.checked = true
                    }
                });
                // prender estrellas 
                let estrellas = document.querySelectorAll(`.stars${idCambios}`)

                estrellas.forEach(star => {
                    if (Number(star.getAttribute("value")) <= Number(resourcesData.valor)) {
                        star.classList.add("starActive")
                    }
                });
                
                document.querySelectorAll(`.genEditInput${idCambios}`).forEach((checkbox) => {
                    checkbox.addEventListener('change', ()=>{
                        modificarBoton(idCambios)
                    });
                });

                moverEstrellas(idCambios)
                dropdownsEdicion(idCambios)

                botonEditar.textContent = "Guardar"
            } else {

                // MODO GUARDARRRRRRR *********************
                botonEditar.textContent = 'Editar';
                const areasDeTextos = cardContainer.querySelectorAll(".edicion-text");
                console.log(areasDeTextos[7]);
                
                let dataNueva = {
                    nombre: areasDeTextos[0].value,
                    formato: areasDeTextos[1].innerText,
                    genero: areasDeTextos[2].innerText,
                    plataforma: areasDeTextos[3].innerText,
                    estado: areasDeTextos[4].innerText,
                    fecha: areasDeTextos[5].value,
                    valor: areasDeTextos[6].getAttribute("value"),
                    texto: areasDeTextos[7].value
                };
                const cardData = cardContainer.querySelector(".card-body")
                let dataSourceHtml = `
                    <h5 class="card-title">${dataNueva.nombre}</h5>
                    <p class="card-text">${dataNueva.formato}</p>
                    <p class="card-text">${dataNueva.genero}</p>
                    <p class="card-text">${dataNueva.plataforma}</p>
                    <p class="card-text">${dataNueva.estado}</p>
                    <p class="card-text">${dataNueva.fecha}</p>
                    <div id="star${idCambios}" value="${dataNueva.valor}" class="estrellasCards estrellasQuietas">
                        <div cont="star${idCambios}" class="stars${idCambios}" value="1">★</div>
                        <div cont="star${idCambios}" class="stars${idCambios}" value="2">★</div>
                        <div cont="star${idCambios}" class="stars${idCambios}" value="3">★</div>
                        <div cont="star${idCambios}" class="stars${idCambios}" value="4">★</div>
                        <div cont="star${idCambios}" class="stars${idCambios}" value="5">★</div>
                    </div>
                    <p class="card-text">${dataNueva.texto}</p>
                `
                cardData.innerHTML = dataSourceHtml

                // #region prender estrellitas
                    let estrellas = document.querySelectorAll(`.stars${idCambios}`)

                    estrellas.forEach(star => {
                        if (Number(star.getAttribute("value")) <= Number(dataNueva.valor)) {
                            star.classList.add("starActive")
                        }
                    });
                // #endregion
                
                botonEditar.textContent = "Editar";
                // subir a la api

                // #region SUBIR API ***********
                const subir = await fetch(`https://66c9dc4559f4350f064da9c1.mockapi.io/api/v1/resources/${idCambios}`, {
                    method: 'PUT',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(dataNueva)
                });

                // #endregion 

            }
        })

        // #endregion *****************************************************************
    });

}
cargarPagina()

const dropdownsEdicion = function (idCambios) {
    let edicionItems = document.querySelectorAll(`.edicion-item${idCambios}`)
    console.log(edicionItems);

    edicionItems.forEach(element => {
        element.addEventListener("click", () => {
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
}

function modificarBoton(idObjetivo) {
    const checkboxes = document.querySelectorAll(`.genEditInput${idObjetivo}:checked`);
    const button = document.getElementById(`edicionGenero${idObjetivo}`);
    let selected = [];

    checkboxes.forEach((checkbox) => {
        selected.push(checkbox.value);
        let objetivo = checkbox.getAttribute("cont")
        document.getElementById(objetivo).setAttribute("valid", true)
    });

    // si seleccion mostrarla, sino "Géneros"
    if (selected.length > 0) {
        button.textContent = selected.join(', ');
    } else {
        button.textContent = 'Géneros';
    }

    
}

// subir
const moverEstrellas = function (idObjetivo) {
    let estrellas = document.querySelectorAll(`.stars${idObjetivo}`);

    for (const star of estrellas) {
        star.addEventListener("click", () => {
            valorStar = Number(star.getAttribute("value"))
            document.getElementById("formPuntuacion").setAttribute("value", valorStar)
            for (const starR of estrellas) {
                starR.classList.remove("starActive");
            }

            for (const starON of estrellas) {
                if (starON.getAttribute("value") <= valorStar) {
                    starON.classList.add("starActive")
                }
            }

            document.getElementById(`star${idObjetivo}`).setAttribute("value", valorStar)
        })
    }
}

const arreglarCheckBoxInterior = function () {
    document.querySelectorAll('.generosMenus').forEach(element => {
        console.log(element);

        element.addEventListener('click', function (event) {
            event.stopPropagation();
        });
    });
}

