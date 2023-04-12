document.addEventListener('DOMContentLoaded', function () {

    const form = {
        nombres: '',
        apellidos: '',
        mail: '',
        telefono: '',
        rut: '',
        motivo: ''
    }

    //Sleccionamos los elementos
    const inputNombres = document.querySelector('#nombres');
    const inputApellidos = document.querySelector('.apellidos');
    const inputEmail = document.querySelector('#mail');
    const inputTelefono = document.querySelector('#telefono');
    const inputRut = document.querySelector('#rut');
    const inputMotivo = document.querySelector('#motivo');
    const formulario = document.querySelector('#formulario')
    const botonEnviar = document.getElementById('btnEnviar')
    

    // Asignar eventos
    inputNombres.addEventListener('blur', validar)
    inputApellidos.addEventListener('blur', validar)
    inputEmail.addEventListener('blur', validar)
    inputTelefono.addEventListener('blur', validar)
    inputRut.addEventListener('blur', validar)
    inputMotivo.addEventListener('blur', validar)
    formulario.addEventListener('submit', enviarForm)
  

    function enviarForm(e) {
        e.preventDefault()

        resetFormulario()
        // Crear alerta
        const alertaExito = document.createElement('SPAN')
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
        
        if (e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            console.log(e.target.parentElement)
            form[e.target.name] = ''
            comprobarForm()
            return
        }
       
        
        if (e.target.id === 'mail' && !validarEmail(e.target.value) ) {
            mostrarAlerta('El email no es válido', e.target.parentElement)
            form[e.target.name] = ''
            comprobarForm()
            return
        }
      
        var Rut = {
            // Valida el rut con su cadena completa "XXXXXXXX-X"
            validaRut : function (rutCompleto) {
                rutCompleto = rutCompleto.replaceAll(".","");
                if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
                    return false;
                var tmp 	= rutCompleto.split('-');
                var digv	= tmp[1]; 
                var rut 	= tmp[0];
                if ( digv == 'K' ) digv = 'k' ;
                
                return (Rut.dv(rut) == digv );
            },
            dv : function(T){
                var M=0,S=1;
                for(;T;T=Math.floor(T/10))
                    S=(S+T%10*(9-M++%6))%11;
                return S?S-1:'k';
            }
        }
        
        
        if (e.target.id === 'rut' && !Rut.validaRut(e.target.value)) {
            mostrarAlerta('El rut no es válido', e.target.parentElement)
            document.getElementById('rut').classList.add('input-incorrecto')
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




        const error = document.createElement('SPAN')
        error.textContent = mensaje
        error.style.color = 'red'
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
        form.nombres = '',
        form.apellidos = '',
        form.mail = '',
        form.telefono = '',
        form.rut = '',
        form.motivo = ''

        formulario.reset()
        comprobarForm()
    }

   
    

 

})