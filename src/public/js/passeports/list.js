document.addEventListener("DOMContentLoaded", function () {
	const table = new JsonTable({
		jsonUrl: window.location.origin + "/passeports",
		editUrl: "/addPasseport.html",
		printUrl: "/passeport/",
		container: "#jsonTable",
		globalSearch: "#globalSearch",
		pagination: "#pagination",
		print: true,
		edit: false,
		see: true,
		columns: structure
	});
});