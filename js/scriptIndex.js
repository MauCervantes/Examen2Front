const tbody = document.getElementById('tbody');
const selectAuthor = document.getElementById('selectAuthor');

fetchGetBooks();
getAuthorsSelect();

//!Acción del select cuando se busca por un author
selectAuthor.addEventListener('change', () => {
    if(selectAuthor.value == "*All"){
        while (tbody.firstChild) {  tbody.removeChild(tbody.firstChild);  }
        fetchGetBooks();
    }else{
        while (tbody.firstChild) {  tbody.removeChild(tbody.firstChild);  }
        getBooksByAuthor(selectAuthor.value);
    }
});

//?Creación de funciones

function fetchGetBooks(){
    //!Fetch get (get books with authors)
    fetch('http://localhost:5136/api/library/booksAuthors')
            .then(books => books.json())
            .then(books => insertInTable(books));
}

//!Traer los authors para poder ingresarlos al select
function getAuthorsSelect(){
    fetch('http://localhost:5136/api/library/authors')
            .then(authors => authors.json())
            .then(authors => insertAuthors(authors));
}

//!Función fetch que nos trae los libros a partir de un author especifico
function getBooksByAuthor(name){
    fetch('http://localhost:5136/api/library/booksAuthor?nameAuthor=' + name)
            .then(booksByAuthor => booksByAuthor.json())
            .then(booksByAuthor => insertInTable(booksByAuthor));
}

//! Inserta los datos correspondientes a partir de un const = () => {}; Para los libros
const insertInTable = (books) => {
    
    for(i = 0; i< books.length; i++){
        htmlCode = '<tr>'+
                        "<td>" + books[i].titleBook + "</td>" +
                        "<td>" + books[i].author + "</td>" +
                        "<td>" + books[i].chaptersBook + "</td>" +
                        "<td>" + books[i].pagesBook + "</td>" +
                        "<td> $ " + books[i].priceBook + "</td>" +
                    "</tr>";
        tbody.insertAdjacentHTML("beforeend", htmlCode);
        htmlCode = "";
    }
};

//!Constante para ingresar los authors al select
const insertAuthors = (authors) => {
    for(i = 0; i<authors.length; i++){
        htmlSelect = "<option>" + authors[i].name + "</option>";
        selectAuthor.insertAdjacentHTML("beforeend", htmlSelect);
    }
}