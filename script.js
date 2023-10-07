let books = [];

function show(current, hide){
    let section_show = document.querySelector(current);
    let section_hide = document.querySelector(hide);
    section_show.style.display = "block";
    section_hide.style.display = "none";
}

function add_book(){
    console.log(books.length);
    let name = "book" + books.length;
    let title = document.getElementById("title");
    let front = document.getElementById("front");
    let author = document.getElementById("author");
    let genre = document.getElementById("genre");
    let year = document.getElementById("year");
    
    let inputs = document.querySelectorAll(".info_book input");
    let validation = true;
    inputs.forEach((input) =>{
        if (input.value.trim() == ""){
            validation = false
        }
    })
    if (validation){
        window[name]={
            title:title.value,
            front:front.value,
            author:author.value,
            genre:genre.value,
            year:year.value,
            avaliable:true,
            lend:false
        }
        books.push(window[name])
        console.log(books);
        localStorage.setItem("books_campus", JSON.stringify(books))
        load_books(books)
        show(`#books`,`#add`)
        inputs.forEach((input) =>{
            input.value = "";
        })
        change_back("")
    }else{
        alert("No dejes campos vacios")
    }
}

function load_books(library){
    books = library
    let container = document.querySelector(".contain_books");
    container.textContent = "";
    for(let x = 0;x < books.length;x++){
        let div_book = document.createElement("div");
        div_book.classList.add("book");
        let div_img = document.createElement("div");
        div_img.classList.add("contain_img")
        let img = document.createElement("img")
        img.setAttribute("src", books[x].front);
        div_img.appendChild(img)

        let div_text = document.createElement("div")
        let p = document.createElement("p");
        let avaliable = "";
        let lend = ""

        let b_lend = document.createElement("button");
        b_lend.textContent = "Prestar";
        b_lend.setAttribute("data-id", x);
        b_lend.setAttribute("onclick", "to_lend(this)");
        b_lend.classList.add("button")

        let b_delete = document.createElement("button");
        b_delete.textContent = "Eliminar";
        b_delete.setAttribute("class","b_delete button");

        //cambios eliminar
        b_delete.setAttribute("data-id", x); //ubicacion lista
        b_delete.setAttribute("onclick", "delete_book(this)")

        if(!books[x].lend){
            avaliable = "Disponible";
            lend = "-"
        }else{
            avaliable = "Prestado";
            lend = books[x].avaliable;
            b_lend.textContent = "Devolver";
            b_lend.setAttribute("onclick", "to_return(this)");
        }
        
        p.innerHTML = "<b>Titulo:</b> "+ books[x].title + "<br>" +
             "<b>Autor:</b> "+ books[x].author + "<br>" +
             "<b>Genero:</b> "+ books[x].genre + "<br>" +
             "<b>Año de publicacion:</b> "+ books[x].year + "<br>" +
             "<b>Estado:</b> "+ avaliable + "<br>" +
             "<b>Prestamo:</b> "+ lend + "<br>";

        div_text.appendChild(p);
        div_text.appendChild(b_lend);
        div_text.appendChild(b_delete);
        div_book.appendChild(div_img);
        div_book.appendChild(div_text)
        container.appendChild(div_book);
    }
}

function change_back(link){
    let img_contain = document.querySelector(".img_book");
    img_contain.textContent = "";
    let img = document.createElement("img")
    img.setAttribute("src", link);
    img_contain.appendChild(img)
}

function to_lend(button){
    let container = button.parentElement
    let id = button.getAttribute("data-id");
    let p = container.querySelector("p");
    let buttons = document.querySelectorAll(".button");
    let hide_b = container.querySelectorAll(".button");
    hide_b.forEach((button)=>{
        button.style.display = "none"
    })
    buttons.forEach((button)=>{
        button.style.pointerEvents = "none"
    })

    p.style.display = "none";
    
    let label = document.createElement("label");
    label.textContent = "Digita el nombre del prestatario:";
    let input = document.createElement("input");
    input.setAttribute("id", "change");
    input.setAttribute("placeholder", "Nombre")
    let save = document.createElement("button");
    save.textContent = "Guardar";
    let back = document.createElement("button");
    back.textContent = "Cancelar";
    container.appendChild(label);
    container.appendChild(input);
    container.appendChild(save);
    container.appendChild(back);
    save.addEventListener("click", function(){
        if (input.value.trim() == ""){
            input.setAttribute("placeholder", "Completa este campo")
        }else{
            books[id].avaliable = input.value;
            books[id].lend = true;
            localStorage.setItem("books_campus", JSON.stringify(books))
            load_books(books)
        }
    })
    back.addEventListener("click", function(){
        load_books(books)
    })
}

function to_return(button){
    let id = button.getAttribute("data-id")
    let bookToRemove = books[id];

    if (confirm(`¿Estás seguro de devolver el libro "${bookToRemove.title}"?`)) {
        books[id].lend = false;        
        localStorage.setItem("books_campus", JSON.stringify(books))
        load_books(books);
    }
}

function sorted(id){
    if (id == 1){
        books.sort(sort_title);
        load_books(books)
    }
    if (id == 2){
        books.sort(sort_year);
        load_books(books)
    }
    if (id == 3){
        books.sort(sort_author);
        load_books(books)
    }
    if (id == 4){
        books.sort(sort_genre);
        load_books(books)
    }
    if (id == 5){
        books.sort(function(a,b){
            return (a.lend === b.lend)? 0 : a.lend? 1 : -1;
        });
        load_books(books)
    }
}

function sort_title(a,b){
    if (a.title > b.title){
        return 1;
    }else if (a.title < b.title){
        return -1;
    }else{
        return 0;
    }
}

function sort_year(a,b){
    if (a.year > b.year){
        return 1;
    }else if (a.year < b.year){
        return -1;
    }else{
        return 0;
    }
}

function sort_author(a,b){
    if (a.author > b.author){
        return 1;
    }else if (a.author < b.author){
        return -1;
    }else{
        return 0;
    }
}

function sort_genre(a,b){
    if (a.genre > b.genre){
        return 1;
    }else if (a.genre < b.genre){
        return -1;
    }else{
        return 0;
    }
}

function sort_avaliable(a,b){
    return (a === b)? 0 : a? -1 : 1;
}

function delete_book(x){
    //busca el id del libro
    let id = x.getAttribute("data-id")
    console.log(id);
    let bookToRemove = books[id];

    if (confirm(`¿Estás seguro de que deseas eliminar el libro "${bookToRemove.title}"?`)) {
        // Elimina el libro del arreglo "books" usando splice
        books.splice(id, 1);
        
        localStorage.setItem("books_campus", JSON.stringify(books)) //stringify hace que quede en formato orginal
        load_books(books);
    }
}


window.addEventListener("load", function(){
    books = JSON.parse(localStorage.getItem("books_campus"));
    load_books(books)
    sorted(1)
})