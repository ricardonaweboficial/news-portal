export default function formatUrl(url) {// Clear Url for view creater
	const https = url.slice(0,5)
	if(https === 'https') {
		const removeHttps = url.slice(8,url.length - 8);
		const limitUrl = removeHttps.indexOf('/');
		const urlClear = removeHttps.slice(0, limitUrl)
		return urlClear	
	} else {
		const removeHttps = url.slice(7,url.length - 7);
		const limitUrl = removeHttps.indexOf('/');
		const urlClear = removeHttps.slice(0, limitUrl)
		return urlClear	
	}
	
}