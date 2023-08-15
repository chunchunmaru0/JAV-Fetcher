function formatedAVID(id) {
  const pattern = /^(.*[a-zA-Z])(\d+)$/;
  const match = input.match(pattern);
  if (match) {
    // If the input matches, reformat it with a hyphen
    const formattedID = match[1] + "-" + match[2];
    return formattedID;
  } else {
    // If the input already has a hyphen or doesn't match the pattern, return as is
    return input;
  }
}

function avIDValidator(input) {
  const pattern = /^[a-zA-Z]+-?\d+$/;
  const match = input.match(pattern);
  if (match) {
    return true;
  } else {
    return false;
  }
}

