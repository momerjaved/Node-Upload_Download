const express = require("express");
const multer = require("multer");
const server = express();

const PORT =5000;

var storage = multer.diskStorage({
    destination: function(req,file,cb)
    {
        cb(null,'./uploaded_files')
    },
    filename: function(req,file,cb)
    {
        cb(null,file.originalname)
    }
});

var upload = multer({storage:storage});
// Start the server
server.listen(PORT, () =>
console.log(`Server listening on port ${PORT}!`),
);

//post
server.post('/uploadfile',upload.any(),function(req,res,next){
    console.log(req.body.description);  
    res.status(200).send({'message' : "file uploaded"});
});

server.get('/home', (req,res) => {

    res.status(200).send("Welcome to file upload utility!");
});


//HTTP GET Method
server.get('/download', (req, res) => {
    // const path = "./uploaded_files" + req.body.path;
    // const file = fs.createReadStream(path);
    const filename = req.query.filename;
    // res.setHeader('Content-Disposition', 'attachment: filename="' + filename + '"');
    // return res.send('API response for GET method');
    var filePath = `./uploaded_files/${filename}`; // Or format the path using the `id` rest param
    //var fileName = "download.gif"; // The default name the browser will use
    res.download(filePath, filename); 
  });


  
  
