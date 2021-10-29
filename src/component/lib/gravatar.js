import md5 from 'md5'

const getGravatarURL = (email) => {
  const address = String(email).trim().toLowerCase();
  const hash = md5(address);

  return `https://s.gravatar.com/avatar/${hash}?s=80`;
}

export default getGravatarURL
