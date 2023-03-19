const fs = require('fs');
const express = require('express')
const path = require('path')
const server = express()
const PORT = 3000
const createPath = (page) => path.resolve(__dirname, 'pages-ejs', `${page}.ejs`)

server.set('view engine', 'ejs')
server.use(express.static(path.join(__dirname, 'pages-ejs')));
server.listen(PORT, function(err){
	if (err) console.log("Error in server setup")
	console.log("Server listening on Port", PORT);
})

server.get('/', (req, res) => {
    let arrNames = ['Ivan','Paul','John','Jake','Julia','Eugene','Alex','Johnatan','Michael','Steph','Leo','Thomas','Chris','Tom','Jenna','Alice','Piter','Elvin','Robbie','Freddy','Emma','Max','Jerry','Daniel','Richard','Andrew','Justin','Larry','Patrick','Tyler']
    let arrCountries = ['Poland', 'Belarus','Germany','France','Netherlands','USA','Russia','Ukraine','Bolivia','Turkiye','Spain','Canada','Japan','Kazahstan','Lithuania','Norway','Finland','Switzerland','Denmark','Austria','Argentina','Brazil','Greece','Portugal','Serbia','Hungary','Italy','Romania','Marocco','Saud Arabia']
    let usersInfo = [];

    for (let i = 0; i<30; i++) {
        let object = {
            name: arrNames[Math.floor(Math.random()*arrNames.length)],
            age: Math.floor(Math.random() * 100),
            country: arrCountries[Math.floor(Math.random()*arrCountries.length)]
        }
        usersInfo.push(object)
    }

    fs.writeFileSync('data.json', JSON.stringify(usersInfo), 'utf-8');

	res.render(createPath('index'), {})
})

server.get('/list', (req, res) => {
	fs.readFile('data.json', (err, data) =>{ 
		datalist = JSON.parse(data);
		res.render(createPath('list'),  { users: datalist })
	})
})