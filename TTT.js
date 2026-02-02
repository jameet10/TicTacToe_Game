const m=document.querySelectorAll(".main");
const restart =document.querySelector(".Reset");
let box=[[],[],[]],j=0,k=0,l=0,c=0,player="",temp=0;
let countx=0,countz=0,rcountx=0,rcountz=0;
let sccountx=[0,0,0],sccountz=[0,0,0];
let srcountx=[0,0,0],srcountz=[0,0,0];
//i is declared insidse the loop for pre-iteration binding
for(let i=0;i<m.length;i++)
{   
     m[i].addEventListener("click",wrapping,{once:true});
}
function wrapping(event)
{
Game(event.target);
}
function Game(temp)
{
   i=temp.dataset.index;
   m[i]=temp;
   m[i].dataset.order=`${j}`;
   j++;
   k=Math.trunc(i/3);
   l=i%3;
   box[k][l]=document.createElement('img');
   m[i].appendChild(box[k][l]);
  if(m[i].dataset.order%2==0)
  {
   box[k][l].src="circle.jpeg";
   box[k][l].dataset.value="O";
  }
  else{
   box[k][l].src="cross.jpeg";
   box[k][l].dataset.value='X';
  }
  //Winning
  if(box[k][l]!=undefined)
    {//Diagonal Win
    if(l==k)
    {
    countz=updatez(l,k,countz);
    countx=updatex(l,k,countx);
  }
    //Reverse Diagonal Win
    if(k==3-l-1)
    {
     rcountz=updatez(l,k,rcountz);
     rcountx=updatex(l,k,rcountx);
    }
    // Straight Column Win
        sccountz[l]=updatez(l,k,sccountz[l]);
        sccountx[l]=updatex(l,k,sccountx[l]);
    // Straight Row Win
        srcountz[k]=updatez(l,k,srcountz[k]);
        srcountx[k]=updatex(l,k,srcountx[k]);
     }
   if(countz==3||rcountz==3||sccountz[l]==3||srcountz[k]==3)
   { 
     setTimeout(win,450,"O");
     c=c+1;
     zero();}
   else if(countx==3||rcountx==3||sccountx[l]==3||srcountx[k]==3)
   {
        setTimeout(win,450,"X");
       c=c+1;
       zero();}
   else if((c==0)&&(m[i].dataset.order==8))
    {
      setTimeout(win,450,"Tied");
         zero();}
}
restart.addEventListener("click", Restartfn);
function Restartfn()
  {
     for(i=0;i<m.length;i++)
   {
     k=Math.trunc(i/3);
     l=i%3;
    if(box[k][l]!=undefined)
   {
    m[i].removeChild(box[k][l]);
   }
    m[i].dataset.order="";
    m[i].addEventListener("click",wrapping,{once:true});
  }
  box=[[],[],[]];
  zero();
}
function updatez(l,k,countz)
{
     if(box[k][l].dataset.value=="O")
     countz=countz+1;
     return(countz); 
}
function updatex(l,k,countx)
{
     if(box[k][l].dataset.value=="X")
     countx=countx+1;
     return(countx); 
}
function zero()
{
   countz=0;countx=0;rcountx=0;rcountz=0;j=0;c=0;
   sccountz=[0,0,0];sccountx=[0,0,0];srcountz=[0,0,0];srcountx=[0,0,0];
}
//Wining Box
const won=document.querySelector(".WON");
const outer=document.querySelector(".outer");
const NewGame=document.querySelector(".NewGame");
const audio=document.querySelector("#audio");
function win(player)
{
audio.play();
for(let i=0;i<m.length;i++)
{
  m[i].removeEventListener("click",wrapping);
}
outer.classList.add("overlay");
if(player=='O'||player=='X')
won.textContent=`The Player '${player}' Won!`;
else
won.textContent="The Match Tied.";
won.classList.add("showBox");
NewGame.classList.add("showButton");
NewGame.textContent="New Game";
NewGame.addEventListener("click",()=>
{
outer.classList.remove("overlay");
NewGame.classList.remove("showButton");
won.classList.remove("showBox");
for(let i=0;i<m.length;i++)
{
  m[i].addEventListener("click",wrapping,{once:true});
}
Restartfn();
}
);}