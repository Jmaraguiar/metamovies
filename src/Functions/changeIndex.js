export const useChangeIndex = (direction,index)=>{
    let num = index

    if (direction == true) {
        num ++
    }
    else{
        num --
    }

    if (num <= 0) {
        num = 1
    }
    else if (num >= 1001) {
        num = 1000
    }

    return num
    
}