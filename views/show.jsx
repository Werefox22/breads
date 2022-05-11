const React = require('react')
const Default = require('./layouts/default')

function Show({bread, index}) {
	return (
		<Default>
			<h2>Show Page</h2>
			<h3>{bread.name}</h3>
			<p>and it 
				{
					bread.hasGluten
					? <span> does </span>
					: <span> does not </span>
				}
				have gluten.
			</p>
			<img src={bread.image} alt={bread.name} />
			<hr />
			<div className='buttons'>
				<a href='/breads'><button>Back</button></a>
				<a href={`/breads/${index}/edit`}><button>Edit</button></a>
				<form action={`/breads/${index}?_method=DELETE`} method='POST'>
					<input type='submit' value='DELETE'/>
				</form>
			</div>
		</Default>
	)
}

module.exports = Show