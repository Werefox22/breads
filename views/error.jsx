const React = require('react')
const Default = require('./layouts/default')

function error(err) {
	return (
		<html>
			<Default>
				<h1>Uh oh, an error occurred</h1>
				<p>{err.content._message}</p>

				<hr />
				<div className='backButton'>
					<a href="/breads"><button>Home</button></a>
				</div>
			</Default>
		</html>
	)
}

module.exports = error