//  button création 
getElement('btn-creer').addEventListener('click', async function() {
    head(" btn-creer");
    
    _DATAS = formToJSON(document.getElementsByClassName('formData')[0].elements); 
    if(window.location.href.includes('?id=')) {
        const operation = "Modification d'un échantillon";
        const id = window.location.href.split('?id=')[1];
        fetch(window.location.origin + `/echantillon/` + id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formDatas()),
        }).then(async response => {
            if (response.status === 201) {
                showModalOk(operation, "Tout est ok", ["ok"], true, true, window.location.origin + '/print/' + "echantillon/" + id);
            } else {
                const resJson =  await response.json();
                showModalError(operation, resJson);
            }
        }).catch(err => {
            showModalError(operation, err);
        });
    } else {
        const operation = "Ajout d'un échantillon";
        if (window.location.href.includes('?excel=')) 
            _DATAS["excel"] = +window.location.href.split('?excel=')[1] || 0;
        
        fetch(window.location.origin + `/echantillon`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(_DATAS),
        }).then(async response => {
            if (response.status === 201) {
                const data = await response.json();
                showModalOk(operation, "Tout est ok", ["ok"], true, true, window.location.origin + '/print/' + "selection/" + data.selection);
            } else {
                const resJson =  await response.json();
                showModalError(operation, resJson.code + " : " + resJson.error);
            }
        }).catch(err => {
            showModalError(operation, err);
        });
    }
});

//  button d'interrogation du rpg
getElement('btnApiRpg').addEventListener('click', async function() {
    if (getElement("pointx").value && getElement("pointy").value)  {
        pointx.value = pointx.value.replace(',','.');
        pointy.value = pointy.value.replace(',','.');
        const temp = await getDatas(window.location.origin + '/rpg?pos=' + pointx.value + "," + pointy.value);
        rpgReferences = JSON.parse(`{${temp.codes.join()}}`);
        getElement("cultures").value= JSON.stringify(temp.values);
    }
    refresh();
});

// changement de la cle de stockage
getElement('cle').addEventListener('change', function() {
    valeur.value = toJson("stockage")[this.value] || '';
});

// changement de la valeur de stockage
getElement("valeur").addEventListener("blur", function() {
    addToJson ("stockage", cle.value, valeur.value);
    refresh();
});

// modification de la date de prelevement
getElement('prelevement').addEventListener('change', function() {
   getElement("identification").value = createIdentification();
});

// modification du numéro
getElement('numero').addEventListener('change', function() {
   getElement("identification").value = createIdentification();
});

// Button de demo
getElement('demos').addEventListener('change', function() {
    loadValues(_DEMOS[getElement("demos").value]);
    refresh();
});

getElement("type").addEventListener("change", function() {
    getElement("cultures").value= null;
    refreshType();
});
getElement("pointx").addEventListener("change", function() {
    getElement("cultures").value= null;
    // refreshRpg();
});

getElement("pointy").addEventListener("change", function() {
    // refreshRpg();
});

function changedpt() {
    // get HTML element
    const elem = getElement('region');
    // get value
    const val = elem.value;
    // 2 or 5 char length and numbers
    if ((val.length === 5 || val.length === 2)&& !isNaN(val)) {
        // get the first two digits to search in departement list
        let dpt= departement[val.slice(0,2)];
        // set values
        if (dpt) {
            dpt = dpt.split("|");
            elem.value = dpt[1];
            elem.title = dpt[0];
        }
    }
}

// change region value
getElement('region').addEventListener('keydown', function(event) {
    // if return and france
  if(event.keyCode == 13 && getElement('pays').value.toUpperCase() ==="FRANCE") {
    changedpt();
  }
});

// change region value
getElement('region').addEventListener('change', function(event) {
    // if return and france
  if(getElement('pays').value.toUpperCase() ==="FRANCE") {
    changedpt();
  }
});
