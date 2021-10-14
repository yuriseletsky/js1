const tableElement = document.querySelector(".table-notes-items")
const tableNotesParrent = document.querySelector(".table-notes")
const tableSummaryParrent = document.querySelector(".table-summary")
const unArchiveButton = document.querySelector("#show-archive")

function getCategoryIcon(category) {
    switch (category) {
        case 'Task':
            return '<i class="fas fa-shopping-cart"></i>'
        case 'Random Thought':
            return '<i class="fas fa-head-side-virus"></i>'
        case 'Idea':
            return '<i class="fas fa-lightbulb"></i>'
        case 'Quote':
            return '<i class="fas fa-quote-right"></i>'
        default:
            return '<i class="fas fa-shopping-cart"></i>'
    }
}

function renderSummaryTable() {

}

function getSummaryInfo() {

}

function createNoteElement(data) {
    let element = document.createElement('div');
    let icon = getCategoryIcon(data.category);
    element.className = `table-notes-item ${data.active === false && 'archived'}`;
    element.innerHTML = `
    <span class="note-info">
        ${icon}
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

function createSummaryElement(name, data) {
    let element = document.createElement('div');
    let icon = getCategoryIcon(name);
    element.className = 'table-notes-item';
    element.innerHTML = `
        <span class="note-info">
            ${icon}
            ${name}
        </span>
        <span class="note-info">
            ${data.active}
        </span>
        <span class="note-info">
            ${data.archived}
        </span>
`
    return element;
}

fetch('./js/data.json')
    .then(response => response.json())
    .then(data => {
        data.notes.forEach(element => {
            let noteElement = createNoteElement(element)
            tableNotesParrent.append(noteElement)
        });
        return data.notes
    })
    .then(notes => {
        let summary = new Map()
        notes.forEach(note => {
            let active = note.active ? 1 : 0;
            let archived = note.active ? 0 : 1;
            if (summary.has(note.category)) {
                let current = summary.get(note.category)
                summary.set(note.category, {
                    'active': current.active + active,
                    'archived': current.archived + archived
                })
            } else {
                summary.set(note.category, {
                    'active': active,
                    'archived': archived
                })
            }
        });
        summary.forEach((value, noteName) => {
            let summaryElement = createSummaryElement(noteName, value)
            tableSummaryParrent.append(summaryElement)
        });
        // console.log(summary);
    })
    .catch((error) => {
        console.error('Error:', error);
    });