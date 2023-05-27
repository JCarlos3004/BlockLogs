

async function getRegistros(){
    const registros = await fetch('/logs/getall');
    const regjson   = await registros.json();
    tables(regjson);
}

function tables(reg){
    let tbody = document.getElementById("tbodyjs");
    tbody.innerHTML = '';
    reg.forEach((e) => {
        let row         = document.createElement('tr');
        let id          = document.createElement('td');
        let timestamp   = document.createElement('td');
        let dispositivo = document.createElement('td');
        let detalle     = document.createElement('td')
        let bloque      = document.createElement('td');
        let estado      = document.createElement('td');
        id.innerHTML         = e.id;
        timestamp.innerHTML  = e.timestamp;
        dispositivo.innerHTML= e.dispositivo;
        detalle.innerHTML    = e.detalle;
        bloque.innerHTML     = e.bloque;
        estado.innerHTML     = e.estado;
        
        row.appendChild(id);
        row.appendChild(timestamp);
        row.appendChild(dispositivo);
        row.appendChild(detalle);
        row.appendChild(bloque);
        row.appendChild(estado);

        tbody.appendChild(row); 
    })
    
    $(document).ready(function() {
        $('#dataTables-example').DataTable();
    });
}

getRegistros();