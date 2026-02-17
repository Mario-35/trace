/**
 * HTML Views First for API.
 *
 * @copyright 2020-present Inrae
 * @author mario.adam@inrae.fr
 *
 */

import { EConstant } from "../../constant";
import { CoreHtmlView } from "./core";

export class List extends CoreHtmlView {
    constructor(name: String, excel?: boolean) {
        super();
        this.createIndexHtmlString(name, excel);
    }
    
    createIndexHtmlString(name: String, excel?: boolean) {
        // Split files for better search and replace
        this._HTMLResult =`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestion des ${name.toLocaleLowerCase()}s</title>
    <link rel="stylesheet" href="./css/bootstrap.css">
    <link rel="stylesheet" href="./css/icons.css">
    ${excel ? '<link rel="stylesheet" href="./css/import.css">' : ''}
    <link rel="stylesheet" href="./css/splitter.css">
</head>

<body>
	<header id="splitter-nav-site" class="splitter-nav-site"></header>
    <main class="main-view">
        <div class="splitter-nav-view" id="left-pane">
        </div>
        <div class="v-drag" id="separator"></div>
        <div class="content" id="right-pane">
			<div class="card">
				<div class="card-header row">
					<div class="col-6">
						<div class="input-group">
							<span class="input-group-text">Echantillons</span>
							<div id="blockAjouter">
								<a class="btn btn-primary icon_plus" id="ajouter" href="./add${name}.html" target="_self"> Ajouter</a>								
							</div>
                            ${ excel ? `
							<span class="input-group-text">Importer</span>
							<div class="btn btn-success field">
                            	<input type="file" name="file" id="fileone" class="inputfile inputfile-1" accept=".xls,.xlsx"
                                data-multiple-caption="{count} files selected" multiple />
                            	<label id="fileonelabel" for="fileone" class="icon_download"> Fichier excel</label>
							</div>` :''}
						</div>
					</div>
					<div class="col-3">
						<div class="input-group">
							<span class="input-group-text" id="globalSearchIcon">🔎 Search</span>
							<input id="globalSearch" type="text" class="form-control" placeholder="Recherche dans tous les champs">
						</div>
					</div>
				</div>
				<div class="table-responsive">
					<table id="jsonTable" class="table">
						<thead></thead>
						<tbody></tbody>
						<tfoot></tfoot>
					</table>
				</div>
				<div class="card-footer">
					<nav>
						<ul id="pagination" class="pagination justify-content-end"></ul>
					</nav>
				</div>
			</div>
        </div>
    </main>
</body> 
<script src="./js/constants.js"></script>
<script src="./js/all.js"></script>
<script src="./js/splitter.js"></script>
<script src="./js/menu.js"></script>  
<script src="./js/dataTables.js"></script>
<script src="./js/${name.toLocaleLowerCase()}s/init.js"></script>    
${excel ? '<script src="./js/libs/xlsx.full.min.js"></script>' : ''}
</html>
`.split(EConstant.newline)
            .map((e: string) => e.trim())
            .filter((e) => e.trim() != "");     
    }

    toString() {
        return super.toString();
    }
}
