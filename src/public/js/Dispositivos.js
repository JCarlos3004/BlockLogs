

function refreshDevices(){
    getDevices();
}


async function getDevices() {
    let cont=1
    const devices_0 = await fetch('/devices/getall');
    const devices   = await devices_0.json(); 
    let devicesTable = document.getElementById('devicesTable');
    devicesTable.innerHTML = '';
    devices.forEach(function(device) {
          let row          = document.createElement('tr');
          let id           = document.createElement('td');
          let hostnameCell = document.createElement('td');
          let ip           = document.createElement('td');
          let so           = document.createElement('td');
          let LastConn     = document.createElement('td');
          let statusCell   = document.createElement('td');
          let option       = document.createElement('td');

          id.innerHTML           = cont++
          hostnameCell.innerHTML = device.hostname;
          ip.innerHTML           = device.ipsource;
          so.innerHTML           = device.OpSystem;
          LastConn.innerHTML     = device.LastConn;
          statusCell.innerHTML   = `
                                    <i class="fa-solid fa-circle-check fa-lg" style="color: #05f02c;"></i>
                                   `
          option.innerHTML       = ` 
                                    <button class="btn bg-transparent border-0">
                                      <i class="fa-solid fa-pen-to-square" style="color: #0861fd;"></i>
                                    </button>
                                    <button class="btn bg-transparent border-0">
                                      <i class="fa-solid fa-trash" style="color: #fd1212;"></i>
                                    </button>
                                    `;
          row.appendChild(id);
          row.appendChild(hostnameCell);
          row.appendChild(ip);
          row.appendChild(so);
          row.appendChild(LastConn)
          row.appendChild(statusCell);
          row.appendChild(option)

          devicesTable.appendChild(row); 
    })
    $(document).ready(function() {
        $('#dataTables-example').DataTable();
    });
  };

function CheckConnection(){

}
getDevices();