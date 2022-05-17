const React = require('react')
const Default = require('./layouts/default')

function err404() {
	return (
		<html>
			<Default>
				<h1>404: Page not found</h1>
				<p>Whoops! We couldn't find that page.</p>

				<hr />
				<div className='backButton'>
					<a href="/breads"><button>Home</button></a>
				</div>
			</Default>
		</html>
	)
}

module.exports = err404