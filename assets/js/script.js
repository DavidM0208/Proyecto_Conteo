let papa_noel = "off";
let papa_noel_stop = document.getElementById("caja_principal")
let boton_sonido = new Audio("../assets/sounds/sonido.mp3")
function dance() {
    // Los 2 == es una sentencia de comparación en el IF, solo 1 = es una sentencia de asignación
    if (papa_noel == "off") {
        papa_noel = "on";
        // classList junto a la sentencia add, agrega una clase a la clase a la clase principal
        // papa_noel_stop.classList.add("Dance");
        papa_noel_stop.addEventListener('click', () => {
            boton_sonido.play();
        })
        console.log("On");
    } else {
        papa_noel = "off";
        // classList junto a la sentencia remove, quita una clase a la clase a la clase principal
        papa_noel_stop.classList.remove("Dance");
        papa_noel_stop.addEventListener('click', () => {
            boton_sonido.pause();
        })
        console.log("Off");
    }
}   
function obtener_tiempo_faltante(fecha_limite) {
    const now = new Date();
    // Se le restan los 1000 ML porque tiene retrasos de 1 segundo
    tiempo_faltante = (new Date(fecha_limite) - now + 1000) / 1000;
    // Se concatena ell cero y se hace una operación en la que valida el el tiempo este en 60
    segundos_faltantes = ('0' + Math.floor(tiempo_faltante % 60)).slice(-2);
    minutos_faltantes = ('0' + Math.floor(tiempo_faltante / 60 % 60)).slice(-2);
    horas_faltantes = ('0' + Math.floor(tiempo_faltante / 3600 % 24)).slice(-2);
    dias_faltantes = ('0' + Math.floor(tiempo_faltante / (3600 * 24))).slice(-2);
    return {
        segundos_faltantes,
        minutos_faltantes,
        horas_faltantes,
        dias_faltantes,
        tiempo_faltante,
    };
};
// console.log(obtener_tiempo_faltante('DEC 25 2023 00:00:00 GMT-0500'));
function cuenta_regresiva(tiempo_faltante, reloj, mensaje) {
    const e = document.getElementById(reloj);
    const tiempo_actual = setInterval(() => {
        const t = obtener_tiempo_faltante(tiempo_faltante);
        e.innerHTML =
            `
        <div class="tiempo">
            <div>
                <span>${t.dias_faltantes}</span>
                <br>
                <p>D</p>
            </div>
            <div>
                <span>${t.horas_faltantes}</span>
                <br>
                <p>H</p>
            </div>
            <div>
                <span>${t.minutos_faltantes}</span>
                <br>
                <p>M</p>
            </div>
            <div>
                <span>${t.segundos_faltantes}</span>
                <br>
                <p>S</p
            </div>
        </div>`;
        if (t.tiempo_faltante < 1) {
            clearInterval(tiempo_actual);
            e.innerHTML = mensaje;
        }
    }, 1000)
};
cuenta_regresiva('DEC 25 2023 00:00:00 GMT-0500', 'cuenta_regresiva', '¡Feliz Navidad!');
