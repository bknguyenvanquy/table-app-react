export function convertDate(dateString: string) {
    const date= new Date(dateString);
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
    return `${day}/${month}/${date.getFullYear()}`;
}

export function convertPhoneNumber(phoneNumber: string) {
    let newNumber = phoneNumber.split('-').join('');
    return `+84${newNumber}`;
}

export function sortByDateTime(itemA: string, itemB: string) {
    const dateA = new Date(itemA);
    const dateB = new Date(itemB);
    return dateA.getTime() - dateB.getTime();
}

export function sortByStringValue(itemA: string, itemB: string) {
    return itemA.localeCompare(itemB);
} 

export function sortByNumberValue(itemA: number, itemB: number) {
    return itemA - itemB;
}