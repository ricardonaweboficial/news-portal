import React, { useState, useEffect } from 'react';

// Api Rest
import api from './services/api';

// CSS
import './global.css';
import './App.css';


// SVG icons
import searchIcon from './assets/search.svg';
import loading from './assets/loading.png';

//Utils for project
import formatUrl from './utils/formatUrl';
import formatHours from './utils/formatHours';

function App() {
	const [ news, setNews ] = useState([]);
	const [ query, setQuery ] = useState('');
  
	useEffect(() => {
		async function loadNews() {
			try {
				const response = await api.get('/topHeadlines');

				setNews(response.data);	
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
					{news.length > 0 ? news.map((newInfo, index) => {
						return <li key={newInfo.source.id === null ? `${newInfo.source.name}${String(index)}` : `${newInfo.source.id}${String(index)}`}>
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
								<h3><span>De:</span> {formatUrl(newInfo.url)}</h3>
								<h3><span>Criado:</span> {formatHours(newInfo.publishedAt)}</h3>
							</div>
						</li>
					}) : <img src={loading} alt="loading" id="loading"/>}
				</ul>
			</section>
		</div>
	);
}

export default App;
