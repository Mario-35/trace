    
// create identification with date time (without seconds) and echantillon number
function createIdentification() {
    return `${ new Date(getElement("prelevement").value || new Date()).toLocaleDateString()}${new Date().toLocaleTimeString()}`.replace(/\D/g, "").slice(0,12) + (getElement("echantillon").value || getElement("numero").value).padStart(4, '0');
}

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

    const datas = toJson("cultures");
    const lastYear = Object.keys(datas).filter(e => datas[e] !== 'NOT').map(e => +e).reverse()[0];
    const elem = getElement("message");
    if (pays.value.toUpperCase() !== "FRANCE" || region.value.toUpperCase() !== "BRETAGNE") {
        const test = codeRisqueBettrave(["BTN","BVF"],["16","24"]);
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
}

function refreshType() {
    head('refresh Type');

    const names = [];
    for (var j = 0; j < getElement("type").options.length; j++) {
        if (getElement("type").options[j].value !== "---- Aucun ----") 
        names.push(getElement("type").options[j].value.replace(/\s/g, '').toUpperCase());
    }
    setVisible(names, getElement("type").value.replace(/\s/g, '').toUpperCase());
}

function refreshRpg() {
    head('refresh Rpg');
    const elemRpg = getElement("btnApiRpg");

    if (getElement("region").value === _CONFIG.region) 
        hide(getElement("blockRpg"));
    
    if (getElement("pointx").value && getElement("pointy").value) 
        removeDisabled(elemRpg);
    else 
        setDisabled(elemRpg);

    refreshPasseportPhytosanitaire();
}

async function refreshPasseportPhytosanitaire() {
    head('refresh Passeport Phytosanitaire');
    
    if (+getElement("passeport").value === 0 && getElement("region").value !== _CONFIG.region) 
        createHTMLbtnCreatePasseport();
    
    if (getElement("passeport").value && +getElement("passeport").value > 0) {
       const temp = await getDatas(window.location.origin + '/passeport/' +getElement("passeport").value);
       if (temp && temp.id) {
           getElement("passeport").value= +(temp.id);
           createHTMLviewPasseport(temp);
           return
       } 
   } 

   if (notNull("cultures") === false) setDisabled("btn-passeport-create");
}

function refresh() {
    head('refresh');

    refreshType();
    
    refreshRpg();

    if(!getElement("identification").value) {
        getElement("identification").value = createIdentification();
    }

    if(!getElement("peremption").value) { 
        if(getElement("prelevement").value) { 
            const dates = getElement("prelevement").value.split("-");
            getElement("peremption").value = `${+dates[0] + 5}-${dates[1]}-${dates[2]}`;
        }
    }

    if(getElement("cultures").value  ) {
        const datas = toJson("cultures");
        getElement("rpgTab").innerHTML = getElement("cultures").value  
            ? `<table class="table table-year"> <thead> <tr> ${Object.keys(datas).map((e) => `<th>&nbsp;${e}&nbsp;</th>`).join("")} </tr> </thead> <tbody> <tr> ${Object.values(datas).map((e) => `<td title="${rpgReferences[e]}">${e}</td>`).join("")} </tr> </tbody> 
            
            <tfooter><tr><td colspan="${Object.keys(datas).length}" center>                                        <div class="messageRpg">                    
                                            <p class="text-primary" id="message"></p>
                                        </div></td></tr></tfooter>
            </table>` 
            : '';      
        refreshCultures();
        show("blockRpg");
    };

    try {
        const tmp = toJson("stockage");
        getElement("stockageTab").innerHTML = getElement("stockage").value  
            ? `<table class="table table-stockage"> 
            <thead> 
                <tr> 
                    <th>&nbsp;Clé&nbsp;</th> 
                    <th>&nbsp;Valeur&nbsp;</th> 
                    <th style="width:10px">op</th> 
                </tr> 
            </thead> 
            <tbody> ${Object.keys(tmp).map((e,i) => `<tr><td>${e}</td><td>${tmp[e]}</td>
                    <td>
                        ${(i >= 0 && i < Object.keys(tmp).length - 1) ? `<a><i class="fas fa-arrow-down"></i></a>`:`&nbsp;`}
                        ${(i != 0 && i < Object.keys(tmp).length) ? `<a><i class="fas fa-arrow-up"></i></a>`:`&nbsp;`}
                        <a><i class="fas fa-trash"></i></a>
                    </td>
                </tr>`).join("")} 
            </tbody> 
        </table>` 
            : '';   
    } catch (error) {    
        console.log(error);
    } 

    if (getElement("etiquette").value) {
        const tmp = toJson("etiquette");
        Object.keys(tmp).forEach(e => {
            if (e !== "sticker0") {
                const elem = getElement(e);
                if (elem) {
                    elem.innerText = tmp[e].value ? tmp[e].value : getElement(tmp[e].key).value || 'A definir';
                    elem.align = tmp[e].align;
                }
            }
        });
    }    

    // init barCode
    if (getElement("identification").value) {
        JsBarcode("#stickerCb")
        .options({font: "OCR-B"}) // Will affect all barcodes
        .CODE128(getElement("identification").value, {fontSize: 12, textMargin: 0})
        .blank(0) // Create space between the barcodes
        .render();
    } 
    if(_DEBUG === false) {
        hide("stockage");
        hide("etiquette");
        hide("cultures");
    }    
}

