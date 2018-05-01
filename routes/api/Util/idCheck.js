module.exports.ValidateIDNumber = function(idNumber) {
    // assume everything is correct and if it later turns out not to be, just set this to false
    var correct = true;

    //Ref: http://www.sadev.co.za/content/what-south-african-id-number-made
    //Ref: https://www.westerncape.gov.za/general-publication/decoding-your-south-african-id-number-0
    // SA ID Number have to be 13 digits, so check the length
    if (idNumber.length != 13 || !isNumber(idNumber)) {
        correct = false;
    }

    // get first 6 digits as a valid date
    var tempDate = new Date(idNumber.substring(0, 2), idNumber.substring(2, 4) - 1, idNumber.substring(4, 6));

    if (!((tempDate.getYear() == idNumber.substring(0, 2)) && (tempDate.getMonth() == idNumber.substring(2, 4) - 1) && (tempDate.getDate() == idNumber.substring(4, 6)))) {
        correct = false;
    }

    // get the gender
    var genderCode = idNumber.substring(6, 10);
    var gender = parseInt(genderCode) < 5000 ? "Female" : "Male";

    // get country ID for citzenship
    var citzenship = parseInt(idNumber.substring(10, 11)) == 0 ? "Yes" : "No";

    // apply Luhn formula for check-digits
    var tempTotal = 0;
    var checkSum = 0;
    var multiplier = 1;
    for (var i = 0; i < 13; ++i) {
        tempTotal = parseInt(idNumber.charAt(i)) * multiplier;
        if (tempTotal > 9) {
            tempTotal = parseInt(tempTotal.toString().charAt(0)) + parseInt(tempTotal.toString().charAt(1));
        }
        checkSum = checkSum + tempTotal;
        multiplier = (multiplier % 2 == 0) ? 1 : 2;
    }
    if ((checkSum % 10) != 0) {
        correct = false;
    };

    return correct;
};

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports.workyoushit = (idNumber)=>{
    
    return true;
};