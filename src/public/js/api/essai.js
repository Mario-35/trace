function createSticker(name, stick, value) {
    const element = document.createElement('div');
    element.className = name;
    element.id=name;
    element.innerText = value;
    element.style =  'overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: ' + stick.align + '; font-size: ' + stick.size || '10px' + ';';
    return element;
}

function genrateBarCode(element, data) {
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, data, {
        format: "CODE128",
        width: 1,
        height: 50,
        fontSize: 16,
        flat: true,
        diplayvalue: true
    });
    element.appendChild(canvas);
}

function createEtiquette(element, values) {
    const vals = JSON.parse(JSON.stringify(values.etiquette));
    const etiquette =  document.createElement('div');
    etiquette.className = "sticker";
    const CB =  document.createElement('div');
    CB.className = "sticker0 barcode";
    genrateBarCode(CB, values[vals.sticker0.key] , 25 )
    etiquette.appendChild(CB);
    const rightCB = document.createElement('div');
    rightCB.className = "rightCB";
    rightCB.innerHTML = `
    <table style="  width: 100%; height: 100%; border-collapse: collapse; border-spacing: 0;">
            <tr><td></td></tr>
            <tr><td></td></tr>
            <tr><td class="dateLabel">Prelevement</td></tr>
            <tr><td class="date">${formatDate(values["prelevement"])}</td></tr>
            <tr><td class="dateLabel">Peremption</td></tr>
            <tr><td class="date">${formatDate(values["peremption"])}</td></tr>
    </table>`;
    etiquette.appendChild(rightCB);      
    Object.keys(vals).filter(e => e != "sticker0").forEach(stick => {
        const key = vals[stick].key;
        etiquette.appendChild(createSticker(stick, vals[stick], ["prelevement","peremption"].includes(key) ? formatDate(values[key]) : values[key]));        
    });
    element.appendChild(etiquette);
};

