getElement('btn-creer').addEventListener('click', async function() {
    head(" btn-creer");
    const operation = "Ajout d'un passeport";
    if(validatePasseport() === true) {

        _DATAS = JSON.stringify(formToJSON(document.getElementsByClassName('formData')[0].elements));
        var input = document.querySelector('input[type="file"]');
        if (input.files[0]) {
            const formData = new FormData();
            formData.append('image', input.files[0]);
            const addFile = await fetch(window.location.origin + `/upload`, {
                method: "POST",
                body: formData,
            });
            const res = await addFile.json();   
            _DATAS["fichier"] = res.id;
        } else _DATAS["fichier"] = 0;
        fetch(window.location.origin + `/passeport`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(_DATAS),
        }).then(async response => {
            if (response.status === 201) {
                showModalOk(operation, "Tout est ok", ["ok"], false, false, "./passeports.html");
            } else {
                const resJson =  await response.json();
                showModalError(operation, resJson.code + " : " + resJson.error);
            }
        }).catch(err => {
             showModalError(operation, err);
        });
    }
});

getElement('demo').addEventListener('click', function() {
    document.getElementById("nom").value = 'Parcelle de chez moi 2026';
    document.getElementById("annee").value  = '2026';
    document.getElementById("tracabilite").value = '16';
    document.getElementById("origine").value = "FR";
    refresh();
});