
async function UpdateDataGraph(){
    try {
        document.getElementById("loadingOverlay").style.display = "block";
        const data_0 = await fetch('/dashboard/getall');
        const data   = await data_0.json();
        const data_1 = await fetch('logs/getall');
        const data_2 = await data_1.json();
        GraphLineBlock('#morris-area-chart-1', data);
        GraphLineBlock('#morris-area-chart-2', data);
        GraphBarLogs('#chartContainer', data_2);
        GraphLogs("#chart",data_2)
        GraphCriticidad("#graphpie",data_2)
        //Agroupcrit(data_2)
        document.getElementById("loadingOverlay").style.display = "none";
    }
    catch(e) {
        console.log(e);
    }
}



function Agroupcrit(data){
  const data_2 = data.map(item => ({ "criticidad" : item.criticidad, "cantidad" : 1 }));
  const data_3 = data_2.reduce((sumTotal , {criticidad, cantidad}) => {sumTotal[criticidad] = (sumTotal[criticidad] || 0 ) + cantidad; return sumTotal; }, {})
  const arraycrit = Object.entries(data_3).map( ([criticidad]) => criticidad)
  const arraycant = Object.entries(data_3).map( ([,cantidad])   => cantidad)
  return [arraycrit, arraycant];  
}


function GraphCriticidad(id, data){
  const [arraycrit, arraycant] = Agroupcrit(data);
  let options = { series: arraycant, 
                   chart: { width: 440, type: 'donut', dropShadow: { enabled: true, color: '#111', top: -1, left: 3, blur: 3, opacity: 0.2 } },
                  stroke: { width: 0,},
             plotOptions: { pie: { donut: { labels: { show: true, total: { showAlways: false, show: true , label: 'Total de Logs' } } } } },
                tooltip : { enabled: true, style: { fontSize: '12px' } },
                  labels: arraycrit,
              dataLabels: { dropShadow: { blur: 3, opacity: 0.8 } },
                    fill: { type: 'solid', colors: ['#40C060', '#ffff00', '#ff0000'], hover: { fillOpacity : 1} },
                  states: { hover: { filter: 'none' } },
                   theme: { palette: 'palette1', monochrome: { enabled: true, color: '#FFC7A2', shadeTo: 'light', shadeIntensity: 0.65 }, paletteExtension: { colors: ['#ffff00', '#ff0000'] } },
                   title: { text: "Criticidad" },
                  legend: { labels: { useSeriesColors: false }, markers: { fillColors: ['#40C060', '#ffff00', '#ff0000'] } },
              responsive: [{ breakpoint: 480, options: { chart: { width: 200 }, legend: {  position: 'bottom' } } }] };

  var chart = new ApexCharts(document.querySelector(id), options);
  chart.render();
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
      let options = { series: [{ name: 'Citrix', type: 'column', data: cantidadesCitrix}, 
                               { name: 'Amdocs', type: 'column', data: cantidadesAmdocs},
                               { name: 'Total',  type: 'line',   data: sumaTotal }],
                       chart: { height: 350, type: 'line', stacked: false },
                  dataLabels: { enabled: false },
                      stroke: { width: [1, 1, 4]},
                       title: { text: 'Logs recopilados', align: 'left', offsetX: 110 },
                       xaxis: { categories: fechas0, },
                       yaxis: [ { axisTicks: { show: true, }, axisBorder: { show: true, color: '#008FFB' }, labels: { style: { colors: '#008FFB',}}, title: { text: "Logs Citrix", style: { color: '#008FFB', } }, tooltip: { enabled: true }},
                                { seriesName: 'Income', opposite: true, axisTicks: { show: true, }, axisBorder: { show: true, color: '#00E396' }, labels: { style: { colors: '#00E396', }}, title: { text: "Logs Amdocs", style: { color: '#00E396', }},},
                                { seriesName: 'Revenue', opposite: true, axisTicks: { show: true, }, axisBorder: { show: true, color: '#FEB019'}, labels: { style: { colors: '#FEB019',},}, title: { text: "Total", style: { color: '#FEB019',}} },
                              ],
                     tooltip: { fixed: { enabled: true, position: 'topLeft', offsetY: 30, offsetX: 60},},
                      legend: { horizontalAlign: 'left', offsetX: 40}
                    };

      let chart = new ApexCharts(document.querySelector(id), options);
      chart.render();
}

function AgroupGraphLine(data){
  const groupedData = data.reduce((acc, item) => {
    const { x, y } = item;
    if (acc[x]) {
      acc[x]++;
    } else {
      acc[x] = 1;
    }
    return acc;
    },{});
  const aggregatedData = Object.entries(groupedData).map(([x, y]) => ({ x, y }));
  const newData = aggregatedData.map(item => ({
          x: new Date(item.x),
          y: item.y
        }));
  return newData;
}

function GraphLineBlock(id,data){
  const datos = AgroupGraphLine(data);
  let options = { series: [ {name: 'Mineria', data: datos }],
                   chart: { type: 'area', stacked: false, height: 350, zoom: { type: 'x', enabled: true, autoScaleYaxis: true}, toolbar: {autoSelected: 'zoom'}},
              dataLabels: { enabled: false },
                 markers: { size: 0, },
                   title: { text: 'Bloques minados', align: 'left' },
                    fill: { type: 'gradient', gradient: { shadeIntensity: 1, inverseColors: false, opacityFrom: 0.5, opacityTo: 0, stops: [0, 90, 100]}, },
                   yaxis: { title: { text: 'Cantidad' },},
                   xaxis: { type: 'datetime' }};

    let chart = new ApexCharts(document.querySelector(id), options);
    chart.render();
}

function AgrupBarLogs(data){
  let countByDetalle = {};
        data.forEach((element) => {
            var detalle = element.detalle;
            if (countByDetalle[detalle]) {
                countByDetalle[detalle]++;
            } else {
                countByDetalle[detalle] = 1;
            }
         });
    let array = Object.entries(countByDetalle).map(function ([detalle, cantidad]) {
          return  { detalle: detalle, cantidad: cantidad };
          });
    const cantidades    = array.map(item => item.cantidad);
    const detalles      = array.map(item => item.detalle);
    return [Object.values(cantidades),Object.values(detalles)];
}


function GraphBarLogs(id, data){
    let [Arraycantidad, Arraydetalle] = AgrupBarLogs(data)
    let options = { series: [ { data: Arraycantidad }],
                     chart: { height: 350, type: 'bar', events: { click: function(chart, w, e) { }} },
               plotOptions: { bar: { columnWidth: '45%', distributed: true } },
                dataLabels: { enabled: false },
                    legend: { show: false },
                     xaxis: { categories: Arraydetalle, labels: { style: { fontSize: '12px' } } }
                  };
    var chart = new ApexCharts(document.querySelector(id), options);
    chart.render();
}

UpdateDataGraph();
