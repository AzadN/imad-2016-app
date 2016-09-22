var button=document.getElementById('submit_btn');
/*button.onclick=function()
{
  var request=new XMLHttpRequest();
  request.onreadystatechange=function()
  {
      if(request.readyState===XMLHttpRequest.DONE)
      {
          if(request.status===200)
          {
               var names=['name1','name2','name3','name4'];
               var list='';
               for(var i=0;i<names.length;i++)
               list+='<li>'+names[i]+'</li>';
          }
      }
  };
  request.open('GET','http://azadn.imad.hasura-app.io/submit-name'+name,true);
  request.send(null);
};*/

var submit=document.getElementById('submit_btn');

submit.onclick=function()
{
   
  var request=new XMLHttpRequest();
  request.onreadystatechange=function()
  {
      if(request.readyState===XMLHttpRequest.DONE)
      {
          if(request.status===200)
          {
               var names=request.responseText;
               names=JSON.parse(names);
               var list='';
               for(var i=0;i<names.length;i++)
               list+='<li>'+names[i]+'</li>';
          }
      }
  };
  var nameInput=document.getElementById('name');
var name=nameInput.value;
  request.open('GET','http://azadn.imad.hasura-app.io/submit-name=' + name,true);
  request.send(null);
};