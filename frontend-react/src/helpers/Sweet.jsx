import Swal from 'sweetalert2';


const Sweet = {
    registroExitoso: () =>{
        Swal.fire({
            title: 'Mensaje',
            icon: 'success',
            text: 'Registro exitoso',
            confirmButtonText: 'Cerrar'
        })
    },
    registroFallido: () => {
        Swal.fire({
            title: 'Mensaje',
            icon: 'warning',
            text: 'Resgistro fallido',
            confirmButtonText: 'Cerrar'
        });
    },
    confimarDeshabilitar: () => {
        Swal.fire ({
            title: '¿Seguro que quiere desabiitarlo?',
            text:'Puede que el dato se pierda',
            icon: 'Warning',
            showCancelButton: true,
            confirmButtonColor:'#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText : 'Si',
            cancelButtonText: 'Cancelar'
        });
    },
    deshabilitacionExitosa: () => {
        Swal.fire ({
            title: 'Mensaje',
            icon: 'succes',
            text: 'Se desactivo de forma exitosa',
            confirmButtonText: 'Cerrar'
        });
    },
    deshabilitacionFallida: () => {
        Swal.fire ({
            title: 'Mensaje',
            icon: 'warning',
            text: 'No se logro desactivar',
            confirmButtonText: 'Cerrar'
        });
    },
    confimarHabilitar: () => {
        Swal.fire ({
            title: 'Mensaje',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: "Cancelar"
        });
    },
    habilitacionExitosa: () => {
        Swal.fire ({
            title: 'Mensaje',
            icon: 'succes',
            text: 'Se activo de forma exitosa',
            confirmButtonText: 'Cerrar'
        });
    },
    habilitacionFallida: () => {
        Swal.fire ({
            title: 'Mensaje',
            icon: 'warning',
            text: 'No se logro activar',
            confirmButtonText: 'Cerrar'
        });
    },
    actualizacionExitosa: () => {
        Swal.fire({
            title:'Mensaje',
            icon:'success',
            text: 'Actualizacion exitosa',
            confirmButtonText: 'Cerrar'
        });
    },
    actualizacionFallida: () =>{
        Swal.fire ({
            title: 'Mensaje',
            icon: 'warning',
            text: 'Actualizacion fallida',
            confirmButtonText: 'Cerrar'
        })
    }


} 
export default Sweet;