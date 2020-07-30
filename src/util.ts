export function deepCopy (obj1: any): any {
  return JSON.parse(JSON.stringify(obj1))
}

const everyThreeDigitsUnlessLast: RegExp =
            /(\d{3})(?!$)/g
//            ^      ^    ^
//            |      |    -- repeat for all matches
//            |      -- unless its followed by end of line
//            -- capture group of three digits

export function formatNumberAsString (integer: number): string {
  // 12345678 => `12,345,678`
  // decimals not handled
  return integer.toString()
                .split('').reverse().join('')   //reverse string
                .replace(everyThreeDigitsUnlessLast,'$1,') //add commas
                .split('').reverse().join('')   //reverse string
}

export function formatPrice (price: number): string {
  // 12345678 => `$12,345,678`
  return '$' + formatNumberAsString(price)
}