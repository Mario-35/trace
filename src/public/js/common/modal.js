function showModalOk(title, message, btns, etiquette, passeport, redirect) {
    getElement("modal").innerHTML =` 
        <article class="modal">
            <section class="modal__content modal__ok">
                <h1 class="modal__heading">${title}</h1>
                <button id="close" class="modal__close">&times;</button>
                ${etiquette ? '<label> <input type="checkbox" checked> <span>Imprimer les étiquettes</span> </label>' : '' }
                ${passeport ? '<label> <input type="checkbox" checked> <span>Imprimer les passeports</span> </label>' : '' }
                <p class="modal__actions">
                    ${ btns.includes("oui") ? '<button id="cancel" class="modal__action modal__action--negative">Oui</button>' : ''}
                    ${ btns.includes("non") ? '<button id="accept" class="modal__action modal__action--positive">Non</button>' : ''}
                    ${ btns.includes("ok")  ? '<button id="ok" class="modal__action modal__action--ok">Ok</button>' : ''}
                </p>
            </section>
        </article>`;

    const modal = document.querySelector('.modal');

    getElement("close").addEventListener('click', (e) => {
        modal.setAttribute("style", "display:none;");
    });

    if (getElement("cancel"))
        getElement("cancel").addEventListener('click', (e) => {
            modal.setAttribute("style", "display:none;");
        });

    if (getElement("accept"))
        getElement("accept").addEventListener('click', (e) => {
            modal.setAttribute("style", "display:none;");
        });

    if (getElement("ok"))
        getElement("ok").addEventListener('click', (e) => {
            modal.setAttribute("style", "display:none;");
            if(redirect) open(redirect, self);
        });


}

function showModalError(title, message, redirect) {
    getElement("modal").innerHTML =` 
        <article class="modal">
        <section class="modal__content modal__error">
            <h1 class="modal__heading">${title}</h1>
            <p class="modal__copy">${message}</p>
            <button id="close" class="modal__close">&times;</button>
            <p class="modal__actions">
                <button id="ok" class="modal__action modal__action--ok">Ok</button>
            </p>
        </section>
        </article> `;

        const modal = document.querySelector('.modal');

        getElement("close").addEventListener('click', (e) => {
            modal.setAttribute("style", "display:none;");
        });
        
        getElement("ok").addEventListener('click', (e) => {
            modal.setAttribute("style", "display:none;");
            if(redirect) open(redirect, self);
        });
}
