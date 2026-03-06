const API = "http://localhost:3000";

const form = document.getElementById('formulario');

form.addEventListener('submit', async (e) => {

e.preventDefault();

const Data = new FormData();
const archivo = document.getElementById('archivo').files[0];

Data.append('archivo', archivo);

const response = await fetch('/uploadAllData',{
method:'POST',
body:Data
});

const text = await response.text();
document.getElementById('respuesta').innerText = text;

loadAutos();

});




async function loadAutos(){

const res = await fetch(`${API}/getAutos`);
const data = await res.json();

const tabla = document.getElementById("tablaAutos");

tabla.innerHTML="";

data.forEach(auto=>{

tabla.innerHTML += `

<tr>

<td>${auto.placa}</td>
<td>${auto.marca}</td>
<td>${auto.color}</td>
<td>${auto.estado_vehiculo}</td>
<td>${auto.kilometraje}</td>

<td>

<button onclick="deleteAuto('${auto.placa}')">Delete</button>
<button onclick="editAuto('${auto.placa}')">Edit</button>

</td>

</tr>

`;

});

}




document.getElementById("createForm").addEventListener("submit", async(e)=>{

e.preventDefault();

const auto = {

placa: document.getElementById("placa").value,
marca: document.getElementById("marca").value,
color: document.getElementById("color").value,
estado_vehiculo: document.getElementById("estado_vehiculo").value,
kilometraje: document.getElementById("kilometraje").value

};

const res = await fetch(`${API}/createAutos`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(auto)
});

const data = await res.json();
console.log(data);

loadAutos();

});



async function deleteAuto(placa){

const res=await fetch(`${API}/deleteAuto/${placa}`,{

method:"DELETE"

});

loadAutos();

}




async function editAuto(placa){

const marca = prompt("Nueva marca");
const color = prompt("Nuevo color");

await fetch(`${API}/updateAuto/${placa}`,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({marca,color})

});

loadAutos();

}


loadAutos();