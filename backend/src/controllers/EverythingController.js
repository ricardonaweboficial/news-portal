require('dotenv/config');
const axios = require('axios');

module.exports = {
	async index(req, res) {
		const { query } = req.params;

		const response = await axios.get(
			'http://newsapi.org/v2/everything?' + 
			`q=${query}&` +
			`apiKey=${process.env.SECRET_KEY}`
		);

		if (response) {
			const news = response.data.articles;
			
			return res.json(news);
		} 

		return res.status(402).json({ error: 'Error in source news, try another.' });
	},
}