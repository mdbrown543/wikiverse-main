import React, { useState, useEffect } from 'react';
import { PagesList } from './PagesList';
import { Page } from './Page';
import { onePage } from './onePage';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {

	const [pages, setPages] = useState([]);
	const [singlePage, setSinglePage] = useState({});
	const [click,setClick] = useState(false)


	async function fetchPages(){
		try {
			const response = await fetch(`${apiURL}/wiki`);
			const pagesData = await response.json();
			setPages(pagesData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	useEffect(() => {
		fetchPages();
	}, []);

	async function handleClick(){
		setClick(true)
		const response = await fetch(`${apiURL}/wiki/:slug`);
		const result = await response.json();
		console.log('*****************',result)
		setSinglePage(result)
	}

	async function handleDelete(){
		const response = await fetch(`${apiURL}/wiki/:slug`, {
		method: "DELETE"
		});
		const data = await response.json();
		console.log(data)
		setPages(data)
	}

	return (
		<main>	
      <h1>WikiVerse</h1>
			<h2>An interesting 📚</h2>
			{/*<PagesList pages={pages} />*/}
			{pages.map((pages,index) => <button key={index} onClick={handleClick} value={pages.url}>{pages.title}</button>)}
			<br></br>
			{
				(click) ? (
					singlePage.map((singlePage, idx) => {
						return <div key={idx}>{singlePage.title}</div>
					})
				):''
			}
			<button onClick={fetchPages}>Back To Wiki List</button>
			<button onClick={handleDelete}>DELETE</button>
		</main>
	)
}