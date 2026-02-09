
getDatas = async (url) => {
	try {
		if (_DEBUG) console.log(url);
		const response = await fetch(encodeURI(url), {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (_DEBUG) console.log(response);
		return await response.json();
	} catch (error) {
		if (_DEBUG) console.log(error);
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
		if (_DEBUG) console.log(error);
		return undefined
	}
}
