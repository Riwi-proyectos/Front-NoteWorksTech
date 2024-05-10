//Carpetas
function GetCategory() {
  fetch("http://localhost:5118/api/Categories")
  .then((r) => r.json())
  .then((data) => {
    let cont = document.getElementById("ContainerCarpeta");
    cont.innerHTML= "";
    for (let Carpetas = 0; Carpetas < data.length; Carpetas++) {
      if(data[Carpetas].status == "Activo"){
        cont.innerHTML += `
        <div class="carpetas">
          <a href="#" onclick="saveCategory(${data[Carpetas].id})" class="carpeta  text-light">${data[Carpetas].name}</a>
          <button class="btn btn-link" onclick="DeleteCategory(${data[Carpetas].id})">
            <ion-icon class="icon-folder" name="trash-outline"></ion-icon>
          </button>
        </div>`
      }
    }
    
  })
};

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
      let cont = document.getElementById("ContainerNotas")
      cont.innerHTML= "";
      for (let Notas = 0; Notas < data.length; Notas++) {
        console.log("elnumerito",data[Notas].categorieId)
        if(data[Notas].status == "Activo" && data[Notas].categorieId == localStorage.getItem("selectCategory")){
          cont.innerHTML += `
          <div id="Notas" class="col-3">
              <div class="card mb-3 w-100 p-2">
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
                    <button type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#EditNoteworkModal" onclick="loadModalNotas(${data[Notas].id})">
                      <ion-icon style="font-size: 20px; color: black !important;" name="create-outline"></ion-icon>
                    </button>
                                
                  </div>
              </div>
          </div>`
        }
      }
    }
  )
  //onclick="loadModalNotas(${data[Notas].id})
};

async function CreateNewNote(){
  var url = "http://localhost:5118/api/NoteWorks";
  var data = {Title: document.getElementById("Title").value, Content: document.getElementById("Content").value,CategorieId : parseInt(localStorage.getItem("selectCategory"))};
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
    for (let Notas = 0; Notas < data.length; Notas++) 
    {
      document.getElementById("ContainerNotas").innerHTML += ``;
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

function EditNotework() {
  var url = "http://localhost:5118/api/NoteWorks/" + document.getElementById("elpropioid").value;
  
  var newData = {
    Title: document.getElementById("TitleEdit").value, 
    Content: document.getElementById("ContentEdit").value,
    CategorieId : parseInt(localStorage.getItem("selectCategory")),
    
  };console.log(newData);
  fetch(url, {
    method: "PUT",
    body: JSON.stringify(newData),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json"
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al editar la nota de trabajo');
    }
    return response.json();
  })
  .then(data => {
    if (data && data.title && data.content) {
         console.log('Nota de trabajo editada correctamente:', data);

      GetCategory();
      GetNoteWorks();
    } else {
      throw new Error('Error al procesar los datos de la nota de trabajo editada');
    }
  })
  .catch(err => console.error('Error:', err));
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
    let cont = document.getElementById("NotasOcultas");
    cont.innerHTML= "";
    for (let Notas = 0; Notas < data.length; Notas++) {
      if(data[Notas].status == "Oculto"){
        cont.innerHTML += `
        <div id="Notas" class="col-3">
            <div class="card mb-3 w-100 p-2">
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

function loadPageHidden(){
  location.href = "./Ocultas.html";
};

if(document.querySelector("title").text == "Notas"){
  GetCategory();
  GetNoteWorks();
}else{
  HiddenNotework()
}

async function saveCategory(value){

  await fetch("http://localhost:5118/api/Categories/"+value)
  .then((r) => r.json())
  .then((data) => {
    console.log(data);
    
  document.getElementById("textoDeArriba").innerText = data.name;
  })
  localStorage.clear();
  localStorage.setItem("selectCategory",value);
  GetCategory();
  GetNoteWorks();
}

async function loadModalNotas(id){
  await fetch("http://localhost:5118/api/NoteWorks/"+id)
  .then((r) => r.json())
  .then((data) => {
    console.log(data);
    
  document.getElementById("elpropioid").value = data.id;
  document.getElementById("TitleEdit").value = data.title;
  document.getElementById("ContentEdit").value = data.content;
  })
}
