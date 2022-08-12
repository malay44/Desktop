const express = require('express')
const app = express()
const path = require('path')
const port = 3000

app.use(express.static(__dirname + '/Public'));
app.use('/build/', express.static(path.join(__dirname, '/node_modules/three/build')));
app.use('/jsm/', express.static(path.join(__dirname, '/node_modules/three/examples/jsm')));
app.use('/dat.gui/', express.static(path.join(__dirname, '/node_modules/dat.gui')))


app.get('/', (req, res) => {

    res.sendFile(__dirname+"/Public/index.html");
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))