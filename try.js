const won=document.querySelector(".WON");
const m=document.querySelectorAll(".main");
const restart =document.querySelector(".Reset");
let box=[[],[],[]],j=0,k=0,l=0,c=0;
let countx=0,countz=0,rcountx=0,rcountz=0;
let sccountx=[0,0,0],sccountz=[0,0,0];
let srcountx=[0,0,0],srcountz=[0,0,0];
for(let i=0;i<m.length;i++)
{
m[i].addEventListener("click",()=>{
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
   if(countz==3||countx==3||rcountx==3||rcountz==3||sccountx[l]==3||sccountz[l]==3||srcountx[k]==3||srcountz[k]==3)
   {
    console.log("Win")
    zero();
   }
});
}
restart.addEventListener("click",()=>
{
  for(i=0;i<m.length;i++)
  {
     k=Math.trunc(i/3);
     l=i%3;
    if(box[k][l]!=undefined)
   {
    m[i].removeChild(box[k][l]);
    box[k][l].dataset.value="";
  }
    m[i].dataset.order="";
  }
  box=[[],[],[]];
  zero();
});
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
   countz=0;countx=0;sccountz=[0,0,0];sccountx=[0,0,0];rcountx=0;rcountz=0;srcountz=[0,0,0];srcountx=[0,0,0]
}