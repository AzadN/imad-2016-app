var button=document.getElementByID('counter');
button.onclick=function()
{
  counter+=1;
  var span=document.getElementByID('count');
  span.InnerHTML=counter.toString();
};