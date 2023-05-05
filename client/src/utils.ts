export function formatDateTime(date: Date): string {
  return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`
}
/**
 * checks if time is between 7-5
 * @param time needs to be in 24-hr format
 * @returns 
 */
export function isWithinRange(time: string): boolean {
  console.log(time)
  let startTime: string = "07:00";
  let endTime: string = "17:00";
  if(time.split(":")[1]!=="00"){
    return false
  }

  let currentDate = new Date();
  currentDate.setHours(parseInt(time.split(":")[0]) - 4);
  currentDate.setMinutes(parseInt(time.split(":")[1]));

  let startDate = new Date(currentDate.getTime());
  startDate.setHours(parseInt(startTime.split(":")[0]));
  startDate.setMinutes(parseInt(startTime.split(":")[1]));

  let endDate = new Date(currentDate.getTime());
  endDate.setHours(parseInt(endTime.split(":")[0]));
  endDate.setMinutes(parseInt(endTime.split(":")[1]));

  let isValid = startDate < currentDate && endDate > currentDate;
  return isValid;
}

export const isValidPassword = (password: string): boolean => {

  let hasLowerCase = false;


  for (let c of password) {
    if (c >= 'a' && c <= 'z') {
      hasLowerCase = true;
    }
  }

  // return true & true
  return hasLowerCase && password.length >= 6
}