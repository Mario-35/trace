codeRisqueBettrave = (risques, possibles) => {
    let result = undefined;
    if(getElement("cultures").value) {
        const vals = Object.values(toJson("cultures")).filter(e => ![ "","NOT"].includes(e.trim()));
        if (vals.length < 1) return { niveau: 0}; 
        risques.forEach(e => {
            if (vals.includes(e)) result = {
                niveau: 3,
                culture: rpgReferences[e]
            };
        });
        if (result) return result;
        possibles.forEach(e => {
            if (vals.includes(e)) result = {
                niveau: 2,
                culture: rpgReferences[e]
            };
        });
        if (result) return result;
        return { niveau: 1}; 
    }
    return { niveau: -1};  
}

function refreshCultures() {    
    head('refresh Cultures');
    if(getElement("cultures").value  ) {
        const datas = toJson("cultures");
        getElement("rpgTab").innerHTML = getElement("cultures").value  
            ? `<table class="table table-year"> <thead> <tr> ${Object.keys(datas).map((e) => `<th>&nbsp;${e}&nbsp;</th>`).join("")} </tr> </thead> <tbody> <tr> ${Object.values(datas).map((e) => `<td title="${rpgReferences[e]}">${e}</td>`).join("")} </tr> </tbody> <tfooter><tr><td colspan="${Object.keys(datas).length}" center><div class="messageRpg"> <p class="text-primary" id="message"></p> </div></td></tr></tfooter> </table>` 
            : '';

        const lastYear = Object.keys(datas).filter(e => datas[e] !== 'NOT').map(e => +e).reverse()[0];
        const elem = getElement("message");
        if (pays.value.toUpperCase() !== _CONFIGURATION.pays.toUpperCase() || region.value.toUpperCase() !== _CONFIGURATION.region.toUpperCase()) {
            const test = codeRisqueBettrave(["BTN","BVF"],["16","24"]);
            getElement("risqueRpg").value = test.niveau || -1 ;
            switch (test.niveau) {
                case 3:
                elem.innerText = "Risque avéré avec " + test.culture;
                elem.className = "text-danger";
                break;
                case 2:
                    elem.innerText = "Risque possible avec " + test.culture;
                    elem.className = "text-danger";
                    break;
                case 0:
                    elem.innerText = "Pas de valeur permettant de calculer le risque";
                    elem.className = "text-warning";
                    break;        
                case 1:
                    elem.innerText = "Pas de risque détécté jusqu\'en " + lastYear ;
                    elem.className = "text-good";
                    break;   
                default:
                    elem.innerText = 'Aucune donnée';
                    elem.className = "text-success";
                    break;
            }
            elem.classList.remove("invisible");
        }
    };
    show("blockRpg");
}

function refreshsolcultive() {
    head('refreshsolcultivé');
    const elemRpg = getElement("btnApiRpg");

    if (getElement("region").value === _CONFIGURATION.region) 
        hide(getElement("blockRpg"));
    
    if (getElement("pointx").value && getElement("pointy").value) 
        removeDisabled(elemRpg);
    else 
        setDisabled(elemRpg);

    refreshCultures();
    refreshPasseportPhytosanitaire();
}

async function refreshPasseportPhytosanitaire() {
    head('refresh Passeport Phytosanitaire');
    // get passeport id
    const id = Number(getElement("passeport").value);
    if (getElement("passeport").value && id > 0) {
        if (_PASSPORT) 
            createHTMLviewPasseport(_PASSPORT);
        else {
            const temp = await getDatas(window.location.origin + '/passeport/' +id);
            if (temp && temp.id) {
                _PASSPORT = temp;
                getElement("passeport").value= +(temp.id);
                createHTMLviewPasseport(temp);
                return
            } 

        } 
    } 
    if (["edit", "edits", "add"].includes(_MODE)) return;
    createHTMLbtnCreatePasseport();
}