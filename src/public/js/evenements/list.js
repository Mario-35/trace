document.addEventListener("DOMContentLoaded", function () {
	const table = new JsonTable({
		jsonUrl: window.location.origin + "/evenements",
		editUrl: "/Evenement-add.html",
		printUrl: undefined,
		container: "#jsonTable",
		globalSearch: "#globalSearch",
		pagination: "#pagination",
		print: false,
		edit: true,
		columns: structure 
	});
});