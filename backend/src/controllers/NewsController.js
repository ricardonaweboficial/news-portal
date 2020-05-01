require('dotenv/config');
const axios = require('axios');

module.exports = {
	async index(req, res) {
		const { page } = req.query;
		const { country } = req.body;

		const response = await axios.get(
			'http://newsapi.org/v2/top-headlines?' + 
			`country=${country}&` +
			`page=${page}&` +
			`apiKey=${process.env.SECRET_KEY}`
		);

		if(response) {

			const news = response.data.articles;
			const countNews = news.length;

			if(countNews !== 0 ) {
				return res.json({ count: countNews, news });	
			}

			return res.json({ page: 'Not exist more pages' });
			
		}

		return res.status(402).json({ error: 'Error in source news, try another.'});
	},

	async show(req, res) {
		const { page } = req.query;
		const { source } = req.body;

		const response = await axios.get(
			'http://newsapi.org/v2/top-headlines?' +
			 `sources=${source}&` + 
			 `page=${page === '' ? 0 : page}&` +
			 `apiKey=${process.env.SECRET_KEY}`
		);

		if(response) {

			return res.json(response.data);
			
		}

		return res.status(402).json({ error: 'Error in source news, try another.'});
	}


}