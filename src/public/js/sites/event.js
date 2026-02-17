getElement('btn-creer').addEventListener('click', async function() {
    head(" btn-creer");
    const operation = "Ajout d'un site";
    if(validateSite() === true) {
        _DATAS = JSON.stringify(formToJSON(document.getElementsByClassName('formData')[0].elements));


    if(window.location.href.includes('?id=')) {
        const operation = "Modification d'un échantillon";
        const id = window.location.href.split('?id=')[1];
        fetch(window.location.origin + `/site/` + id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formDatas()),
        }).then(async response => {
            if (response.status === 201) {
                showModalOk(operation, "Tout est ok", ["ok"], false, false, window.location.origin + "/sites.html");
            } else {
                const resJson =  await response.json();
                showModalError(operation, resJson.code + " : " + resJson.error);
            }
        }).catch(err => {
            showModalError(operation, err);
        });
    } else {
        fetch(window.location.origin + `/site`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: _DATAS,
        }).then(async response => {
            if (response.status === 201) {
                showModalOk(operation, "Tout est ok", ["ok"], false, false, "./sites.html");
            } else {
                const resJson =  await response.json();
                showModalError(operation, resJson.code + " : " + resJson.error);
            }
        }).catch(err => {
            showModalError(operation, err);
        });
    }











    }
});