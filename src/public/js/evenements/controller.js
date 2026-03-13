
async function start() {
    const ctx = createContext();
    // action son mode
    if (ctx.mode === "id") {  // Edit mode
      // get echantillon with the API
      const datas = await getDatas(window.location.origin + "/echantillon/" + ctx.id);
      // rpg codes
      if (datas) {
        addToOption(getElement('etat'), _CONFIGURATION.etats, datas.etat);
        identification.value = String(datas.identification);
        saveetat.value = String(datas.etat);
        savestockage.value = datas.stockage;
        etat.value = datas.etat;
        new editingList(getElement("stockageList"), "Mots clés pour le stockage", "Ajouter une clé", { "values" : JSON.stringify(datas.stockage), keys: _CONFIGURATION["stockages"]});  
      }
    } else log("Error mode");    
    updateButtonCreer(ctx);
}

start();
