(async () => {
    const moduleHtml = await import('./html-methods.js')
    const HtmlMethods = moduleHtml.default
    const moduleEvents = await import('./events.js')
    const Events = moduleEvents.default
    const moduleRender = await import('./render.js')
    const Render = moduleRender.default

    fetch('./js/data.json')
        .then(response => response.json())
        .then(data => {
            Render.renderNotes(data, ".table-notes", HtmlMethods)
            return data.notes
        })
        .then(notes => {
            Render.renderSummary(notes, ".table-summary", HtmlMethods)
        })
        .then(() => {
            let updateSummaryCallback = Events.getCallbackUpdate(".table-notes .table-notes-item",
                ".table-summary",
                ".table-notes-item",
                HtmlMethods,
                Render
            )
            Events.onUnArchive("#show-archive", Events.unArchive)
            Events.onDelete('.table-notes .button.delete', [Events.deleteNote, updateSummaryCallback])
            Events.onArchive('.table-notes .button.archive', [Events.archiveNote, updateSummaryCallback])
            Events.onEdit('.table-notes .button.edit', Events.archiveNote)
            Events.onCreate("#submitForm", (event) => {
                let result = Events.create(event, "#formNote", ".table-notes", HtmlMethods, Render)
                console.log('result',result);
                if(result){
                    updateSummaryCallback()
                }
            })

        })
        .catch((error) => {
            console.error('Error:', error);
        });
})()