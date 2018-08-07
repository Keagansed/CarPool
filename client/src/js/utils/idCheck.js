// File Type: Test Script

/*
    Method to validate email from a regular expression
    Takes in the email which is a string as a parameter
    Returns whether or not the email is correct as a boolean value
 */
module.exports.ValidateEmail = function(email) {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };


module.exports.ValidateIDNumber = function(idNumber) {
    // assume everything is correct and if it later turns out not to be, just set this to false
    let correct = true;

    //Ref: http://www.sadev.co.za/content/what-south-african-id-number-made
    //Ref: https://www.westerncape.gov.za/general-publication/decoding-your-south-african-id-number-0
    // SA ID Number have to be 13 digits, so check the length
    if (idNumber.length !== 13 || !isNumber(idNumber)) {
        correct = false;
    }

    // get first 6 digits as a valid date
    let tempDate = new Date(idNumber.substring(0, 2), idNumber.substring(2, 4) - 1, idNumber.substring(4, 6));

    if (!((tempDate.getYear() === idNumber.substring(0, 2)) && (tempDate.getMonth() === idNumber.substring(2, 4) - 1) && (tempDate.getDate() === idNumber.substring(4, 6)))) {
        correct = false;
    }

    // get the gender
    //let genderCode = idNumber.substring(6, 10);
    //let gender = parseInt(genderCode) < 5000 ? "Female" : "Male";

    // get country ID for citzenship
    //let citzenship = parseInt(idNumber.substring(10, 11)) == 0 ? "Yes" : "No";

    // apply Luhn formula for check-digits
    let tempTotal = 0;
    let checkSum = 0;
    let multiplier = 1;
    for (let i = 0; i < 13; ++i) {
        tempTotal = parseInt(idNumber.charAt(i), 10) * multiplier;
        if (tempTotal > 9) {
            tempTotal = parseInt(tempTotal.toString().charAt(0), 10) + parseInt(tempTotal.toString().charAt(1), 10);
        }
        checkSum = checkSum + tempTotal;
        multiplier = (multiplier % 2 === 0) ? 1 : 2;
    }
    if ((checkSum % 10) !== 0) {
        correct = false;
    }

    return correct;
};

/*
    Function to check if the variable n is a number
    Returns a boolean value which represents whether or not it is a number
 */
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}