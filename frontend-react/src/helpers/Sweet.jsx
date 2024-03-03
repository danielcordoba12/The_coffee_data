import Swal from 'sweetalert2';


const Sweet = {
    registroExitoso: (href) => {
        Swal.fire({
            title: 'Mensaje',
            icon: 'success',
            text: 'Registro exitoso',
            confirmButtonText: 'Cerrar'
        }).then(() => {
            if (href) {
                location.href = href
            }
        });
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
        return Swal.fire({
            title: '¿Seguro que quiere desabilitarlo?',
            text: 'Puede que el dato se pierda',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'Cancelar'
        });
    },
    deshabilitacionExitosa: () => {
        Swal.fire({
            title: 'Mensaje',
            icon: 'success',
            text: 'Se desactivo de forma exitosa',
            confirmButtonText: 'Cerrar'
        });
    },
    deshabilitacionFallida: () => {
        Swal.fire({
            title: 'Mensaje',
            icon: 'warning',
            text: 'No se logro desactivar',
            confirmButtonText: 'Cerrar'
        });
    },
    confimarHabilitar: () => {
        return Swal.fire({
            title: '¿Seguro que quiere habilitarlo?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: "Cancelar"
        });
    },
    habilitacionExitosa: () => {
        Swal.fire({
            title: 'Mensaje',
            icon: 'success',
            text: 'Se activo de forma exitosa',
            confirmButtonText: 'Cerrar'
        });
    },
    habilitacionFallida: () => {
        Swal.fire({
            title: 'Mensaje',
            icon: 'warning',
            text: 'No se logro activar',
            confirmButtonText: 'Cerrar'
        });
    },
    actualizacionExitosa: () => {
        Swal.fire({
            title: 'Mensaje',
            icon: 'success',
            text: 'Actualizacion exitosa',
            confirmButtonText: 'Cerrar'
        });
    },
    actualizacionFallida: () => {
        Swal.fire({
            title: 'Mensaje',
            icon: 'warning',
            text: 'Actualizacion fallida',
            confirmButtonText: 'Cerrar'
        })
    }


}
export default Sweet;