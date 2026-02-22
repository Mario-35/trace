getElement('btn-creer').addEventListener('click', function() {
    head('btn-save');
    _DATAS = formDatas();
    fetch(window.location.origin + `/configuration`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },        
        body: JSON.stringify(_DATAS),
    }).then(async response => {
        if (response.status === 201) {
            showModalOk("Configuration modifié", "./index.html");
        } else {
            const resJson =  await response.json();
            showModalError(resJson.code + " : " + resJson.error);
        }
    }).catch(err => {
        showModalError(err);
    });
});

getElement("excelSelect").addEventListener('mousedown', function(event) {
    event.preventDefault();
    const pipo = getElement("excelSelect");
    var originalScrollTop = getElement("excelSelect").scrollTop;
    console.log(event.target.getAttribute('selected'));
    if (event.target.getAttribute('selected') === null)
        event.target.setAttribute("selected", true);
    else event.target.removeAttribute("selected");
    getElement("excelSelect").focus();
    setTimeout(function() {
        getElement("excelSelect").scrollTop = originalScrollTop;
    }, 0);
    return false;
});

