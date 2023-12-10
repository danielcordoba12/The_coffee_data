console.log("hola desde resultado");
function listarResultado(){

    fetch('http://localhost:4000/resultado/listar',{
        method: 'get'
    })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            let filas = '';
            data.forEach(element => {
                filas += `<thead>
                <tr>
                <td>${element.variable}</td>
                <td>${element.valor}</td>


                </tr>
                </thead>
                        <tr>
                        </tr>`
            });
            document.getElementById('tablaResultado').innerHTML = filas;

        })
        .catch(err => console.log(err))

}
listarResultado();
// export default listarResultado;