

async function getLogsSave() {
    try {
        const response = await fetch('/logssave/getall');
        if (response.ok) {
            const data = await response.json();
            const listaFuente = document.getElementById('idListFuente');
            const select = document.createElement('select');
            select.id = 'listFuente';
            data.forEach((e) => {
                let option = document.createElement('option');
                option.value = e.titulo;
                option.innerHTML = e.titulo;
                select.appendChild(option);
            });
            listaFuente.appendChild(select);
            clearInterval(intervalId);
        }
    } catch (e) {
        console.log(e);
    }
}

let BoolLogsSave = true;

const intervalId = setInterval(() => {
  if (BoolLogsSave) {
    getLogsSave();
    BoolLogsSave = false; // Actualiza el indicador después de la primera ejecución
  }
}, 5000);

function MakeRegla(){
    const nombreRegla = document.getElementById("idNombreRegla").value;
    const descripcion = document.getElementById("textArea").value;
    const fuente = document.getElementById('listFuente').value;
    const severidad = document.getElementById("idSev").value;
    const puntuacionRiesgo = document.querySelector(".prog input[type='range']").value;
    const programacionNumero = document.querySelector(".Programacion input[type='number']").value;
    const programacionPeriodo = document.getElementById("Periodo").value;
    let dicc  = {}
    dicc.nombreRegla = nombreRegla
    dicc.fuente      = fuente
    dicc.riesgo      = puntuacionRiesgo
    dicc.descripcion = descripcion
    dicc.severidad   = severidad
    dicc.ultejecucion= "-"
    dicc.ultrespuesta= "-"
    dicc.ultactualiza= "-"
    dicc.version     = "-"
    dicc.prognumero  = programacionNumero
    dicc.progperiodo = programacionPeriodo
    SaveRule(dicc)
}


async function ShowRules(){
    const logs = await fetch('/reglas/getall');
    if (logs.ok ) {
        const data = await logs.json();
        console.log(data)
        const showRule = document.getElementById('showrules')
        let id = 1;
        data.forEach((e) => {
            let tr   = document.createElement('tr');
            let td_0 = document.createElement('td')
            let td   = document.createElement('td')
            let td_1 = document.createElement('td')
            let td_2 = document.createElement('td')
            let td_3 = document.createElement('td')
            let td_4 = document.createElement('td')
            let td_5 = document.createElement('td')
            let td_6 = document.createElement('td')
            let td_7 = document.createElement('td')
            let td_8 = document.createElement('td')
            td_0.innerHTML = id
            td.innerHTML   = e.nombreRegla
            td_1.innerHTML = e.riesgo 
            td_2.innerHTML = e.severidad
            td_3.innerHTML = e.ultejecucion
            td_4.innerHTML = e.ultrespuesta
            td_5.innerHTML = e.ultactualiza
            td_6.innerHTML = '1'
            td_7.innerHTML = `
                              <label class="switch">
                              <input type="checkbox" checked>
                              <span class="slider round"></span>
                              </label>
                              `
            td_8.innerHTML =  `
                              <button class="btn bg-transparent border-0">
                                <i class="fa-solid fa-pen-to-square" style="color: #0861fd;"></i>
                              </button>
                              <button class="btn bg-transparent border-0">
                                <i class="fa-solid fa-trash" style="color: #fd1212;"></i>
                              </button>
                              `
            tr.appendChild(td_0)
            tr.appendChild(td)
            tr.appendChild(td_1)
            tr.appendChild(td_2)
            tr.appendChild(td_3)
            tr.appendChild(td_4)
            tr.appendChild(td_5)
            tr.appendChild(td_6)
            tr.appendChild(td_7)
            tr.appendChild(td_8)
            showRule.appendChild(tr) 
            id++;
        })
        clearInterval(intervalId2);
    }}

    let isFirstExecution = true; // Variable para indicar si es la primera ejecución

    const intervalId2 = setInterval(() => {
      if (isFirstExecution) {
        ShowRules();
        isFirstExecution = false; // Actualiza el indicador después de la primera ejecución
      }
    }, 5000);

function showRangeValue(value) {
  document.getElementById("rangeValue").textContent = value;
}

async function SaveRule(data){
    try {
      await fetch("/reglas/createone",  {
        method : 'POST',
        headers: {"Content-Type" : "application/json"},
        body   : JSON.stringify(data)
      })
    }
    catch (e) {
      console.log(e)
    }
  }
  function Popup(){
    var condition = false;
  
    if (!condition) {
      showLoadingPopup();
      setTimeout(function() {
        hideLoadingPopup();
        }, 3000);
    }
  }
  function showLoadingPopup() {
    document.getElementById("loadingOverlay").style.display = "block";
  }

  function hideLoadingPopup() {
    document.getElementById("loadingOverlay").style.display = "none";
  }


document.addEventListener('DOMContentLoaded', function(){
        getLogsSave()    
        ShowRules()
        let createRules = document.getElementById('create-rules-id');
        let modal = document.getElementById('modal')
        let GuardarModal = document.getElementById('btn-guardar-modal')
        let CerrarModal = document.getElementById('btn-cerrar-modal')
        createRules.addEventListener('click', ()=> {
        modal.showModal();
        })
        CerrarModal.addEventListener('click', ()=> {
        modal.close()
        })
        GuardarModal.addEventListener('click', ()=> {
            MakeRegla()
            modal.close()
        })
  })
  
