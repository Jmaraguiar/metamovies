export const useChangeBanner = (direction,banner,bannerLeft,bannerRight,array)=> {
    let num = banner
    let numLeft = bannerLeft
    let numRight = bannerRight
    let maxLength = array.length

    if (direction == true) {
        num++
        numLeft++
        numRight++
    }
    else {
        num--
        numLeft--
        numRight--
    }

    if (num >= maxLength){
        num = 0
    }else if (num <= -1){
        num = maxLength - 1
    }

    if (numLeft >= maxLength){
        numLeft = 0
    }else if (numLeft <= -1){
        numLeft = maxLength - 1
    }

    if (numRight >= maxLength){
        numRight = 0
    }else if (numRight <= -1){
        numRight = maxLength - 1
    }

    return {banner: num,
            left: numLeft,
            right: numRight}

}
