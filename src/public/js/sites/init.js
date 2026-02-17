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

		columns: [
			{ key: "ID", title: "ID", searchType: false },
			{
				key: "nom",
				title: "Nom du site",
				searchType: "text"
			},
			{
				key: "pays",
				title: "Pays",
				searchType: "text"
			},
			{
				key: "region",
				title: "Region",
				searchType: "text"
			},

			{
				key: "pointx",
				title: "Position X",
				searchType: "text"
			},
			{
				key: "pointx",
				title: "Position Y",
				searchType: "text"
			}
		]
	});
});