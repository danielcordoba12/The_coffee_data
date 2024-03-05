const Validate =
 {
 
validarCampos: (formSelector) => {// function para validar si los campos se mandan vacios
  const formControl = document.querySelectorAll(`${formSelector}`);
    const camposVacios = [];
  formControl.forEach((campo) => {
    const value = campo.value.trim();
     
if
 (!value) { 
      camposVacios.push(campo.id);
      campo.classList.add('is-invalid');
      }
else
 {campo.classList.remove('is-invalid');
      }
});
 
   
if
 (camposVacios.length > 0){
     
console.log('Camposvacíos:',
camposVacios);
     
return false;
    }
return true;
  },
 
validarSelect:
function(selector) {
   
const
selects
=
document.querySelectorAll(selector);
   
let
validacionExitosa
=
true;
   
selects.forEach(select => {
     
const
selectedOption
=
select.querySelector('.react-select__single-value');
     
if
 (!selectedOption
||
!selectedOption.textContent)
 {
       
select.classList.add('is-invalid');
       
validacionExitosa = false;
      }
else
 {
       
select.classList.remove('is-invalid');
      }
    });
   
return validacionExitosa;
  },
 
limpiar:(limpiar) =>{//funcion para limpiar los campos del formulario
  let limpiarElemento = document.querySelectorAll(`${limpiar}`);
   limpiarElemento.forEach((element) =>{ element.value= '';
    });
  }
};


export default Validate;