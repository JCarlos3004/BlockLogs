

async function getRegistros(){
    try {
        const registros = await fetch('/logs/getall');
        const regjson   = await registros.json();
        tables(regjson);
    }catch (e){
        console.log(e)
    }
}

function tables(reg){
    let tbody = document.getElementById("tbodyjs");
    tbody.innerHTML = '';
    reg.forEach((e) => {
        let row         = document.createElement('tr');
        let id          = document.createElement('td');
        let timestamp   = document.createElement('td');
        let usuario     = document.createElement('td');
        let casuistica  = document.createElement('td')
        let entidad     = document.createElement('td');
        let sistema     = document.createElement('td');
        let criticidad  = document.createElement('td');
        //let bloque      = document.createElement('td');
        //let estado      = document.createElement('td');
        id.innerHTML         = e.id;
        timestamp.innerHTML  = e.timestamp;
        usuario.innerHTML    = e.usuario;
        casuistica.innerHTML = e.casuistica
        entidad.innerHTML    = e.entidad;
        sistema.innerHTML    = e.sistema;
        criticidad.innerHTML = e.criticidad;
        //bloque.innerHTML     = e.bloque;
        //estado.innerHTML     = e.estado;
        if (e.criticidad === "Baja")  { criticidad.className = "classBaja";  }
        if (e.criticidad === "Media") { criticidad.className = "classMedia"; }
        if (e.criticidad === "Alta")  { criticidad.className = "classAlta";  }
        if (e.criticidad === "Severa"){ criticidad.className = "classSevera";}
          
        row.appendChild(id);
        row.appendChild(timestamp);
        row.appendChild(usuario);
        row.appendChild(casuistica);
        row.appendChild(entidad)
        row.appendChild(sistema);
        row.appendChild(criticidad);
        //row.appendChild(bloque);
        //row.appendChild(estado);

        tbody.appendChild(row); 
    })
    
    $(document).ready(function() {
        $('#dataTables-example').DataTable();
    });
}

getRegistros();