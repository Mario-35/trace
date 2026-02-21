document.addEventListener("DOMContentLoaded", function () {
	const table = new JsonTable({
		jsonUrl: window.location.origin + "/sites",
		editUrl: "/addSite.html",
		printUrl: undefined,
		rowsPerPage: 10,
		container: "#jsonTable",
		globalSearch: "#globalSearch",
		pagination: "#pagination",
		print: false,
		edit: true,
		columns: structure 
	});
});