//  button création 
document.getElementById('btn-creer').addEventListener('click', async function() {
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
                modalRedirect(operation, "Modification réussie", "./echantillons.html");
                showModalOk(operation, "Tout est ok", ["ok"], true, true, "./printEchantillon.html?id="+ id);
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
                showModalOk(operation, "Tout est ok", ["ok"], true, true, "./printEchantillon.html?selection="+ data.selection);
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
document.getElementById('btnApiRpg').addEventListener('click', async function() {
    if (getElement("pointx").value && getElement("pointy").value)  {
        pointx.value = pointx.value.replace(',','.');
        pointy.value = pointy.value.replace(',','.');
        const temp = await getDatas(window.location.origin + '/rpg?pos=' + pointx.value + "," + pointy.value);
        document.getElementById("cultures").value= JSON.stringify(temp);
    }
    refresh();
});

// changement de la cle de stockage
document.getElementById('cle').addEventListener('change', function() {
    valeur.value = toJson("stockage")[this.value] || '';
});

// changement de la valeur de stockage
document.getElementById("valeur").addEventListener("blur", function() {
    addToJson ("stockage", cle.value, valeur.value);
    refresh();
});

// modification de la date de prelevement
document.getElementById('prelevement').addEventListener('change', function() {
   getElement("identification").value = createIdentification();
});

// modification du numéro
document.getElementById('numero').addEventListener('change', function() {
   getElement("identification").value = createIdentification();
});

// Fonction de selection d'element d'étiquette
function selectElement(name) {
    const tmp = toJson("etiquette");
    document.getElementById("element").value = tmp[name].key;
    document.getElementById("elementLabel").innerText = name;
    for (let i = 1; i < Object.keys(_CONFIG.sticker).length; i++) document.getElementById("sticker" + i).classList.remove("active");
    ["btn-alignleft", "btn-aligncenter","btn-alignright"].forEach(e => document.getElementById(e).classList.remove("active"));
    document.getElementById('btn-align' + tmp[name].align).classList.add("active");
    document.getElementById(name).classList.add("active");
    document.getElementById("textSize").value = tmp[name].size || "10px";
    
};

// buttons de selection des element de l'étiquette
for (let i = 1; i < Object.keys(_CONFIG.sticker).length; i++) 
    getElement('sticker' + i).addEventListener('click', function() { selectElement("sticker" + i)});

// Action de changement de la séléction d'un élément d'étiquette
document.getElementById('element').addEventListener("change", function() {
    const tmp = toJson("etiquette");
    const name = document.getElementById("elementLabel").innerText;
    if (document.getElementById("element").value) {
        tmp[name].key = document.getElementById("element").value;
        document.getElementById("etiquette").value = JSON.stringify(tmp);
        const key = document.getElementById("element").value;
        document.getElementById(name).innerText = ["prelevement","peremption"].includes(key) ? formatDate(document.getElementById(key).value) : document.getElementById(key).value;
    }
});

// Fonction de changement d'alignement
function changeAlign(align) {
    const tmp = toJson("etiquette");
    tmp[document.getElementById("elementLabel").innerText].align = align;
    document.getElementById("etiquette").value = JSON.stringify(tmp);
    document.getElementById(document.getElementById("elementLabel").innerText).align = align;
};

// Button Alignement gauche
document.getElementById('textSize').addEventListener('change', function() {
    const tmp = toJson("etiquette");
    tmp[document.getElementById("elementLabel").innerText].size = textSize.value;
    document.getElementById("etiquette").value = JSON.stringify(tmp);
    document.getElementById(document.getElementById("elementLabel").innerText).style.fontSize = textSize.value;
});

// Button Alignement gauche
document.getElementById('btn-alignleft').addEventListener('click', function() {
    changeAlign("left");
});

// Button Alignement centre
document.getElementById('btn-aligncenter').addEventListener('click', function() {
    changeAlign("center");
});

// Button Alignement droite
document.getElementById('btn-alignright').addEventListener('click', function() {
    changeAlign("right");
});

// Button de demo
document.getElementById('demos').addEventListener('change', function() {
    loadValues(_DEMOS[document.getElementById("demos").value]);
    refresh();
});

// changement de texte libre
document.getElementById("texte").addEventListener("blur", function() {
    const tmp = toJson("etiquette");
    if (texte.value.trim() === "") {
        delete tmp[document.getElementById("elementLabel").innerText].value ;
        tmp[document.getElementById("elementLabel").innerText].key =  document.getElementById("element").value;
        tmp[document.getElementById("elementLabel").innerText].value = document.getElementById("element").value;
        return;
    };   
    tmp[document.getElementById("elementLabel").innerText].key = null;
    tmp[document.getElementById("elementLabel").innerText].value = document.getElementById("texte").value;
    document.getElementById(document.getElementById("elementLabel").innerText).innerText = document.getElementById("texte").value;
    document.getElementById("etiquette").value = JSON.stringify(tmp);
});

document.getElementById("type").addEventListener("change", function() {
    document.getElementById("cultures").value= null;
    refreshType();
});
document.getElementById("pointx").addEventListener("change", function() {
    document.getElementById("cultures").value= null;
    // refreshRpg();
});

document.getElementById("pointy").addEventListener("change", function() {
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
    // refreshRpg();
}

// change region value
document.getElementById('region').addEventListener('keydown', function(event) {
    // if return and france
  if(event.keyCode == 13 && getElement('pays').value.toUpperCase() ==="FRANCE") {
    changedpt();
  }
});

// change region value
document.getElementById('region').addEventListener('change', function(event) {
    // if return and france
  if(getElement('pays').value.toUpperCase() ==="FRANCE") {
    changedpt();
  }
});

document.getElementById('testModal').addEventListener('click', function() {
    showModalError("Ajout echantillon", "Why");
});