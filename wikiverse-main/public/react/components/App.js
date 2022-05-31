import React, { useState, useEffect } from 'react';
import { ReactDOM } from 'react-dom';
import { PagesList } from './PagesList';
import { Page } from './Page';
import { onePage } from './onePage';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {

	const [pages, setPages] = useState([]);
	const [singlePage, setSinglePage] = useState([]);
	const [clickPage,setClickPage] = useState(false)
	const [addPage,setAddPage] = useState(false)
	const [clickDelete,setClickDelete] = useState(false)

	const [title,setTitle] = useState('')
	const [content,setContent] = useState('')
	const [author,setAuthor] = useState('')
	const [email,setEmail] = useState('')
	const [tags,setTags] = useState('')
	


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
			fetchPages()
	}, []);

	async function handleClick(){
		setClickPage(true)
		const response = await fetch(`${apiURL}/wiki/:slug`);
		const result = await response.json();
		console.log('*****************',result)
		setSinglePage(result)
	}

	const handleSubmit = (event) =>{
		event.preventDefault()
		setPages([...pages,{title}])
	}

	async function handleAdd(){
		setAddPage(true)
		const response = await fetch(`${apiURL}/wiki`, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(
		
		)
		});
		const data = await response.json();
	}

	async function handleDelete(){
		setClickDelete(true)
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
				(clickPage) ? (
					singlePage.map((singlePage, idx) => {
						return <div key={idx}>{singlePage.title}</div>
					})
				):''
			}
		
		<button onClick={handleAdd}>Create Page</button>
			<section id="controls">
           	 <div className="step">
                <h2>Add A Page</h2>
				</div>
				<form onSubmit={handleSubmit} className="step" aria-label="form" >
					<input type="text" placeholder="Title" aria-label="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
					<input type="text" placeholder="Article Content" aria-label="content" value={content} onChange={(e) => setContent(e.target.value)}/>
					<input type="text" placeholder="Author Name" aria-label="author" value={author} onChange={(e) => setAuthor(e.target.value)}/>
					<input type="text" placeholder="Author Email" aria-label="email" value={email} onChange={(e) => setEmail(e.target.value)} />
					<input type="text" placeholder="Tags" aria-label="tag" value={tags} onChange={(e) => setTags(e.target.value)}/>
					
					<button type="submit">Add Page</button>
				</form>
		</section>

			<button onClick={fetchPages}>Back To Wiki List</button>
			<button onClick={handleDelete}>DELETE</button>
		</main>
	)
}