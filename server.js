var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = { 
'article-one':{
    title: 'Article-One : Azad Nautiyal',
    heading: 'Article One',
    date: 'Sep 5, 2016',
    content: `<p>
                Assassin's Creed is an actionadventure
                video game series created by Ubisoft that consists of nine main
                games and a number of supporting materials. The games have appeared on the PlayStation 3, PlayStation
                4, Xbox 360, Xbox One, Microsoft Windows, OS X, Nintendo DS, PlayStation Portable, PlayStation Vita,
                iOS, HP webOS, Android, Nokia Symbian Windows Phone platforms, and the Wii U.
            </p>
            <p>
                Dark Souls is an action roleplaying
                video game developed by FromSoftware and published by Namco
                Bandai Games for PlayStation 3, Xbox 360, and Microsoft Windows. A spiritual successor to
                FromSoftware's Demon's Souls, it is the second installment of the overall Souls series, and the first
                installment in the Dark Souls trilogy. Dark Souls began development under the working title of Project Dark.
            </p>`,
},
'article-two':{
    title: 'Article-Two : Azad Nautiyal',
    heading: 'Article Two',
    date: 'Sep 10, 2016',
    content: `<p>
                Assassin's Creed is an actionadventure
                video game series created by Ubisoft that consists of nine main
                games and a number of supporting materials. The games have appeared on the PlayStation 3, PlayStation
                4, Xbox 360, Xbox One, Microsoft Windows, OS X, Nintendo DS, PlayStation Portable, PlayStation Vita,
                iOS, HP webOS, Android, Nokia Symbian Windows Phone platforms, and the Wii U.
            </p>`
},
'article-three':{
    title: 'Article-Three : Azad Nautiyal',
    heading: 'Article Three',
    date: 'Sep 15, 2016',
    content: `<p>
                Assassin's Creed is an actionadventure
                video game series created by Ubisoft that consists of nine main
                games and a number of supporting materials. The games have appeared on the PlayStation 3, PlayStation
                4, Xbox 360, Xbox One, Microsoft Windows, OS X, Nintendo DS, PlayStation Portable, PlayStation Vita,
                iOS, HP webOS, Android, Nokia Symbian Windows Phone platforms, and the Wii U.
            </p>`
    },
};

function createTemplate(data)
{
    var title=data.title;
    var date=data.date;
    var heading=data.heading;
    var content=data.content;
    var htmlTemplate=`
    <html>
    <head>
        <title>
            ${title}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
            <div>
                <a href="/">Home</a>
            </div>
            <hr>
            <h3>${heading}</h3>
            <div>
                ${date}
            </div>
            <div>
                ${content}
            </div>
        </div>
    </body>
    </html>
    `;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName',function(req,res)
{
  var articleName=req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
