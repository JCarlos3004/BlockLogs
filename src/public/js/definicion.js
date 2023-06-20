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
        icon.className  = "fa-solid fa-plus ItemIcono";

        div.appendChild(div_1);
        div.appendChild(icon);
        dataDispo.appendChild(div);

    div.addEventListener('click', function clickHandler(){
        const text    = div.textContent;
        //Evitar agregar el div nuevamente
        div.removeEventListener('click', arguments.callee);

        //let ItemDiv2  = document.getElementById('idCampos2');
        let ItemDiv3   = document.createElement('div');
        let ItemDiv3_1 = document.createElement('div');
        let ItemDiv4   = document.createElement('div');
        let icon2  = document.createElement('i');

        icon2.className  = "fa-solid fa-plus ItemIcono";
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
            dataDispo.appendChild(div); // Regresar al div original
            allDataSelec.removeChild(ItemDiv4); // Eliminar del div de visualización
            div.addEventListener('click', clickHandler); // Restaurar el evento de clic en el div original
        });
        div.parentNode.removeChild(div);
        });

    });
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
    const fechas0 = Object.keys(resultado);
    const cantidadesCitrix = fechas0.map(fecha => resultado[fecha]['Citrix'] || 0);
    const cantidadesAmdocs = fechas0.map(fecha => resultado[fecha]['Amdocs'] || 0);
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


obtenerLogs();







