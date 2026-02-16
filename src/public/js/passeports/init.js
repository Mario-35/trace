document.addEventListener("DOMContentLoaded", function () {
	const table = new JsonTable({
		jsonUrl: window.location.origin + "/passeports",
		editUrl: "/addPasseport.html",
		printUrl: "/passeport/",
		rowsPerPage: 10,
		container: "#jsonTable",
		globalSearch: "#globalSearch",
		pagination: "#pagination",
		print: true,
		edit: false,
		see: true,

		columns: [
			{ key: "ID", title: "ID", searchType: false },
			{
				key: "nom",
				title: "Nom interne du passeport",
				searchType: "text"
			},
			{
				key: "tracabilite",
				title: "Tracabilité",
				searchType: "text"
			},
			{
				key: "annee",
				title: "Année",
				searchType: "text"
			},
			{
				key: "code",
				title: "Code",
				searchType: "text"
			},
		]
	});
});