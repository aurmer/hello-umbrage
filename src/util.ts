
  export function formatNumberAsString (integer: number): string {
    // `12345678` => `12,345,678`
    return integer.toString()
                  .reverse()
                  .replace(/(\d{3})/g,'$1,')
                  .reverse()
                  .replace(/^,/,'')
  }

  export function formatPrice (price: number): string {
    return '$' + formatNumberAsString(price)
  }