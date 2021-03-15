function add(a, b){
  return a+b;
}

const sub = (a, b) => a-b;

const commonDivision = (a, b) => {
  while (b !== 0){
    if(a > b){
      a = sub(a, b)
    }else{
      b = sub(b, a)
    }
  }
  return a
}