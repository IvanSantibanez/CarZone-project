document.addEventListener('DOMContentLoaded', function () {

    const form = {
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        mail: '',
        telefono: '',
        rut: '',
        motivo: '',
    }

    //Sleccionamos los elementos
    const inputNombre = document.querySelector('#nombre');
    const inputApellidoP = document.querySelector('.apellidoP');
    const inputApellidoM = document.querySelector('.apellidoM');
    const inputEmail = document.querySelector('#mail');
    const inputTelefono = document.querySelector('#telefono');
    const inputRut = document.querySelector('#rut');
    const inputMotivo = document.querySelector('#motivo');
    const formulario = document.querySelector('#formulario')
    const botonEnviar = document.getElementById('enviar')

    // Asignar eventos
    inputNombre.addEventListener('blur', validar)
    inputApellidoP.addEventListener('blur', validar)
    inputApellidoM.addEventListener('blur', validar)
    inputEmail.addEventListener('blur', validar)
    inputTelefono.addEventListener('blur', validar)
    inputRut.addEventListener('blur', validar)
    inputMotivo.addEventListener('blur', validar)



    function validar(e) {
        console.log(e.target.parentElement)
        if (e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            form[e.target.name] = ''
            comprobarForm()
            return
        }
        if (e.target.id === 'mail' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es válido', e.target.parentElement)
            form[e.target.name] = ''
            comprobarForm()
            return
        }

        limpiarAlerta(e.target.parentElement)

        //Asignar los valores 
        form[e.target.name] = e.target.value.trim().toLowerCase()

        // Comprobar el obj de form
        comprobarForm()
    }

    function mostrarAlerta(mensaje, referencia) {

        limpiarAlerta(referencia)




        const error = document.createElement('P')
        error.textContent = mensaje
        error.style.backgroundColor = 'red'
        error.style.color = 'white'
        error.style.textAlign = 'center'
        error.style.width = '30rem'
        error.classList.add('alerta')


        referencia.appendChild(error)

    }

    function limpiarAlerta(referencia) {
        // Comprobar si ya existe una alerta
        const alerta = referencia.querySelector('.alerta')
        if (alerta) {
            alerta.remove()
        }
    }

    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email)
        return resultado
    }

    function comprobarForm() {
        if (Object.values(form).includes('')) {
            botonEnviar.disabled = true
            botonEnviar.style.opacity = '60%'
            return

        }
        botonEnviar.disabled = false
        botonEnviar.style.opacity = '100%'



    }
})