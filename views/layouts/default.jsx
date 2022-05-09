const React = require('react')

function Default(html) {
	return (
		<html>
			<head>
				<title>{html.title || 'Default'}</title>
			</head>
			<body>
				<header>
					<h1><a href='/breads'>BreadCRUD</a></h1>
				</header>
				<div className='container'>
					{html.children}
				</div>
			</body>
		</html>
	)
}

module.exports = Default