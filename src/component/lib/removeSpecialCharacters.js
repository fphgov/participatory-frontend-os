export const rmEmojis = (text) => {
  return text
        .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
        .replace(/(\u00A9|\u00AE|[\u2000-\u3300]|\uD83C[\uD000-\uDFFF]|\uD83D[\uD000-\uDFFF]|\uD83E[\uD000-\uDFFF])/g, '')
}

export const rmAllChar = (text) => {
  return rmEmojis(text.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''))
}

export const rmAllCharForEmail = (text) => {
  return rmEmojis(text.replace(/[`~!#$%^&*()|+\=?;:'",<>\{\}\[\]\\\/]/gi, ''))
}

export const rmAllCharForName = (text) => {
  return rmEmojis(text.replace(/[`~!@#$%^&*()_|+\=?;:'",<>\{\}\[\]\\\/]/gi, ''))
}

export const rmAllCharForTitle = (text) => {
  return rmEmojis(text.replace(/[`~@#$^*_|\=;<>\{\}\[\]\\]/gi, ''))
}

export const rmAllCharForAddress = (text) => {
  return rmEmojis(text.replace(/[`~!@#$%^&*()_|+\=?;:'"<>\{\}\[\]\\]/gi, ''))
}
