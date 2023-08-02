export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);

    }
   
    if (input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    } else {
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input)

    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "customError"
]

const mensajeDeError = {
    nombre: {
        valueMissing: 'El campo Nombre, no puede estar vacio'
    },
    email: {
        valueMissing: 'El campo Email, no puede estar vacio',
        typeMismatch: 'El correo no es valido'
    }, 
    password: {
        valueMissing: 'El campo Contraseña, no puede estar vacio',
        typeMismatch: 'La contraseña no es valida'

    },
    nacimiento: {
        valueMissing: 'El campo Nacimeinto, no puede estar vacio',
customError: 'debes tener almenos 18 años'
    },
    numero: {
        valueMissing: 'El campo Número Telefónico, no puede estar vacio',
        patterMistmatch: 'El formato requerido es XXXXXXXXXX 10 numeros'
    },
    direccion: {
        valueMissing: 'El campo Dirección, no puede estar vacio',
        patterMistmatch: 'El formato requerido es XXXXXXXXXX 10 numeros'
    },
    ciudad: {
        valueMissing: 'El campo Ciudad, no puede estar vacio',
        patterMistmatch: 'El formato requerido es XXXXXXXXXX 10 numeros'
    },
    estado: {
        valueMissing: 'El campo Estado, no puede estar vacio',
        patterMistmatch: 'El formato requerido es XXXXXXXXXX 10 numeros'
    }

}

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
}

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach( error => {
        if (input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajeDeError[tipoDeInput][error]);
            mensaje = mensajeDeError[tipoDeInput][error];
        }
    })

    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = '';
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = 'debes tener almenos 18 años';
    };

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return (diferenciaFechas <= fechaActual);
}