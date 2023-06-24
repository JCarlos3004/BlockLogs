
let cabeceras = []
async function obtenerLogs(){
  const logs = await fetch('/logs/getall');
  const data = await logs.json();
  GraphLogs("#GraficoData",data)
  let dataDispo    = document.getElementById("DataDisponible");
  let dataSelec    = document.getElementById("DataSeleccionada");
  let allDataSelec = document.getElementById("AllDataSelec");
  dataDispo.innerHTML = "";
  let columns = Object.keys(data[0]);
  columns.forEach((e) => {
      let div   = document.createElement('div')
      let div_1 = document.createElement('div')
      let icon  = document.createElement('i')

      div_1.innerHTML = e;
      div_1.className = "DivDisponible2"
      div.className   = "DivDisponible" 
      icon.className  = "fa-solid fa-plus itemCruz";

      div.appendChild(div_1);
      div.appendChild(icon);
      dataDispo.appendChild(div);

  div.addEventListener('click', function clickHandler(){
      const text    = div.textContent;
      cabeceras.push(text)
      //Evitar agregar el div nuevamente
      div.removeEventListener('click', arguments.callee);

      //let ItemDiv2  = document.getElementById('idCampos2');
      let ItemDiv3   = document.createElement('div');
      let ItemDiv3_1 = document.createElement('div');
      let ItemDiv4   = document.createElement('div');
      let icon2  = document.createElement('i');

      icon2.className  = "fa-solid fa-x ItemIcono itemX";
      ItemDiv3_1.innerHTML = text;
      ItemDiv3_1.className = 'DivSeleccionados2';
      ItemDiv3.className   = 'DivSeleccionados';
      ItemDiv3.appendChild(ItemDiv3_1)
      ItemDiv3.appendChild(icon2)
      dataSelec.appendChild(ItemDiv3);



      let resultados = data.map(objeto => objeto[e])

      //////// TABLE
      let table  = document.createElement('table');
      let tr     = document.createElement('tr');
      let th     = document.createElement('th');
      let tr_contenido = document.createElement('tr');
      //////// FIN TABLE

      th.innerHTML = e;
      table.className = 'TableData';
      tr.appendChild(th);
      table.appendChild(tr);

      resultados.forEach((k) => {
          let tr_contenido = document.createElement('tr');
          let td = document.createElement('td');
          td.innerHTML = k;
          tr_contenido.append(td);
          table.appendChild(tr_contenido);
      })

      ItemDiv4.append(table);
      ItemDiv4.className = 'MostrarData';
      allDataSelec.appendChild(ItemDiv4);
      
      ItemDiv3.addEventListener('click', function() {
          dataSelec.removeChild(ItemDiv3); // Eliminar del div de selección
          // Obtener el índice del elemento a eliminar
          let indice = cabeceras.indexOf(ItemDiv3.textContent);
          if (indice !== -1) {
            // Eliminar el elemento utilizando el método splice()
            cabeceras.splice(indice, 1);
          }
          dataDispo.appendChild(div); // Regresar al div original
          allDataSelec.removeChild(ItemDiv4); // Eliminar del div de visualización
          div.addEventListener('click', clickHandler); // Restaurar el evento de clic en el div original
      });
      div.parentNode.removeChild(div);
      });
  });

  //console.log("Cabeceras -->",cabeceras)
  //  dataDispo.appendChild(row);
}

function AgroupLogs(data){
  const fechas   = data.map(item => item.timestamp);
  const fechas_1 = fechas.filter((valor, indice) => {
    return fechas.indexOf(valor) === indice;
  });

  const resultado = data.reduce((acumulador, elemento) => {
    const { timestamp, sistema } = elemento;
    if (!acumulador[timestamp]) {
      acumulador[timestamp] = {};
    }
    if (!acumulador[timestamp][sistema]) {
      acumulador[timestamp][sistema] = 0;
    }
    acumulador[timestamp][sistema]++;
    return acumulador;
  }, {});
  
  // Añadir cero para sistemas faltantes en cada fecha
  Object.values(resultado).forEach(objetoFecha => {
    const sistemas = Object.keys(objetoFecha);
    const todosSistemas = [...new Set(data.map(item => item.sistema))];
    const sistemasFaltantes = todosSistemas.filter(sistema => !sistemas.includes(sistema));
    sistemasFaltantes.forEach(sistema => {
      objetoFecha[sistema] = 0;
    });
  });
  const clavesOrdenadas = Object.keys(resultado).sort();
  const nuevoObjeto = {};
  clavesOrdenadas.forEach((clave) => {
    nuevoObjeto[clave] = resultado[clave];
  });
  const fechas0 = Object.keys(nuevoObjeto);
  const cantidadesCitrix = fechas0.map(fecha => nuevoObjeto[fecha]['Citrix'] || 0);
  const cantidadesAmdocs = fechas0.map(fecha => nuevoObjeto[fecha]['Amdocs'] || 0);
  return [fechas0, cantidadesCitrix, cantidadesAmdocs]
}

