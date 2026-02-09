import { logger } from "@infra/logger";

let _geo:any | undefined = undefined;

async function getRpgDatas(annee: number, x: string, y: string) {
    let url = 'https://apicarto.ign.fr/api/rpg/v';
    url += annee < 2015 ? '1' : '2'
    url += '?annee=' + annee +'&geom={"type": "Point", "coordinates": [' + x + ', ' + y + ']}'; 
	return fetch(encodeURI(url), {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	}).then(async (response: any) => {
		return await response.json().then((res: any) => {
			try {
				return res["code"] === 400 ? "NOT" : res["features"][0]["properties"]["code_cultu"];				
			} catch (error) {
				return "NOT"
			}
		})

	}).catch((error: Error) => {
		logger.error(error);

	});
}

export async function getRpg(x: string, y: string) {
    const results:Record<string, unknown> = {};
	const maxYear = new Date().getFullYear();
	_geo = undefined;
    for (let year = maxYear - 15; year <= maxYear; year++) {
		results[year] = await getRpgDatas(year, x, y) || "NOT";
    }
    return results;

};