document.addEventListener("DOMContentLoaded", () => {
    loadNotes();
});

function addNote() {
    const noteInput = document.getElementById("noteInput");
    const noteText = noteInput.value.trim();

    if (noteText) {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes.push({ text: noteText, completed: false });
        localStorage.setItem("notes", JSON.stringify(notes));
        noteInput.value = '';
        loadNotes();
    }
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const noteList = document.getElementById("noteList");
    const completedList = document.getElementById("completedList");

    noteList.innerHTML = '';
    completedList.innerHTML = '';

    notes.forEach((note, index) => {
        const li = document.createElement("li");
        li.textContent = note.text;

        const editButton = document.createElement("button");
        editButton.textContent = "تعديل";
        editButton.className = "action-button";
        editButton.onclick = () => editTask(index);

        const toggleButton = document.createElement("button");
        toggleButton.textContent = note.completed ? "إلغاء إنجاز" : "إنجاز";
        toggleButton.className = "action-button";
        toggleButton.onclick = () => toggleTask(index);
        
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "حذف";
        deleteButton.className = "action-button";
        deleteButton.onclick = () => deleteTask(index);

        li.appendChild(toggleButton);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        if (note.completed) {
            li.classList.add("completed");
            completedList.appendChild(li);
        } else {
            noteList.appendChild(li);
        }
    });
}

function toggleTask(index) {
    const notes = JSON.parse(localStorage.getItem("notes"));
    notes[index].completed = !notes[index].completed;
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
}

function deleteTask(index) {
    const notes = JSON.parse(localStorage.getItem("notes"));
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
}

function editTask(index) {
    const notes = JSON.parse(localStorage.getItem("notes"));
    const newText = prompt("قم بتعديل الملاحظة:", notes[index].text);

    if (newText !== null && newText.trim() !== "") {
        notes[index].text = newText.trim();
        localStorage.setItem("notes", JSON.stringify(notes));
        loadNotes();
    }
}
