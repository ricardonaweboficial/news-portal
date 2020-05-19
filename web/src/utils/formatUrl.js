export default function formatUrl(url) {// Clear Url for view creater
	const removeHttps = url.slice(8,url.length - 8);
	const limitUrl = removeHttps.indexOf('/');
	const urlClear = removeHttps.slice(0, limitUrl)
	return urlClear
}