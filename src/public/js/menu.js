// Menu gauche
document.getElementById("left-pane").innerHTML = ` 
<nav role="navigation">
    <ul>
        <li><a href="./echantillons.html">Echantillons</a></li>
        <li><a href="./passeports.html">Passeports</a></li>
        <li><a href="./addConfiguration.html">Configuration</a></li>
    </ul>
</nav>`;

// Menu droite                
document.getElementById("splitter-nav-site").innerHTML = `
<nav role="navigation" class="splitter-nav-left splitter-menu-color">
    <a href="index.html">Gestion des échantillons</a>
</nav>
    <nav role="navigation" class="splitter-nav-right" id="splitter-nav-right">
    <nav role="navigation" class="splitter-nav-left">
    <img src="./assets/logo.png">
</nav>`;

// Visualisation du passeport
function createHTMLviewPasseport(values) {
    if(!values) 
        values = {  "id": 0,
                    "annee": "2019",
                    "nom": "Nom a déterminer",
                    "code": "FR",
                    "tracabilite": "005",
                    "identifiant": "BR13551",
                    "origine": "FR"};

    getElement("passeport").value = values.id;

    getElement("blockPasseport").innerHTML = `
        <div class="pass-phyto-container">
            <div class="pass-phyto border">
                <div class="flag" id="passeportFlag"><img class ="flag-eu" src="./assets/flag-eu.png"></div>
                <div class="title" id="passeportTitle" align="right"><p>Passeport phytosanitaire - ZP / Plant passport - PZ<br
                >Beet necrotic yellow vein virus</p></div>
                <div class="nom" id="passeportNom"><b>A</b> Sol</div>
                <div class="code" id="passeportCode"><p><b>B</b> ${values.code}-${values.identifiant}</p></div>
                <div class="trace" id="passeportTracabilite"><p><b>C</b> ${values.annee}-${String(values.tracabilite).padStart(4, '0')}</p></div>
                <div class="origine" id="passeportOrigine"><p><b>D</b> ${values.origine}</p></div>
            </div> 
        </div>`;
}

// Button de creation du passeport phytosanitaire
function createHTMLbtnCreatePasseport() {
    if (+getElement("passeport").value === 0) {        
        if (_CONFIG.region == getElement("region").value)
            {
            getElement("blockPasseport").innerHTML = '';
        } else if (notNull("cultures")) {
            getElement("blockPasseport").innerHTML = `
            <div class="pass-phyto-container">
                <div class="btn-group">
                    <button class="btn btn-passeport"  id="btn-passeport-create">
                        Créer un passeport phytosanitaire${+getElement("risqueRpg").value < 2 ? '' : ' avec test'} pour ${_YEAR}
                    </button>
                </div> 
            </div>`; 

            document.getElementById('btn-passeport-create').addEventListener('click', function() {
                createHTMLcreatePasseport();
                removeDisabled("btn-passeport-create");
            });    

        }
    }
}

function createHTMLcreatePasseport() {
    getElement("passeport").value = 0;
    getElement("blockPasseport").innerHTML = `
                                  <div class="form-row border">  
                                      <div class="form-group row-1">
                                          <div class="form-title">
                                              <label>Création d'un passeport phytosanitaire</label>
                                          </div>
                                          <div class="error-message" id="create-error">Créer le passeport avant de poursuivre</div>
                                      </div>
                                  </div>

                                  <div class="form-row border">

                                      <div class="form-group row-2">
                                          <label for="passeportNom">Nom interne du passeport</label>
                                          <input type="text" id="passeportNom" class="form-control" placeholder="Nom interne du passeport">
                                          <div class="error-message" id="passeportNom-error">Nom interne du passeport obligatoire</div>
                                      </div>

                                      <div class="form-group row-3">
                                          <label for="image">Joindre un fichier${+getElement("risqueRpg").value < 2 ? '' : ' de test négatif de laboratoire'}</label>
                                          <input class="form-control" type="file" name="image" id="image" accept=".doc,.docx,.pdf">
                                          <div class="error-message" id="image-error">L'ajout d'un fichier est obligatoire</div>                                          
                                      </div>
                                      
                                      <div class="form-group row-1">                    
                                          <label>&nbsp;</label>
                                          <button class="btn btn-api" alt="Créer" id="passCreate">
                                              <i class="fas fa-check"></i> Créer
                                          </button>
                                      </div>
                                  </div>
  `; 

  document.getElementById('passCreate').addEventListener('click', async function() {
    let isValid = true;   
    if (validateStr('passeportNom') === false) isValid = false;
    if (validateDate('prelevement') === false) isValid = false;
    if (isValid === false) return;
      const datas = {
          code: 'FR', 
          origine: 'FR', 
          identifiant: 'BR13551', 
          annee: getYear(prelevement), 
          tracabilite:  "001",
          nom: passeportNom.value
      }
      var input = document.querySelector('input[type="file"]');
      if (input.files[0]) {
          const formData = new FormData();
          formData.append('image', input.files[0]);
          const addFile = await fetch(window.location.origin + `/upload`, {
              method: "POST",
              body: formData,
          });
          const res = await addFile.json();
          datas["fichier"] = res.id;
      } else datas["fichier"] = 0;

      const operation = "Création d'un passeport";      
      await fetch(window.location.origin + `/passeport`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(datas),
      }).then(async response => {
          if (response.status === 201) {
            const res = await response.json();
            if (res.id) 
                getElement("passeport").value= +res.id;
            refresh();
          } else {
              const resJson =  await response.json();
              modalError(operation, resJson.code + " : " + resJson.error);
          }
      }).catch(err => {
          modalError(operation, err); 
      });
      refresh();


  });

  setDisabled("btn-passeport-create");
}

