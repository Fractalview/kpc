// DEPENDENCIES
var express   = require("express"),
app           = express(),
bodyParser    = require("body-parser"),
mongoose      = require("mongoose"),
methodOverride = require("method-override");
router      = express.Router();


// var fs = require("fs"),
// http = require("http"),
// url = require("url"),
// path = require("path");

// app.get('/video', function(req, res) {
//     const path = 'https://streamable.com/veb96'
//     const stat = fs.statSync(path)
//     const fileSize = stat.size
//     const range = req.headers.range
  
//     if (range) {
//       const parts = range.replace(/bytes=/, "").split("-")
//       const start = parseInt(parts[0], 10)
//       const end = parts[1] 
//         ? parseInt(parts[1], 10)
//         : fileSize-1
//       const chunksize = (end-start)+1
//       const file = fs.createReadStream(path, {start, end})
//       const head = {
//         'Content-Range': `bytes ${start}-${end}/${fileSize}`,
//         'Accept-Ranges': 'bytes',
//         'Content-Length': chunksize,
//         'Content-Type': 'video/mp4',
//       }
  
//       res.writeHead(206, head);
//       file.pipe(res);
//     } else {
//       const head = {
//         'Content-Length': fileSize,
//         'Content-Type': 'video/mp4',
//       }
//       res.writeHead(200, head)
//       fs.createReadStream(path).pipe(res)
//     }
//   });


// ROOT ROUTE
router.get("/", function (req, res) {
    res.render("prezentacija");
});



// EXPORTS
module.exports = router;