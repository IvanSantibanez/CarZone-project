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
    inputMotivo.addEventListener('input', validar)
    formulario.addEventListener('submit', enviarEmail)

    function enviarEmail(e) {
        e.preventDefault()

        resetFormulario()
        // Crear alerta
        const alertaExito = document.createElement('P')
        alertaExito.textContent = 'Mensaje enviado correctamente'
        alertaExito.style.backgroundColor = 'green'
        alertaExito.style.color = 'white'
        alertaExito.style.textAlign = 'center'
        alertaExito.style.width = '50%'
        alertaExito.style.borderRadius = '10px'


        formulario.appendChild(alertaExito)

        setTimeout(()=> {
            alertaExito.remove()
        },3000)

    }

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
        if (e.target.id === 'rut' && !validarRut(e.target.value)) {
            mostrarAlerta('El rut no es válido', e.target.parentElement)
            form[e.target.name] = ''
            comprobarForm()
            return
        }

        if (e.target.id === 'telefono' && !validarTelefono(e.target.value)) {
            mostrarAlerta('El número no es válido', e.target.parentElement)
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
        error.style.width = '50%'
        error.style.borderRadius = '10px'
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

    function validarRut(rut) {
        const regex = /^0*(\d{1,3}(\.?\d{3})*)\-?([\dkK])$/
        const resultado = regex.test(rut)
        return resultado
    }

    function validarTelefono(telefono) {
        const regex = /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/
        const resultado = regex.test(telefono)
        return resultado
    }

    //Comprobamos que todos los campos esten ingresados
    function comprobarForm() {
        //si no están todos ingresados, el botón no estará disponible
        if (Object.values(form).includes('')) {
            botonEnviar.disabled = true
            botonEnviar.style.opacity = '60%'
            botonEnviar.style.cursor = 'not-allowed'
            return

        }
        botonEnviar.disabled = false
        botonEnviar.style.opacity = '100%'
        botonEnviar.style.cursor = 'pointer'

    }

    function resetFormulario() {
        form.nombre = ''
        form.apellidoPaterno = ''
        form.apellidoMaterno = ''
        form.mail = ''
        form.telefono = ''
        form.rut = ''
        form.motivo = ''

        formulario.reset()
        comprobarForm()
    }

})