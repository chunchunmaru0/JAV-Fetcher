function formatPictureDMMID(uniqueId) {
  // Extract the letter and numeric parts
  const letterPart = uniqueId.match(/[a-zA-Z]+/)[0];
  const numericPart = uniqueId.match(/\d+/)[0];

  // Calculate the number of leading zeros needed
  const numberOfZeros = 5 - numericPart.length;
  const paddedNumericPart = "0".repeat(numberOfZeros) + numericPart;

  // Construct the formatted ID by joining the parts
  const formattedId = letterPart + paddedNumericPart;

  console.log(formattedId); // Output: "PPD00456" ONLY USED FOR PICTURE USE REGULAR DMMID FOR VIDS
}

function picDMMIDValidation(dmmID) {
  const regex = /^[a-zA-Z]+00\d{1,5}$/;
  const isValid = regex.test(dmmID);
  return isValid;
}

module.exports = { formatPictureDMMID, picDMMIDValidation };
