const form = document.getElementById('formulario');

form.addEventListener('submit',async(e)=>{
    e.preventDefault();

    const Data = new FormData();
    const archivo = document.getElementById('archivo').files[0];

    Data.append('archivo', archivo)

    const response = await fetch('/uploadAllData',{
        method: 'POST',
        body: Data
    })

    const text = await response.text();
    document.getElementById('respuesta').innerText = text;
})