function loadEchantillonLine(index) {
    if(Array.isArray(_STORE.columns)) {
        loadValues( _STORE.datas[index]);
    } else {
        Object.keys(_STORE.columns).forEach(column => {
            loadValue(column, _STORE.datas[index][_STORE.columns[column]]);
            getElement("identification").value = createIdentification();
        });
        getElement("rowNumber").innerText = 'Ligne : ' + index + ' sur ' + _STORE.datas.length ; 
    }
};

async function start() {
    if (_DEBUG === false) getElement("blockDemo").remove();

    // init id
    let id = 0;
    // default sticker
    getElement("etiquette").value = JSON.stringify(_CONFIG.sticker);   
    // init select for sticker
    addToOption(getElement('element'), _CONFIG.stickerElements);     
    addToOption(getElement('cle'), _CONFIG.stockageElements);   
    addToOption(getElement('demos'), Object.keys(_DEMOS));   
    addToOption(getElement('etat'), _CONFIG.etatElements, "Créer");        
    // if id in params get the id 
    if(window.location.href.includes('?id=')) 
        id = +window.location.href.split('?id=')[1] || 0;
    // if id to load
    if(id > 0) {
        // initi id HTML value
        document.getElementsByTagName("id").value = +id;
        // get echantillon with the API
        const datas = await getDatas(window.location.origin + "/echantillon/" + id);
        // load datas
        loadDatas(datas);
        //  change somes
        show(getElement("etat").parentNode.closest('.form-group'));
        getElement("title").innerText = "Modification d'un échantillon";
        getElement("btn-creer").innerText = "Modifier";
        getElement("btnApiRpg").innerText = "MAJ données du RPG";
        setReadOnly([ "type", "prelevement", "pays", "region", "pointx", "pointy"]);       
    
    } else if (window.location.href.includes('?selection=')) { // mode chargement d'une selection
        id = +window.location.href.split('?selection=')[1] || 0;
        const temp = await getDatas(window.location.origin + "/selection/" + id);
        _STORE = {
            datas: temp,
            columns: Object.keys(temp[0])
        }
        setReadOnly(Object.keys(_STORE.datas[0]));
        multipleShow(["etat"]); 
        removeReadOnly(["etat"]);
                // Création du range
        getElement("rowLines").innerHTML = `<input type="range" min="0" value="0" max="${+_STORE.datas.length}" id="row" /> `;
        loadEchantillonLine(0);
        // changement du range
        getElement('rowLines').addEventListener('change', function() {
            loadEchantillonLine(row.value);
        });
        getElement("title").innerText = "Modification de plusieurs échantillons";

    } else if (window.location.href.includes('?excel=')) { // mode chargement du excel depuis l'api
        // recupère l'id
        id = +window.location.href.split('?excel=')[1] || 0;
        _STORE =  await getDatas(window.location.origin + "/excel/" + id);
        if(_STORE["datas"]) {
            multipleShow(["echantillon","etat"]);
            // getElement("blockNumero").classList.remove("invisible");
            // le choix des colonnes dans la page excel est traité ici
            Object.keys(_STORE.columns).forEach(column => {
                // recupére l'élément
                const elem = getElement(column);
                // siç l'échantillon est séléctionné il n'y aura pas de numérotation automatique
                if (column === "echantillon") getElement("numero").readOnly = true;
                // renns le chanmp non modifiable
                elem.readOnly = true;
            });
            // Création du range
            getElement("rowLines").innerHTML = `<input type="range" min="0" value="0" max="${+_STORE.datas.length}" id="row" /> `;
            loadEchantillonLine(0);
            // changement du range
            getElement('rowLines').addEventListener('change', function() {
                loadEchantillonLine(row.value);
            });
            getElement("title").innerText = "Ajout depuis un fichier excel";
        }
       
    } else {
        multipleHide(["echantillon",  "etat"]); 
        multipleShow(["numero",  "nombre"]); 
        getElement("etat").value = 'Créer';
    }
   
    refresh();
}

// start without await
start();