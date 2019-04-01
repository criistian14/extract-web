const app = require('express')()
const bodyParser = require('body-parser')
const axios = require('axios')


// Settings
app.set('port', process.env.PORT || 3000)


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// Server
app.listen(app.get('port'), () => console.log('Server ON'))


// Routes
app.get('/', (req, res) => {
	res.send('index')
})


app.get('/info/*end/*', async (req, res) => {

	let response = await axios.get(req.params[1]).then(res => res.data)

	let info = response.slice(response.indexOf(req.params[0]) - 3)

	info = info.slice(0, info.indexOf('vc_row wpb_row vc_row-fluid vc_custom_1512571244059') - 56)

	let datos = [],
		sobrante = info


	for (let index = 0; index < sobrante.length; index++) {

		if(sobrante.includes('<p>')) {
			
			let posiIni  = sobrante.indexOf('<p>'),
				posiEnd  = sobrante.indexOf('</p>'),
				textTemp = sobrante.slice(posiIni + 3, posiEnd)
	

			if (!!textTemp 
				&& !textTemp.includes('</center>') 
				&& !textTemp.includes('&nbsp')
				&& !textTemp.includes('<img'))
				datos.push(textTemp)
	
			sobrante = sobrante.slice(posiEnd + 3)

		} else {
			datos.pop()
			index = sobrante.length
		}
	}


	res.json(datos)

	// res.json(req.params)
})