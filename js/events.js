export default class Events {
    static archiveNote(event) {
        event.currentTarget.parentElement.parentElement.classList.add('archived')
    }
    
    static unArchive() {
        const allItems = document.querySelectorAll(".table-notes-item")
        allItems.forEach(element => {
            element.classList.remove('archived')
        });
    }
    static deleteNote(event) {
        event.currentTarget.parentElement.parentElement.remove()
    }
    static validationForm(form){
        return form.name.value.length > 3 && form.content.value.length > 3
    }
    static create(event, formSelector, parentSellector, HtmlMethods, Render){
        const form = document.querySelector(formSelector)
        if (!this.validationForm(form)) {
            return false;
        } else {
            event.preventDefault()
        }
        const newElement = HtmlMethods.createNoteElement({
            name: form.name.value,
            created: new Date().toString().slice(4,15),
            category: form.category.value,
            content: form.content.value,
            dates: HtmlMethods.formatingDates(form.startDate, form.endDate),
            active: true,
        })
        Render.renderNote(newElement, parentSellector)
        form.reset()
        document.querySelector('.close').onclick()
        return true
    }

    static onEdit(selector, event) {
        let buttons = document.querySelectorAll(selector)
        buttons.forEach(button => {
            button.addEventListener('click', event)
        });
    }
    static onArchive(selector, events) {
        let buttons = document.querySelectorAll(selector)
        buttons.forEach(button => {
            events.forEach(event => {
                button.addEventListener('click', event)
            })
        });
    }
    static onDelete(selector, events) {
        let buttons = document.querySelectorAll(selector)
        buttons.forEach(button => {
            events.forEach(event => {
                button.addEventListener('click', event)
            })
        });
    }
    static onUnArchive(selector, event) {
        const button = document.querySelector(selector)
        button.addEventListener('click', event);
    }
    static onCreate(selector, event){
        const button = document.querySelector(selector)
        button.addEventListener('click', event)
    }
    static getCallbackUpdate(
        notesSelector,
        summarySelector,
        currentItemsSelector,
        HtmlMethods,
        Render){
        return function(){
            let elements = HtmlMethods.getUpdateSummary(notesSelector)
            Render.updateRenderSummary(elements, summarySelector, currentItemsSelector)
        }
    }

}