
function BloqMinados(data){
    const bloqmin = `<h3>${data.length}</h3>`
    document.getElementById("bloqmin").innerHTML = bloqmin;
}

function TiemPromedio(){
    const temprom = `<h3>-</h3>`
    document.getElementById("tiemprom").innerHTML = temprom;
}

function TransAsig(data){
    let cont = 0;
    data.forEach((e) => {
        if (e.bloque !== "- "){
            cont++
        } 
    })
    const bloqmin = `<h3>${cont}</h3>`
    document.getElementById("transasig").innerHTML = bloqmin;
}

function TransPend(data){
    let cont_1 = 0;
    data.forEach((e) => {
        if (e.bloque == "-"){
            cont_1++
        } 
    })
    const temprom = `<h3>${cont_1}</h3>`
    document.getElementById("transpend").innerHTML = temprom;
}

function ListBloq(data,data_1){
    let tbody = document.getElementById("tbodycontent");
    tbody.innerHTML = '';
    data.forEach((e) => {
        let row         = document.createElement('tr');
        let index       = document.createElement('td');
        let hash        = document.createElement('td');
        let bymine      = document.createElement('td');
        let trans       = document.createElement('td');
        let timestamp   = document.createElement('td');
        let detalle     = document.createElement('td');
        row.className   = "dt-control"
        index.innerHTML = e.index;
        hash.innerHTML  = e.hash;
        bymine.innerHTML= "System";
        trans.innerHTML = Object.values(e.data).length;
        timestamp.innerHTML= e.timestamp;
        detalle.className ="dt-control"
        detalle.innerHTML = "";
        
        row.appendChild(index);
        row.appendChild(hash);
        row.appendChild(bymine);
        row.appendChild(trans);
        row.appendChild(timestamp);
        row.appendChild(detalle);
        tbody.appendChild(row); 
    })
}
function format(d,data) {
    let prevHash="";
    let dataArr ="";
    let timest  =";"
    data.forEach((e) => {
        if (parseInt(d[0]) === e.index) {
            prevHash = e.previousHash
            dataArr  = e.data
            timest   = e.timestamp
        }
    })
    // `d` is the original data object for the row
    return (
        '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
        '<td>N° Bloque:</td>' +
        '<td>' +
        d[0] +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Hash:</td>' +
        '<td>' +
        d[1] +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Previous Hash:</td>' +
        '<td>'+
        prevHash +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Data:</td>' +
        '<td>'+
        JSON.stringify(dataArr) +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Timestamp:</td>' +
        '<td>'+
        timest +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Duracion:</td>' +
        '<td>'+
        "-" +
        '</td>' +
        '</tr>' +
        '</table>'
    );
}

async function main(){
    try {
        const data    = await fetch('/logs/getall');
        const data_1  = await data.json();
        const data_2  = await fetch('/block/getall');
        const data_3  = await data_2.json();
        TransAsig(data_1)
        TransPend(data_1)
        BloqMinados(data_3)
        ListBloq(data_3)
        TiemPromedio()
        let table;
        $(document).ready(function() {
            table = $('#my-table').DataTable();
        });
        $('#my-table tbody').on('click', 'td.dt-control', function () {
            let tr = $(this).closest('tr');
            let row = table.row(tr);
            console.log(table.row(tr).data())
            if (row.child.isShown()) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
            } else {
                // Open this row
                row.child(format(row.data(),data_3)).show();
                tr.addClass('shown');
            }
        });
    } catch(e){
        console.log(e)
    }
}

main()