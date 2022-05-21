const React = require('react')
const Default = require('./layouts/default')

function Show({bread}) {
	return (
		<Default>
			{/* CONTENT */}
			<h2>{bread.name}</h2>
			<p>and it 
				{
					bread.hasGluten
					? <span> does </span>
					: <span> does not </span>
				}
				have gluten.
			</p>
			<img src={bread.image} alt={bread.name} />
			<p>{bread.getBakedBy()}</p>

			<hr />
			{/* BUTTONS */}
			<div className='buttons'>
				<a href='/breads'><button>Index</button></a>
				<a href={`/breads/${bread.id}/edit`}><button>Edit</button></a>
				<form action={`/breads/${bread.id}?_method=DELETE`} method='POST'>
					<input type='submit' value='DELETE'/>
				</form>
			</div>
		</Default>
	)
}

module.exports = Show