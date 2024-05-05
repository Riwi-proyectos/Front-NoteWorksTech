function GetNoteWorks(){
    fetch("http://localhost:5118/api/NoteWorks")
  .then((r)=> r.json())
  .then((data)=>{
    console.log(data)
    for(let Notas = 0; Notas < data.length;
        Notas ++){
        document.getElementById("ContainerNotas").innerHTML +=`
        <div class="col-sm-3">
            <div class="card">
                <div class="tools">
                    <div class="card__menu"><svg xmlns="http://www.w3.org/2000/svg" width="4" viewBox="0 0 4 20" height="20" fill="none"><g fill="#000"><path d="m2 4c1.10457 0 2-.89543 2-2s-.89543-2-2-2-2 .89543-2 2 .89543 2 2 2z"></path><path d="m2 12c1.10457 0 2-.8954 2-2 0-1.10457-.89543-2-2-2s-2 .89543-2 2c0 1.1046.89543 2 2 2z"></path><path d="m2 20c1.10457 0 2-.8954 2-2s-.89543-2-2-2-2 .8954-2 2 .89543 2 2 2z"></path></g></svg></div>
                </div>
                <div class="card__content">
                    <h3 class="texto-nota">${data[Notas].title}</h3>
                </div>
                <div class="card__content">
                    <p class="texto-nota">${data[Notas].content}</p>
                </div>
                <div class="tools">
                    <svg style="width: 20px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#000000" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                </div>
            </div>
        </div>`
    }
  })
}

function GetFolders(){
    fetch("http://localhost:5118/api/Categories")
    .then((r)=> r.json())
    .then((data)=>{
        console.log(data)
        for(let Carpetas = 0; Carpetas < data.length;
        Carpetas ++){
        document.getElementById("ContainerCarpeta").innerHTML += `
        <div class="carpetas">
            <a href="./Carpetas.html" class="carpeta  text-light">${data[Carpetas].name}</a>
            <svg style="width: 18px;" class="icon4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
        </div>`
        }
    })
}


NuevaCarpeta

GetFolders()
GetNoteWorks()


function GetNewFolders(){
var url = "http://localhost:5118/api/Categories/";
var data = { Name: document.getElementById("Name").value};

fetch(url, {
  method: "POST", // or 'PUT'
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers: {
    accept:"aplicattion/json",
    "Content-Type": "application/json",
  },
})
  .then((res) => res.json())
  .then((response)=>{
    console.log(data)
        for(let Carpetas = 0; Carpetas < data.length;
        Carpetas ++){
        document.getElementById("ContainerCarpeta").innerHTML += ``
        }
  });
}

