export const cleanStringAndReturnLower = (inputStr: string) => {
    return inputStr.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}