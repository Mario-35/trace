async function start() {
    if(window.location.href.includes('?id=')) {
        const id = +window.location.href.split('?id=')[1] || 0;
        // initi id HTML value
        document.getElementsByTagName("id").value = +id;
        // get echantillon with the API
        const datas = await getDatas(window.location.origin + "/echantillon/" + id);
        // load datas        
        const printAble =  document.createElement('div');
        printAble.id = "printAble";
        getElement("right-pane").appendChild(printAble);
        createEtiquette(printAble, datas);
        window.print();
    } else if (window.location.href.includes('?selection=')) { // mode chargement d'une selection
        id = +window.location.href.split('?selection=')[1] || 0;
        const temp = await getDatas(window.location.origin + "/selection/" + id);
        _STORE = {
            datas: temp,
            columns: Object.keys(temp[0])
        }
        const printAble =  document.createElement('div');
        printAble.id = "printAble";
        getElement("right-pane").appendChild(printAble);
        Object.values(_STORE.datas).forEach(e => {
            createEtiquette(printAble, e);
        });
        window.print();
    } 
} 

function printPage() {
    const p_prime = printAble.cloneNode(true);
    essai.appendChild(p_prime);
    window.print();
    // elem.style.display = "block";
    essai.innerHTML = "";
}

function createSticker(name, stick, value) {
    const element = document.createElement('div');
    element.className = name;
    element.id=name;
    element.innerText = value;
    element.style =  `overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: ${stick.align}; font-size: ${stick.size || '10'}px;`;



    return element;
}


function createEtiquettes(element, values) {
    createEtiquette(element, values);
    createEtiquette(element, values);
}
function createEtiquette(element, values) {
    const vals = JSON.parse(JSON.stringify(values.etiquette));
    const etiquette =  document.createElement('div');
    etiquette.className = "sticker";
    const CB =  document.createElement('div');
    CB.className = "sticker0";
    CB.id = "sticker0";
    CB.innerHTML = `<svg class="barcode"
    jsbarcode-format="CODE128"
    jsbarcode-value="${values[vals.sticker0.key]}"
    jsbarcode-width="1"
    jsbarcode-height="50"
    jsbarcode-textmargin="0"
    jsbarcode-fontSize="12"
    jsbarcode-margin="0"
    jsbarcode-flat="true" >
    </svg>`;
    etiquette.appendChild(CB);
    Object.keys(vals).filter(e => e != "sticker0").forEach(stick => {
        etiquette.appendChild(createSticker(stick, vals[stick], values[vals[stick].key]));        
    });
    element.appendChild(etiquette);
    JsBarcode(".barcode").init();
};

start();