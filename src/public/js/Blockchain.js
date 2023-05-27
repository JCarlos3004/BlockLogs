const blocks   = document.querySelector("#btn-add");
const blockDes = "(Genesis block)";
let logs; 
let logs_1;
let blockch;
let blockchain;
let numberOfBlocks=1;
let nBlock;


//Load Page
document.addEventListener('DOMContentLoaded', async function() {
  nBlock         = document.querySelectorAll("#idBlock"); 
  blockch        = document.querySelectorAll("blockchain");
  blockchain     = blockch[blockch.length-1]
  await ShowBlocks();
  document.querySelector("#nrBlocks").innerHTML = numberOfBlocks-1;
});

//Load Click
blocks.addEventListener("click", async () => {
    nBlock         = document.querySelectorAll("#idBlock"); 
    blockch        = document.querySelectorAll("blockchain");
    blockchain     = blockch[blockch.length-1]
    numberOfBlocks = nBlock.length;

    await SendLogs();
});


function createBlock(numBlock, blockchain, hash, hashprevious, timestamp ){
  let newChain = `
              <chain-link>
                <i class="bi bi-link-45deg bi-3x"></i>
              </chain-link>   
            `

  let newBlock = `
        <block class="card block active col-md-10">
          <div class="card-header bg-dark">
              <span class="display-4">Block ${numBlock}</span>
              <p class="text-muted">Bloque minado N~${numBlock}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <h5>Hash</h5>
              <span class="hash">
                ${hash}
              </span>
              <h5>Hash of previous block</h5>
              <span class="text-muted">${hashprevious}</span>
            </li>
            <li class="list-group-item">
              <h6>Timestamp</h6>
              <span class="text-muted">${timestamp}</span>
            </li>
          </ul>  
        </block>
    `;
    let block  = document.createElement("blockchain");
    let chain = document.createElement("div");
    block.className = "col-md-8 d-flex aling-item-center";
    block.id        = "idBlock"
    block.innerHTML = newBlock;
    chain.className = "col-md-12 text-center d-flex"
    chain.innerHTML = newChain;
    blockchain.parentNode.insertBefore(block, blockchain.nextSibling);
    blockchain.parentNode.insertBefore(chain, blockchain.nextSibling);
    
}

async function SendLogs(){
  logs   = await fetch('/logs/getall');
  logs_1 = await logs.json();
  let Array_logs= [];
  logs_1.forEach((e) => {
      if (e.bloque === "-" ) {
        Array_logs.push(e)
      }
    }
  )
  try {
    if (Array_logs.length !== 0){
        const data = await fetch('/block/create', {
                                      method:  'POST',
                                      headers: {'Content-Type' : 'application/json'},
                                      body: JSON.stringify({Array_logs, numberOfBlocks})
                                    })
        const datajson = await data.json()
        document.querySelector("#nrBlocks").innerHTML = numberOfBlocks;
        await UpdateTransac(Array_logs, numberOfBlocks+1);
        createBlock(numberOfBlocks, blockchain, datajson.hash, datajson.previousHash, datajson.timestamp)
      }else{
        Popup()
      }
    } catch(e) {
      console.log(e)
  }
}

async function UpdateTransac(data, numberOfBlocks){
  try {
    await fetch("/logs/update", {
      method: 'PUT',
      headers: { "Content-Type" : 'application/json'},
      body: JSON.stringify({data, numberOfBlocks})
    })
  } 
  catch (e) {
    console.log(e)
  }
}

async function ShowBlocks(){
  const infblocks_2  = await fetch('/block/getall');
  const infblocks_3  = await infblocks_2.json();
  infblocks_3.forEach((e) => {
    createBlock(numberOfBlocks, blockchain, e.hash, e.previousHash, e.timestamp)
    numberOfBlocks++
  });
}


function Popup(){
  var condition = false;

  if (!condition) {
    showLoadingPopup();

    // Simular una carga durante 3 segundos
    setTimeout(function() {
      hideLoadingPopup();
      showNoLogsMessage();
      }, 3000);
  }

  function showLoadingPopup() {
    document.getElementById("loadingOverlay").style.display = "block";
  }

  function hideLoadingPopup() {
    document.getElementById("loadingOverlay").style.display = "none";
  }

function showNoLogsMessage() {
  document.getElementById("noLogsMessage").style.display = "block";
  // Agregar evento de clic al botón "OK"
  document.getElementById("okButton").addEventListener("click", function() {
    hideNoLogsMessage();
  });
}

function hideNoLogsMessage() {
  document.getElementById("noLogsMessage").style.display = "none";
}
}