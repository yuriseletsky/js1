const tableElement = document.querySelector(".table-notes-items")
const tableNotesParrent = document.querySelector(".table-notes")

function getCategoryIcon(category) {
    switch (category) {
        case 'Task':
            return '<i class="fas fa-shopping-cart"></i>'
            break;
        case 'Random Thought':
            return '<i class="fas fa-shopping-cart"></i>'
            break;
        case 'Idea':
            return '<i class="fas fa-shopping-cart"></i>'
            break;
        case 'Quote':
            return '<i class="fas fa-shopping-cart"></i>'
            break;
        default:
            return '<i class="fas fa-shopping-cart"></i>'
            break;
    }
}

function createNoteElement(data) {
    let element = document.createElement('div');
    element.className = 'table-notes-item';
    element.innerHTML = `
    <span class="note-info">
        ${data.name}
    </span>
    <span class="note-info">
        ${data.created}
    </span>
    <span class="note-info">
        ${data.category}
    </span>
    <span class="note-info">
        ${data.content}
    </span>
    <span class="note-info">
        ${data.dates}
    </span>
    <div class="note-buttons">
        <button class="button" title="edit">
            <i class="fas fa-pencil-alt"></i>
        </button>
        <button class="button" title="archive">
            <i class="fas fa-archive"></i>
        </button>
        <button class="button" title="delete">
            <i class="fas fa-trash"></i>
        </button>
    </div>
`
    return element;
}

fetch('./js/data.json')
    .then(response => response.json())
    .then(data => {
        data.notes.forEach(element => {
            let noteElement = createNoteElement(element)
            tableNotesParrent.append(noteElement)
            console.log('1log', noteElement);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });