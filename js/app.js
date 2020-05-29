console.log("This is my Magic notes Project")
showNotes();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById("addTxt");
    let getNotes = localStorage.getItem("notes");
    if (getNotes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(getNotes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    showNotes();
});

function showNotes() {
    let getNotes = localStorage.getItem("notes");
    if (getNotes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(getNotes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
                <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Note ${index + 1}</h5>
                        <p class="card-text"> ${element}</p>
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
    });
    let notesElment = document.getElementById("notes");
    if (notesObj.length == 0) {
        notesElment.innerText = "Add your First Note";
    } else {
        notesElment.innerHTML = html;
    }
}

function deleteNote(index) {
    let getAllNotes = localStorage.getItem("notes");
    if (getAllNotes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(getAllNotes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');

    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
});