export default class Render {
    static renderNote(element, parrentElementSelector){
        const parent = document.querySelector(parrentElementSelector)
            parent.append(element)
    }
    static renderNotes(data, parrentElementSelector, HtmlMethods) {
        const parent = document.querySelector(parrentElementSelector)
        data.notes.forEach(element => {
            let noteElement = HtmlMethods.createNoteElement(element)
            parent.append(noteElement)
        });
    }
    static renderSummary(notes, parrentElementSelector, HtmlMethods){
        const parent = document.querySelector(parrentElementSelector)
        parent.append(HtmlMethods.createSummaryNotes(notes))
    }
    static updateRenderSummary(elements, parrentElementSelector, currentItemsSelector){
        const parent = document.querySelector(parrentElementSelector)
        const currentItems = parent.querySelectorAll(currentItemsSelector)
        currentItems.forEach(el => el.remove())
        parent.append(elements)
    }
}