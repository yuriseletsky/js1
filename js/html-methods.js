export default class HtmlMethods {
    static getCategoryIcon(category) {
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
    static createNoteElement(data) {
        let element = document.createElement('div');
        let icon = this.getCategoryIcon(data.category);
        element.className = `table-notes-item ${data.active ? '' : 'archived'}`;
        element.innerHTML = `
        <span class="note-info">
            ${icon}
            ${data.name}
        </span>
        <span class="note-info">
            ${data.created}
        </span>
        <span class="note-info category">
            ${data.category}
        </span>
        <span class="note-info">
            ${data.content}
        </span>
        <span class="note-info">
            ${data.dates}
        </span>
        <div class="note-buttons">
            <button class="button edit" title="edit">
                <i class="fas fa-pencil-alt"></i>
            </button>
            <button class="button archive" title="archive">
                <i class="fas fa-archive"></i>
            </button>
            <button class="button delete" title="delete">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `
        return element;
    }

    static createSummaryElement(name, data) {
        let element = document.createElement('div');
        let icon = this.getCategoryIcon(name);
        element.className = `table-notes-item ${name.toLowerCase()}`;
        element.innerHTML = `
            <span class="note-info">
                ${icon}
                ${name}
            </span>
            <span class="note-info active">
                ${data.active}
            </span>
            <span class="note-info archived">
                ${data.archived}
            </span>
    `
        return element;
    }

    static createSummaryNotes(notes) {
        let frag = document.createDocumentFragment();
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
            let summaryElement = this.createSummaryElement(noteName, value)
            frag.append(summaryElement)
        });
        return frag
    }

    static getUpdateSummary(currentSelector) {
        const elements = document.querySelectorAll(currentSelector)
        var notes = [];
        elements.forEach(el => {
            let category = el.querySelector(".category").innerText.trim();
            let active = el.classList.contains("archived");
            notes.push({
                'category': category,
                'active': active,
            })
        })
        let newSummary = this.createSummaryNotes(notes)
        return newSummary
    }

    static formatingDates(startDate, endDate) {
        var dates = ''
        if (startDate.value) {
            dates += `${startDate?.valueAsDate?.getDate()}/${startDate?.valueAsDate?.getMonth()}/${startDate?.valueAsDate?.getFullYear()}`
        }
        if (endDate.value) {
            dates += `, ${endDate?.valueAsDate?.getDate()}/${endDate?.valueAsDate?.getMonth()}/${endDate?.valueAsDate?.getFullYear()}`
        }
        return dates
    }
}