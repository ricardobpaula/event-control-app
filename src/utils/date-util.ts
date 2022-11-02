export function parseToGMT3(date: Date):Date {

    return new Date(date.setHours(date.getHours() + 3))
}