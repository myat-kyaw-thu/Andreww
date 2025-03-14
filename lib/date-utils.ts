import { format as formatDate, isValid } from "date-fns"

/**
 * Safely parses a date string into a Date object
 * Works consistently across browsers including Safari
 */
export function safeParseDate(dateString: string | Date): Date {
    if (dateString instanceof Date) {
        return dateString
    }

    // Try parsing with built-in Date
    const date = new Date(dateString)

    // Check if the date is valid
    if (isValid(date)) {
        return date
    }

    // If the format is YYYY-MM-DD (ISO-like)
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        const [year, month, day] = dateString.split("-").map(Number)
        return new Date(year, month - 1, day) // month is 0-indexed in JS Date
    }

    // Fallback to current date if parsing fails
    console.warn(`Invalid date format: ${dateString}, using current date instead`)
    return new Date()
}

/**
 * Safely formats a date with date-fns
 */
export function safeFormatDate(date: string | Date, formatStr: string): string {
    const parsedDate = safeParseDate(date)
    return formatDate(parsedDate, formatStr)
}

