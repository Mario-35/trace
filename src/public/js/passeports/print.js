async function start() {
    if(window.location.href.includes('?id=')) {
        const id = +window.location.href.split('?id=')[1] || 0;
        // initi id HTML value
        document.getElementsByTagName("id").value = +id;
        // get echantillon with the API
        const datas = await getDatas(window.location.origin + "/passeport/" + id);
        console.log(datas);
        // load datas        
        const printAble =  document.createElement('div');
        printAble.id = "printAble";
        getElement("right-pane").appendChild(printAble);
        createEtiquette(printAble, datas);
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

function createEtiquette(element, values) {
    const etiquette =  document.createElement('div');
    etiquette.className = "pass-phyto";
    etiquette.innerHTML = `
                <div class="head"></div>
                <div class="flag" id="passeportFlag"><img class ="flag-eu" src="./assets/flag-eu.png"></div>
                <div class="title" id="passeportTitle" align="right"><p>Passeport phytosanitaire - ZP / Plant passport - PZ<br
                >Beet necrotic yellow vein virus</p></div>
                <div class="nom" id="passeportNom"><p><b>A</b> Sol</p></div>
                <div class="code" id="passeportCode"><p><b>B</b> ${values.code}-${values.identifiant}</p></div>
                <div class="trace" id="passeportTracabilite"><p><b>C</b> ${values.annee}-${String(values.tracabilite).padStart(4, '0')}</p></div>
                <div class="origine" id="passeportOrigine"><p><b>D</b> ${values.origine}</p></div>
  
    `;
    element.appendChild(etiquette);
};

start();


        // <div class="pass-phyto-container">
        //     <div class="pass-phyto border">
        //         <div class="flag" id="passeportFlag"><img class ="flag-eu" src="./assets/flag-eu.png"></div>
        //         <div class="title" id="passeportTitle" align="right"><p>Passeport phytosanitaire - ZP / Plant passport - PZ<br
        //         >Beet necrotic yellow vein virus</p></div>
        //         <div class="nom" id="passeportNom"><b>A</b> Sol</div>
        //         <div class="code" id="passeportCode"><p><b>B</b> ${values.code}-${values.identifiant}</p></div>
        //         <div class="trace" id="passeportTracabilite"><p><b>C</b> ${values.annee}-${String(values.tracabilite).padStart(4, '0')}</p></div>
        //         <div class="origine" id="passeportOrigine"><p><b>D</b> ${values.origine}</p></div>
        //     </div> 
        // </div>`;