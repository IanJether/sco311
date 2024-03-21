



export const getLink = (link)=>{

    if (link.includes(' ')) {
        return link.replaceAll(' ', '-').toLowerCase();
      } else {
        return link;
      }

}


export const revLink = (link) => {
  if (link.includes('-')) {
    return link.replaceAll('-', ' ')
               .toLowerCase()
               .split(' ')
               .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
               .join(' ');
  } else {
    return link;
  }
};


export const handleIndex = (index) => {
  if(index==8){
    return 0
  }
  if(index==7){
    return 1
  }
  if(index==6){
    return 2
  }
  if(index==5){
    return 3
  }
  if(index==4){
    return 4
  }
  if(index==3){
    return 5
  }
  if(index==2){
    return 6
  }
  if(index==1){
    return 7
  }
  if(index==0){
    return 8
  }
}