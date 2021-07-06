async function generateRefferal  (userId) {

    const firstNum = Math.floor((Math.random() * 10) + 1);
    const secondNum = Math.floor((Math.random() * 10) + 1);
    const thirdNum = Math.floor((Math.random() * 10) + 1);
  
   let refferalCode = ( secondNum +""+ firstNum + "" + thirdNum  + "" +  userId[userId.length - 1 ] +""+userId[userId.length - 2 ] + "" + userId[userId.length - 3 ])
     return refferalCode
}

module.exports.generateRefferal = generateRefferal