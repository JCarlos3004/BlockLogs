
async function UpdateDataGraph(){
    try {
        document.getElementById("loadingOverlay").style.display = "block";
        const data_0 = await fetch('/dashboard/getall');
        const data   = await data_0.json();
        const data_1 = await fetch('logs/getall');
        const data_2 = await data_1.json();
        console.log(data_2);
        MorrisArea('morris-area-chart-1', data);
        MorrisBar('chartContainer', data_2);
        document.getElementById("loadingOverlay").style.display = "none";
    }
    catch(e) {
        console.log(e);
    }
}
function MorrisArea(id, info){
            Morris.Area ({
                element: id,
                data: info,
                xkey: 'period', 
                ykeys: ['critico'], 
                labels: ['Critico'], 
                pointSize: 2,
                hideHover: 'auto',
                resize: true
            })
        }

// Datos del gráfico
const chartData = [
    { year: '2015', value: 10 },
    { year: '2016', value: 20 },
    { year: '2017', value: 15 },
    { year: '2018', value: 25 },
    { year: '2019', value: 30 }
  ];
  
  // Crear el gráfico dinámico
function MorrisBar(id, data_2){
        let countByDetalle = {};
        data_2.forEach((element) => {
            var detalle = element.detalle;
            if (countByDetalle[detalle]) {
                countByDetalle[detalle]++;
            } else {
                countByDetalle[detalle] = 1;
            }
         });
         var resultArray = Object.entries(countByDetalle).map(function ([detalle, cantidad]) {
            return { detalle: detalle, cantidad: cantidad };
          });
        let colors=[]
        for (let i = 0; i < resultArray.length; i++) {
            var color = getRandomColor(); // Función que genera un color aleatorio
            colors.push(color);
          }
    Morris.Bar({
            element: id, // ID del contenedor HTML
            data: resultArray, // Datos del gráfico
            barColors: colors,
            xkey: 'detalle', // Nombre del campo para el eje X
            ykeys: ['cantidad'], // Nombres de los campos para el eje Y
            labels: ['cantidad'] // Etiquetas para los campos en el eje Y
        });
}


function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

UpdateDataGraph();
