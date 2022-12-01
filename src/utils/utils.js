export const cutTooLongString = (string, howMuch) => {
    return string?.length > howMuch ?
    string?.slice(0, howMuch) + '...':
    string
}