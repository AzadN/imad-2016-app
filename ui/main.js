var button=document.getElementById('counter');
button.onclick=function()
{
  counter+=1;
  var span=document.getElementById('count');
  span.innerHTML=counter.toString();
};