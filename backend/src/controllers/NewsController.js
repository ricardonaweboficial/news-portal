require('dotenv/config');
const axios = require('axios');

module.exports = {
	async index(req, res) {

		const response = await axios.get(
			'http://newsapi.org/v2/top-headlines?' + 
			`country=br&` +
			`apiKey=${process.env.SECRET_KEY}`
		);

		if(response) {

			const news = response.data.articles;

			return res.json(news);
			
		}

		return res.status(402).json({ error: 'Error in source news, try another.'});
	},

	async show(req, res) {
		const { source } = req.body;

		const response = await axios.get(
			'http://newsapi.org/v2/top-headlines?' +
			 `sources=${source}&` + 
			 `apiKey=${process.env.SECRET_KEY}`
		);

		if(response) {
			const news = response.data.articles;
			
			return res.json(news);
			
		}

		return res.status(402).json({ error: 'Error in source news, try another.'});
	}


}