function getElement(name) {
  if (typeof name === "string") {
    element = document.getElementById(name);
    if (element) return element;
    console.log("erreur element ========> " + name);
  } else return name;
}

function hide(element) {
    element = getElement(element);
    if(element) {
      element.classList.remove("visible");
      element.classList.add("invisible");
    }
}

function show(element) {
    element = getElement(element);
    if(element) {
      element.classList.remove("invisible");
      element.classList.add("visible");
    }
}

function hideParentClass(elementName, className) {
    const elem = document.getElementById(elementName);
      if(elem)
        hide(elem.parentNode.closest('.' + className));
}

function setReadOnly(names) {
    if (typeof names === "string") names = [names];
    names.forEach(name => {
        const elem = getElement(name);
        if (elem) {
            elem.setAttribute("readonly", "");
            elem.setAttribute("disabled", "");
        }
      });
}

function removeReadOnly(names) {
    if (typeof names === "string") names = [names];
    names.forEach(name => {
        const elem = getElement(name);
        if (elem) {
            elem.removeAttribute("readonly");
            elem.removeAttribute("disabled");
        }
      });
}

function setDisabled(element) {
    elem = getElement(element);
    if(elem) 
        elem.setAttribute("disabled", "");
}
function removeDisabled(element) {
    elem = getElement(element);
    if(elem) 
       elem.removeAttribute("disabled");
}

// function setDisabled(names) {
//     if (typeof names === "string") names = [names];
//     names.forEach(name => {
//         const elem = getElement(name);
//         if (elem) elem.setAttribute("disabled", "");
//       });
// }
// function removeDisabled(names) {
//     if (typeof names === "string") names = [names];
//     names.forEach(name => {
//         const elem = getElement(name);
//         if (elem) elem.removeAttribute("disabled");
//       });
// }

function multipleHide(names) {
    if(typeof names === "string") names = [names];
    names.forEach(name => {
        const elem = document.getElementById(name);
        if(elem)
          hide(elem.parentNode.closest('.form-group'));
      });
}

function multipleShow(names) {
    if (typeof names === "string") names = [names];
    names.forEach(name => {
        const elem = document.getElementById(name);
        if(elem) 
          show(elem.parentNode.closest('.form-group'));
      });
}

function setVisible(list, visible) {
    list.forEach(name => {
      const elem = document.getElementById(name);
      if (name == visible ) 
        show(elem);
      else 
        hide(elem)
    });
}


function addToOption(name, listElements, selected) {
    var select = getElement(name);
    if (select) listElements.forEach(e => {
        var opt = document.createElement('option');
        opt.value = e;
        opt.innerHTML = e;
        if(selected && e === selected)
            opt.setAttribute("selected", "selected");
        select.appendChild(opt);
    });
};

function addToOptions(names, listElements) {
    names.forEach(name => addToOption(name, listElements));
};

function loadValue(elementName, value) {
    const elem = getElement(elementName);
    if (elem && value) {            
        switch (elem.type) {
            case "date":
                elem.value = value.split("T")[0];
                break;
            case "textarea":
                elem.value = JSON.stringify(value || '{}');
                break;
            case "checkbox":
                elem.checked = value === true;
                break;
            case "text":
            case "select-one":
                elem.value = value;
                break;
            case "number":
                elem.value = +value;
                break;        
            default:
                log(`${elem.name} err =====> ${elem.type}`);
                break;
        }
    };
}

function loadValues(values, columns) {
    columns = columns || Object.keys(values);
    columns.forEach(e => {
        if (values[e]) loadValue(e, values[e]);
    });
}
