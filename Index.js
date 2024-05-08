function GetNoteWorks() {
  fetch("http://localhost:5118/api/NoteWorks")
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
      let cont = document.getElementById("ContainerNotas")
      cont.innerHTML= "";
      for (let Notas = 0; Notas < data.length; Notas++) {
        cont.innerHTML += `
        <div class="col-sm-3">
            <div class="card w-100 mb-4">
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
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                      <img style="width: 40px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABrUlEQVR4nO3ZPU7DMBjG8T+fC0XiAjCgFgqsHIKVAbEBd+AA7QQj4iRsTAikQs4AC1P56MSAWKlRpTdSFLnBTeKPSH4kS1USN/7Vb105hZiYMlkEesAz8A08AQc0LEvADaBy7bdpmDMNIm0JDchc5vXVFMgPgWcFuAOOM8cuNZAXAk4LeJSBvgLLBTNzTgMQQ6CtuSbFTBaABQJHvGkQ2Zk5ldVMm6RgdbDV+oaItpTZocknEgqio0EM5fx9bjUrhLhenR7kvp/ATu58R3BKfs1XTd7UNcQKwjXEGsIlxCrCFcQ6wgUkixjZQtiG5BG7hoh+SJAqCBUKpCyi0njqhlRBBAP5D7Fl8MVWviEmiHeD1Un5hNSF8AqpE+ENUjfCC8QGwjlksskZSL8PoJs735XjSjZPLcvjKd1xU/qMgf0aEc4hR5l+SaZstkuWkzfIRW4fnsjMVEU4h9xqHiqMK5STN8hoyhOSqginkA25/ktK6Bo4AfaA+TID8AVZA9bL3MjSeLw8RTGJihDijFiJiqVFLC0rUbG0iKUVZmmpwNrMSf/HC6kNZmfEEET+AIuwuiH/1a/LAAAAAElFTkSuQmCC">
                    </button>
                </div>
            </div>
        </div>`
      }
    }
  )
};

function GetCategory() {
  fetch("http://localhost:5118/api/Categories")
  .then((r) => r.json())
  .then((data) => {
    console.log("la propia",data);
    let cont = document.getElementById("ContainerCarpeta");
    cont.innerHTML= "";
    for (let Carpetas = 0; Carpetas < data.length; Carpetas++) {
      if(data[Carpetas].status != "Inactivo"){
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





function DeleteCategory() {
  var url = ("http://localhost:5118/api/Categories"+ category.Id)
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
};





function EditNote() {
  var title = document.getElementById("Title").value;
  var content = document.getElementById("Content").value

  var NoteEdit = {
    title: title,
    content: content,
  };

  fetch(`http://localhost:5118/api/NoteWorks/${id}`, {
    method: "PUT",
    body: JSON.stringify(NoteEdit),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json"
    }
  })

  .then(response => {
    if (response.ok) {
      location.reload();
    } else {
      throw new Error("Error al actualizar la nota. La nota no se actualizó.");
    }
    
  });

}


