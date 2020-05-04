export default function isNumeric(num) {
    num = "" + num;
    return !isNaN(num) && !isNaN(parseFloat(num));
}