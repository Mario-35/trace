function showModalOk( message, redirectOk) {
    getElement("modal").innerHTML =` 
        <article class="modal">
            <section class="modal__content modal__ok">
                <h1 class="modal__heading">${document.title }</h1>
                <p class="modal__copy">${message}</p>
                <button id="close" class="modal__close">&times;</button>
                <p class="modal__actions">
                    <button id="ok" class="modal__action modal__action--ok">Ok</button>
                </p>
            </section>
        </article>`;

    const modal = document.querySelector('.modal');

    getElement("close").addEventListener('click', (e) => {
        modal.setAttribute("style", "display:none;");
    });

    getElement("ok").addEventListener('click', (e) => {
        modal.setAttribute("style", "display:none;");
        if (redirectOk) open(redirectOk, self);
    });
}

function showModalError( message) {
    getElement("modal").innerHTML =` 
        <article class="modal">
        <section class="modal__content modal__error">
            <h1 class="modal__heading">${document.title }</h1>
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
        });
}

function showModalPrint(idEchantillon, idPasseport, identification) {
    identification = identification || false;
    console.log(`idEchantillon : ${idEchantillon}   idPasseport : ${idPasseport}`)
    getElement("modal").innerHTML =` 
        <article class="modal">
            <section class="modal__content modal__ok">
                <h1 class="modal__heading">${document.title }</h1>
                <button id="close" class="modal__close">&times;</button>
                ${idPasseport > 0 ? '<label> <input type="checkbox" id ="printPasseports" checked> <span>Imprimer les passeports</span> </label>' : ''}                
                <label> <input type="checkbox" id ="printEtiquettes" checked> <span>Imprimer les étiquettes</span> </label>
                <p class="modal__actions">
                    <button id="cancel" class="modal__action modal__action--negative">Non</button>
                    <button id="accept" class="modal__action modal__action--positive">Oui</button>
                </p>
            </section>
        </article>`;

    const modal = document.querySelector('.modal');

    getElement("close").addEventListener('click', (e) => {
        modal.setAttribute("style", "display:none;");
        open(redirectClose, self);
    });
    
    getElement("cancel").addEventListener('click', (e) => {
        modal.setAttribute("style", "display:none;");
        open(redirectClose, self);
    });
    
    getElement("accept").addEventListener('click', (e) => {
        modal.setAttribute("style", "display:none;");
        let redirect = "/index.html";
        if (getElement("printPasseports") && getElement("printPasseports").checked && getElement("printPasseports").checked) {
           redirect = `${window.location.origin}/print/echantillonPasseport/${idEchantillon}`;        
        }
        if (getElement("printEtiquettes").checked) {
           redirect = `${window.location.origin}/print/${identification === true ? 'identification' : "echantillon"}/${idEchantillon}`;
        }
        if (getElement("printPasseports") && getElement("printPasseports").checked) {
            redirect = `${window.location.origin}/print/passeport/${idPasseport}`;
        }

        open(redirect, self);
    });
}