function GraphLogs(id,data){
  const [fechas0, cantidadesCitrix, cantidadesAmdocs] = AgroupLogs(data)
  const sumaTotal = cantidadesCitrix.map((cantidadCitrix, index) => cantidadCitrix + cantidadesAmdocs[index]);
  let options = { series: [{ name: 'Logs', type: 'column', data: sumaTotal}], 
                           //{ name: 'Amdocs', type: 'column', data: cantidadesAmdocs},
                           //{ name: 'Total',  type: 'line',   data: sumaTotal }],
                   chart: { height: 250, width: 900, type: 'line', stacked: false },
              dataLabels: { enabled: false },
                  stroke: { width: [1, 1, 4]},
                   title: { text: 'Logs recopilados', align: 'left', offsetX: 110 },
                   xaxis: { categories: fechas0, },
                   yaxis: [ { axisTicks: { show: true, }, axisBorder: { show: true, color: '#008FFB' }, labels: { style: { colors: '#008FFB',}}, title: { text: "Logs", style: { color: '#008FFB', } }, tooltip: { enabled: true }},
                            //{ seriesName: 'Income', opposite: true, axisTicks: { show: true, }, axisBorder: { show: true, color: '#00E396' }, labels: { style: { colors: '#00E396', }}, title: { text: "Logs Amdocs", style: { color: '#00E396', }},},
                            //{ seriesName: 'Revenue', opposite: true, axisTicks: { show: true, }, axisBorder: { show: true, color: '#FEB019'}, labels: { style: { colors: '#FEB019',},}, title: { text: "Total", style: { color: '#FEB019',}} },
                          ],
                 tooltip: { fixed: { enabled: true, position: 'topLeft', offsetY: 30, offsetX: 60},},
                  legend: { horizontalAlign: 'left', offsetX: 40}
                };

  let chart = new ApexCharts(document.querySelector(id), options);
  chart.render();
}

async function GuardarInfo(information){
  const logs = await fetch('/logs/getall');
  const data = await logs.json();
  const info = []
  let obj = {};
  information.forEach((e) => {
    let resultados = data.map(objeto => objeto[e])
    obj[e] = resultados;
    info.push(obj)
  })
  return info
}

document.addEventListener('DOMContentLoaded', function() {
  let buttonAbrir   = document.getElementById("Guardar");
  let buttonCerrar  = document.getElementById("btn-cerrar-modal");
  let buttonGuardar = document.getElementById("btn-guardar-modal");
  let modal         = document.getElementById("modal");
  let inputTitulo   = document.getElementById("inputTitulo");
  let textArea      = document.getElementById("textArea");
  let inputEtiqueta = document.getElementById("inputEtiqueta");

  buttonCerrar.addEventListener('click', async () => {
    const info = await GuardarInfo(cabeceras);
    if (modal.hasAttribute('open')){
      inputTitulo.value = '';
      textArea.value = '';
      inputEtiqueta.value = '';
      modal.close()
    }
  });

  buttonAbrir.addEventListener('click', () => {
    if (!modal.hasAttribute('open')){
      modal.showModal();
    }
  });

  buttonGuardar.addEventListener('click', async () => {
    const titulo = inputTitulo.value;
    const descripcion = textArea.value;
    const etiqueta = inputEtiqueta.value;

    const info = await GuardarInfo(cabeceras);
    let Array = []
    let Obj   = {}
    Obj["titulo"] = titulo
    Array.push(Obj)
    Obj["descripcion"] = descripcion
    Array.push(Obj)
    Obj["etiqueta"] = etiqueta
    Array.push(Obj)
    Obj["datos"] = info[0]
    Array.push(Obj)
    SaveLogs(Array[0])
    if (modal.hasAttribute('open')){
      inputTitulo.value = '';
      textArea.value = '';
      inputEtiqueta.value = '';
      modal.close();
    }
  });

});

async function SaveLogs(data){
  try {
    await fetch("/logssave/create",  {
      method : 'POST',
      headers: {"Content-Type" : "application/json"},
      body   : JSON.stringify(data)
    })
  }
  catch (e) {
    console.log(e)
  }
}


async function ShowLogs() {
  try {
    const data = await fetch("logssave/getall");
    const response = await data.json();
    
    if (Array.isArray(response) && response.length > 0) {
      const defSave = document.getElementById("tbodyGuardados");

      response.forEach((e, index) => {
        let tr = document.createElement('tr');
        let tdId = document.createElement('td');
        let tdTitulo = document.createElement('td');
        let tdDescripcion = document.createElement('td');

        tdId.innerHTML = index + 1;
        tdTitulo.innerHTML = e.titulo;
        tdDescripcion.innerHTML = e.descripcion;

        tr.appendChild(tdId);
        tr.appendChild(tdTitulo);
        tr.appendChild(tdDescripcion);

        defSave.appendChild(tr);
      });

    } else {
      console.log("No hay datos disponibles para mostrar en la tabla.");
    }
    initializeDataTable()
  } catch (e) {
    console.log(e);
  }
}


document.addEventListener('DOMContentLoaded', function(){
  let Configuraciones = document.getElementById('RecovConfig');
  let modal1 = document.getElementById('modal-1')
  let CerrarModal = document.getElementById('btn-cerrar-modal-1')
  Configuraciones.addEventListener('click', ()=> {
    modal1.showModal();
  })
  CerrarModal.addEventListener('click', ()=> {
    modal1.close()
  })
})


function initializeDataTable() {
    $(document).ready(function () {
      $('#example').DataTable({
        language: { search: "Titulo: " },
        paginate: {
          previous: "Anterior",
          next: "Siguiente"
        },
        info: false,
        columnDefs: [ { width: '40px', targets: 0, className: 'dt-center'},
                      { className: 'dt-center', targets: '_all' }
                    ],
      }); 
    });
};

ShowLogs();
obtenerLogs();
GuardarInfo(cabeceras);







