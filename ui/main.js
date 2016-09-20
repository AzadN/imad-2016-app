console.log('Loaded!');

var element=document.getElementById('main-text');
element.innerHTML='New value';

var img=document.getElementById('x');
function moveRight()
{
    var marginLeft=0;
    marginLeft=marginLeft+10;
    img.style.marginLeft=marginLeft+'px';
}
img.onclick=function()
{
    var interval=setInterval(moveRight,100);
};