import React, { useState, useEffect } from 'react';

import api from './services/api';
import './global.css';
import './App.css';

import searchIcon from './assets/search.svg'

function App() {
	const [ news, setNews ] = useState([]);
	const [ query, setQuery ] = useState('');
 
	useEffect(() => {
		async function loadNews() {
			try {
				const response = await api.get('/topHeadlines');

				setNews(response.data);	
				console.log(news);
			} catch (err) {
				return alert('Erro ao carregar as noticias, recarregue a pagina e tente novamente.');
			}
	
		}

		loadNews();
	}, []);



	async function handleQuery(e) {
		e.preventDefault();
		try {
			const response = await api.post(`/everything/${query}`);

			setNews(response.data);

			console.log(response.data)
		} catch (err) {
			return alert('Erro ao pesquisar noticias, tente novamente.');
		}
	}

	return (
		<div className="news-container">
			<header>
				<h1><span>Criado por:</span> <a href="https://github.com/RicardoWorf">RicardoWorf</a></h1>
				<form onSubmit={handleQuery}>
					<input 
						placeholder="Procure aqui por notícias"
						value={query}
						onChange={e => setQuery(e.target.value)}
						/>
					<button type="submit"><img src={searchIcon} alt=""/></button>	
				</form>
				<h1><span>API consumida:</span> <a href="https://newsapi.org">newsapi.org</a></h1>
			</header>
			<section>
				<h1>List News</h1>
				<ul>
					{news.map(newInfo => (
						<li key={newInfo.source.id === null ? newInfo.source.name : newInfo.source.id}>
							<div className="photo-new">
								<div className="box-shadow">
									<img src={newInfo.urlToImage} alt="News-Portal"/>
								</div>
								<div className="info-new">	
									<h1>{newInfo.title}</h1>
									<p>{newInfo.description}</p>
								</div>
							</div>
							<div className="url-and-date">
								<h3><span>De:</span> Maisfutebol.iol.pt</h3>
								<h3><span>Criado:</span> {newInfo.publishedAt}</h3>
							</div>
						</li>
					))}
				</ul>
			</section>
		</div>
	);
}

export default App;
