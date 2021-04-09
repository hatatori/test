// https://jsonplaceholder.typicode.com/users

var categorias = []

async function mostrar(url){
    dados =  await fetch(url)
    json = await dados.json()
    return json
}


const x = mostrar("https://jsonplaceholder.typicode.com/users")


x.then(e=>{

    //mostra usuarios na tela
    for(obj of e)
        usuarios.innerHTML += `
        <div onclick="renderizarModalUsuario('${obj.name}')" class='card' el="${obj.name}" id="n${obj.id}">
        ${obj.name}
        </div>`

    //preenche lista de categorias
    for(obj of e){
        obj.company.bs.split(" ").map(e=>{
            if(!categorias.includes(e)) categorias.push(e);
        })
    }   
    
    // mostra categorias na tela
    for(obj of categorias)
        company.innerHTML += `<label class="card"><input type='checkbox'>${obj}</label>`    
})


// comportamento do modal
modal.onclick = (e) => { 

    if(e.target.className == "modal")
        checkmodal.checked=false 
   
}

function renderizarModalUsuario(nome_do_usuario){
    // data = json.find(e=>e.name=="Ervin Howell")
    checkmodal.checked = true
    data = json.find(e=>e.name == nome_do_usuario)
    
    modal_in.innerHTML = `
        <div>
        <img src="imgs/pessoa.svg"><br>
        name: ${data.name}<br>
        username: ${data.username}<br>
        email: ${data.email}<br>
        phone: ${data.phone}<br>
        website: <a target="_blank" href='http://${data.website}'>${data.website}</a><br>
        </div>
        <div>
        <img src="imgs/store.svg"><br>
        name: ${data.company.name}<br>
        catchPhrase: ${data.company.catchPhrase}<br>
        bs: ${data.company.bs}<br>
        </div>
        <iframe src="map.html?${data.address.geo.lat},${data.address.geo.lng}"></iframe> 
    `
}


company.onclick=function(){
    ar = []

    for(i of company.querySelectorAll("label > input:checked")){
        ar.push(i.parentElement.innerText)
    }

    ar = ar.join("|")

    obj = json.filter(e=> e.company.bs.match(ar))

    usuarios.innerHTML = ""
    for(i of obj){
        usuarios.innerHTML += `
        <div onclick="renderizarModalUsuario('${i.name}')" class='card' el="${i.name}" id="n${i.id}">
        ${i.name}
        </div>
        `
    }

}