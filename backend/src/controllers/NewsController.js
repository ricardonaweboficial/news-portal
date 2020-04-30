require('dotenv/config');
const axios = require('axios');

module.exports = {
	async index(req, res) {
		const { country } = req.body;

		const response = await axios.get(`http://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.SECRET_KEY}`);

		if(response) {

			return res.json(response.data.articles);
			
		}

		return res.status(402).json({ error: 'Error in source news, try another.'});
	}
}