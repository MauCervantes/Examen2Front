const tbody = document.getElementById('tBodyAuthor');
const btn = document.getElementById('btn');
const nameInput = document.getElementById('name');


fetchGetAuthors();

//Agregar función al button
btn.addEventListener('click', () => {
    //console.log("se hizo click al boton");
    //console.log(nameInput.value);

    if(nameInput.value == ""){
        alert("Ingrese un nombre correcto para Author");
    }else{
        const newAuthor = {
            "name": nameInput.value
        };
        fetch('http://localhost:5136/api/library/author', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAuthor)
        })
        .then(a => a.json())
        .then(a => {
            if(a == true){
                alert("Se ingreso correctamente el Author " + nameInput.value);
                window.location.href="../index.html";
            }else{
                alert("No se completó la Operación Solicitada")
            }
        });
    }
});

function fetchGetAuthors(){
    //!Fetch getall authors
    fetch('http://localhost:5136/api/library/authors')
            .then(authors => authors.json())
            .then(authors => insertInTable(authors));
}

const insertInTable = (authors) => {
    
    for(i = 0; i< authors.length; i++){
        htmlCode = '<tr>'+
                        "<td>" + authors[i].id + "</td>" +
                        "<td>" + authors[i].name + "</td>" +
                    "</tr>";
        tbody.insertAdjacentHTML("beforeend", htmlCode);
        htmlCode = "";
    }
};