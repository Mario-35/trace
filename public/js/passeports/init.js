document.addEventListener("DOMContentLoaded", function () {
	const table = new JsonTable({
		jsonUrl: window.location.origin + "/passeports",
		addUrl: "/addPasseport.html",
		rowsPerPage: 10,
		container: "#jsonTable",
		globalSearch: "#globalSearch",
		pagination: "#pagination",
		print: true,
		edit: true,
		columns: [
			{ key: "ID", title: "ID", searchType: false },
			{
				key: "nom",
				title: "nom",
				searchType: "text"
			},
			{
				key: "annee",
				title: "annee",
				searchType: "text"
			},
			{
				key: "code",
				title: "code",
				searchType: "select"
			},
			{
				key: "tracabilite",
				title: "tracabilite",
				searchType: "text"
			}
		]
	});
});