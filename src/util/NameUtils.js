export const getFirstLetters = (name) =>{
    const splittedName = name.split(' ')
    let finalString = ""
    for (var i = 0; i < splittedName.length; i++) {
      finalString = finalString + splittedName[i].charAt(0).toUpperCase()    
    }
    return finalString
}