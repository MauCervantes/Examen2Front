const selectAuthor = document.getElementById('author');
const button = document.getElementById('btn');
const title = document.getElementById('title');
const author = document.getElementById('author');
const chapters = document.getElementById('chapter');
const pages = document.getElementById('pages');
const price = document.getElementById('price');

var a = {}

getAuthorsSelect();

//!Función al oprimir el botton
button.addEventListener('click',() => {
    if(title.value == ""){
        alert("Ingrese un titulo valido");
    }else{
        id = 0;
        for(i = 0; i<a.length; i++){
            if(a[i].name == author.value){
                id = a[i].id;
            }
        }
        const newBook = {
            "idAuthor": id,
            "title": title.value,
            "chapters": chapters.value,
            "pages": pages.value,
            "price": price.value
        }

        fetch('http://localhost:5136/api/library/book', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        })
        .then(a => a.json())
        .then(a => {
            if(a == true){
                alert("Se ingreso correctamente el Libro " + title.value);
                window.location.href="../index.html";
            }else{
                alert("No se completó la Operación Solicitada")
            }
        });
    }
});

//!Traer los authors para poder ingresarlos al select
function getAuthorsSelect(){
    fetch('http://localhost:5136/api/library/authors')
            .then(authors => authors.json())
            .then(authors => insertAuthors(authors));
}

//!Constante para ingresar los authors al select
const insertAuthors = (authors) => {
    a = authors;
    for(i = 0; i<authors.length; i++){
        htmlSelect = "<option>" + authors[i].name + "</option>";
        selectAuthor.insertAdjacentHTML("beforeend", htmlSelect);
    }
}