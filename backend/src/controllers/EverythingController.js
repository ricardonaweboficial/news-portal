require('dotenv/config');
const axios = require('axios');

module.exports = {
	async index(req, res) {
		const { query } = req.body;
		const { language, page } = req.query;

		const response = await axios.get(
			'http://newsapi.org/v2/everything?' + 
			`q=${query}&` +
			`language=${language}&` +
			`page=${page === '' ? 0 : page}&` +
			`apiKey=${process.env.SECRET_KEY}`
		);

		if (response) {
			const news = response.data.articles;
			
			return res.json(news);
		} 

		return res.status(402).json({ error: 'Error in source news, try another.' });
	},
}