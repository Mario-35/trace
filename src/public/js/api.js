
getDatas = async (url) => {
	try {
		const response = await fetch(encodeURI(url), {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		return await response.json();
	} catch (error) {
		log(error);
		return undefined
	}
}

getHtml = async (url) => {
	try {
		const response = await fetch(encodeURI(url), {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		return await response.text();
	} catch (error) {
		log(error);
		return undefined
	}
}

posttDatas = async (url, datas) => {
	try {
		const response = await fetch(encodeURI(url), {
			method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datas),
		});
		return await response.json();		
	} catch (error) {
		log(error);
		return undefined
	}
}
