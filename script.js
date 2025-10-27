console.log("Hello World");
function getComputerchoice(){
  let resultado="";
  let valor=Math.random();
  if(valor<=0.33){
    resultado="piedra";
  }else if(valor>0.33 && valor<=0.66){
    resultado="papel";
  }else{
    resultado="tijera";
  }
  return resultado;
}
console.log(getComputerChoice());
