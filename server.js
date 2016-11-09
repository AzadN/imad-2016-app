var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto=require('crypto');
var config={
    user: 'azadn',
    database: 'azadn',
    host:'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD,
};
var app = express();
app.use(morgan('combined'));

var counter=0;
app.get('/counter',function(req,res){
    counter+=1;
    res.send(counter.toString());
});

var names=[];
app.get('/submit-name',function(req,res)
{
    var name =req.query.name;
    names.push(name);
    //JSON:JavaScript Object Notation
    res.send(JSON.stringify(names));
});

function hash(input,salt){
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return hashed.toString('hex');
}
app.get('/hash/:input',function(req,res){
   var hashedString=hash(req.params.input,'this-is-some-ramdom-string');
   res.send(hashedString);
});

var pool=new Pool(config);
app.get('/test-db',function(req,res)
{
   pool.query('SELECT * FROM test',function(err,result){
      if(err) {
          res.status(500).send(err.toString());
      }
      else{
          res.send(JSON.stringify(result.rows));
      }
   }); 
});

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
                ${date.toDateString()}
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

app.get('/articles/:articleName',function(req,res)
{
  var articleName=req.params.articleName;
  
  var articleData=req.params.articleName;
  
  //SELECT * from article where title='\'; delete where a=\'asdf'
  pool.query("SELECT * FROM article WHERE title= $1", [req.params.articleName],function(err,result){
     if(err){
         res.status(500).send(err.toString());
     }
      else{
          if(result.rows.length===0){
              res.status(404).send('Article not found');
          }
          else{
              var articleData=result.rows[0];
              res.send(createTemplate(articleData));
          }
      }
  });
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
