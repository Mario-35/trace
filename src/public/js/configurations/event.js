getElement('btn-creer').addEventListener('click', function() {
    head('btn-save');
    _DATAS = formDatas();
    const operation = "Configuration";
    fetch(window.location.origin + `/configuration`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },        
        body: JSON.stringify(_DATAS),
    }).then(async response => {
        if (response.status === 201) {
            showModalOk(operation, "Tout est ok", ["ok"], false, false, "./addConfiguration.html");
        } else {
            const resJson =  await response.json();
            showModalError(operation, resJson.code + " : " + resJson.error);
        }
    }).catch(err => {
        showModalError(operation, err);
    });
});
