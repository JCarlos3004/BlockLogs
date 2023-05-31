
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
        if (e.bloque == "- "){
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
        index.innerHTML = e.index;
        hash.innerHTML  = e.hash;
        bymine.innerHTML= "System";
        trans.innerHTML = "";
        timestamp.innerHTML= e.timestamp;
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

async function main(){
    try {
        const data    = await fetch('/logs/getall');
        const data_1  = await data.json();
        const data_2  = await fetch('/block/getall');
        const data_3  = await data_2.json();
        TransAsig(data_1)
        TransPend(data_1)
        BloqMinados(data_3)
        ListBloq(data_3,data_1)
        TiemPromedio()
        $(document).ready(function() {
            $('#my-table').DataTable();
        });
    } catch(e){
        console.log(e)
    }
}

main()