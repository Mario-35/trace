let id = 0;
if(window.location.href.includes('?passeport=')) 
        id = +window.location.href.split('?passeport=')[1] || 0;

document.addEventListener("DOMContentLoaded", function () {
	const table = new JsonTable({
		jsonUrl: window.location.origin + "/echantillons" + `${id > 0 ? '/' + id : ""}`,
		editUrl: "/addEchantillon.html",
		printUrl: "/echantillon/",
		rowsPerPage: 10,
		container: "#jsonTable",
		globalSearch: "#globalSearch",
		pagination: "#pagination",
		columns: [
			{ key: "ID", title: "ID", searchType: false },
			{
				key: "Add",
				title: "&nbsp;",
                header: undefined,
                message: "Ajouter à la série",
                icon: svgs("plus"),
				searchType: "button",
                url: "addEchantillon.html?after=",
			},
			{
				key: "programme",
				title: "Programme",
				searchType: "select"
			},
			{
				key: "site",
				title: "Site",
				searchType: "text"
			},
			{
				key: "responsable",
				title: "Pesponsable",
				searchType: "text"
			},
			{
				key: "prelevement",
				title: "Prélévement",
				searchType: "date"
			},
			{
				key: "identification",
				title: "Identification",
				searchType: "text"
			},
			{
				key: "etat",
				title: "Etat",
				searchType: "select"
			}
		]
	});
});


class ExcelToJSON {
    table = undefined;
    parseExcel(file) {
        var reader = new FileReader();
        reader.onload = (e) => {
            var data = e.target.result;
            var workbook = XLSX.read(data, { type: 'binary' });
            workbook.SheetNames.forEach((sheetName) => {
                if (sheetName.toUpperCase() === "IDENTIFICATION") {
                    var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                    var json_object = JSON.stringify(XL_row_object);
                     _SRC = [..._SRC, ... JSON.parse(json_object)];
                    this.table = new JsonTable({
                        jsonUrl: "",
                        addUrl: "/addExcelEchantillon.html",
                        rowsPerPage: 10,
                        container: "#jsonTable",
                        globalSearch: "#globalSearch",
                        pagination: "#pagination",
                        print: false,
                        edit: false,
                        select: true,
                        data: _SRC.map((v, k) => ({...v, selected: true, id: k})),
                        columns: Object.keys(_SRC[0]).map(e => { return { "key": e, "title": e, "searchType": "excel" }})  
                    });
                }
            });
    
        };
        reader.onerror = (ex) => console.log(ex);
        reader.readAsBinaryString(file);
    }


}

if (document.getElementById("fileone")) {

    fileone.addEventListener("change", function(e) {
        document.getElementById('blockAjouter').innerHTML = `<a class="btn btn-success" id="ajouterExcel" target="_self"><i class="bi bi-database-add"></i> Ajouter</a>`;
        var fileName = "";
        try {
            if (this.files && this.files.length > 1)
                fileName = (this.getAttribute("data-multiple-caption") || "").replace("{count}", this.files.length);
            else
                fileName = e.target.value.split("\\").pop();

            if (fileName) {
                fileonelabel.querySelector("span").innerHTML = fileName;
            } else {
                fileonelabel.innerHTML = labelVal;
            }
        } catch (err) {
            notifyError("Error", err);
        }
    });

    fileone.addEventListener('change', handleFileSelect, false);
}

function handleFileSelect(evt) {
    var files = evt.target.files;
    var xl2json = new ExcelToJSON();
    xl2json.parseExcel(files[0]);
    document.getElementById('ajouterExcel').addEventListener('click', async function() {
        const response = await xl2json.table.postStore();
        open("./addEchantillon.html?excel=" + JSON.parse(response)[0].id);
    }); 
}


getElement("ajouter").innerHTML = svgs("dbAdd", "Ajouter");
getElement("fileonelabel").innerHTML = svgs("download", "Fichier Excel");
getElement("globalSearchIcon").innerHTML = svgs("search");