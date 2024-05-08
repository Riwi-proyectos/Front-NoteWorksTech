//Carpetas
function GetCategory() {
  fetch("http://localhost:5118/api/Categories")
  .then((r) => r.json())
  .then((data) => {
    console.log("la propia",data);
    let cont = document.getElementById("ContainerCarpeta");
    cont.innerHTML= "";
    for (let Carpetas = 0; Carpetas < data.length; Carpetas++) {
      if(data[Carpetas].status == "Activo"){
        cont.innerHTML += `
        <div class="carpetas">
          <a href="./Carpetas.html" class="carpeta  text-light">${data[Carpetas].name}</a>
          <button class="btn btn-link" onclick="DeleteCategory(${data[Carpetas].id})">
            <ion-icon class="icon-folder" name="trash-outline"></ion-icon>
          </button>
        </div>`
      }
    }
    
  })
};

GetCategory();
GetNoteWorks();

async function CreateNewCategory() {
  var url = "http://localhost:5118/api/Categories/";
  var data = { Name: document.getElementById("Name").value };
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json"
    }
  })
  .then((res) => res.json())
  .then((response) => {
    console.log(data);
    for (let Carpetas = 0; Carpetas < data.length; Carpetas++) 
    {
      document.getElementById("ContainerCarpeta").innerHTML += ``;
    }
      location.reload();
    }
  )
};

function DeleteCategory(id) {
  var url = ("http://localhost:5118/api/Categories/"+id)
  var data = { Name: document.getElementById("Name").value };
  fetch(url, {
    method: "DELETE",
    body: JSON.stringify(data),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(data => {GetCategory();GetNoteWorks();})
  .catch(err => console.log(err))
}

//Notas

function GetNoteWorks() {
  fetch("http://localhost:5118/api/NoteWorks")
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
      let cont = document.getElementById("ContainerNotas")
      cont.innerHTML= "";
      for (let Notas = 0; Notas < data.length; Notas++) {
        if(data[Notas].status == "Activo"){
          cont.innerHTML += `
          <div id="Notas" class="col-3 col-md-3">
              <div class="card mb-4">
                  <div class="tools">
                      <div class="w-100 card__menu">
                        <button class="btn btn-link" onclick="SendHidden(${data[Notas].id})">
                          <ion-icon style="font-size: 20px; color: black !important;" name="eye-off-outline"></ion-icon>
                        </button>
                      </div>
                  </div>
                  <div class="card__content">
                      <h3 class="texto-nota">${data[Notas].title}</h3>
                  </div>
                  <div class="card__content">
                      <p class="texto-nota">${data[Notas].content}</p>
                  </div>
                  <div class="tools">
                    <button class="btn btn-link" onclick="DeleteNotework(${data[Notas].id})">
                      <ion-icon style="font-size: 20px; color: black !important;" name="trash-outline"></ion-icon>
                    </button>
                  </div>
              </div>
          </div>`
        }
      }
    }
  )
};

async function CreateNewNote(){
  var url = "http://localhost:5118/api/NoteWorks";
  var data = {Title: document.getElementById("Title").value, Content: document.getElementById("Content").value};
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json"
    }
  })
  .then((res) => res.json())
  .then((response) => {
    console.log(data);
    for (let Notas = 0; Notas < data.length; Notas++) 
    {
      document.getElementById("ContainerNotaS").innerHTML += ``;
    }
      location.reload();
    }
  )
};

function DeleteNotework(id) {
  var url = ("http://localhost:5118/api/NoteWorks/"+id)
  var data = { Title: document.getElementById("Notas").value };
  fetch(url, {
    method: "DELETE",
    body: JSON.stringify(data),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(data => {GetCategory();GetNoteWorks();})
  .catch(err => console.log(err))
}

//Ocultos

function SendHidden(id) {
  var url = ("http://localhost:5118/api/NoteWorks/changeStatus/"+id)
  let data = "hola"
  fetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(data => {GetCategory();GetNoteWorks();})
  .catch(err => console.log(err))
}

function HiddenNotework() {
  fetch("http://localhost:5118/api/NoteWorks/")
  .then((r) => r.json())
  .then((data) => {
    console.log("ll");
    let cont = document.getElementById("NotasOcultas");
    cont.innerHTML= "";
    for (let NotasOcultas = 0; NotasOcultas < data.length; NotasOcultas++) {
      if(data[NotasOcultas].status == "Oculto"){
        cont.innerHTML += `
        <div id="Notas" class="col=3">
              <div class="card mb-4">
                  <div class="tools">
                      <div class="w-100 card__menu">
                        <button class="btn btn-link" onclick="SendHidden(${data[Notas].id})">
                          <ion-icon style="font-size: 20px; color: black !important;" name="eye-off-outline"></ion-icon>
                        </button>
                      </div>
                  </div>
                  <div class="card__content">
                      <h3 class="texto-nota">${data[Notas].title}</h3>
                  </div>
                  <div class="card__content">
                      <p class="texto-nota">${data[Notas].content}</p>
                  </div>
                  <div class="tools">
                    <button class="btn btn-link" onclick="DeleteNotework(${data[Notas].id})">
                      <ion-icon style="font-size: 20px; color: black !important;" name="trash-outline"></ion-icon>
                    </button>
                  </div>
              </div>
          </div>`
      }
    }
  })
}