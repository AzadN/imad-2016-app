console.log('Loaded!');

var element=document.getElementById('main-text');
element.innerHTML='New value';

var img=document.getElementById('x');
var marginLeft=0;
function moveRight()
{
    marginLeft=marginLeft+11;
    img.style.marginLeft=marginLeft + 'px';
}
img.onclick=function()
{
    var interval=setInterval(moveRight,50);
};