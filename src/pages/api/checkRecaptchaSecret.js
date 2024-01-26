import axios from 'axios'

export default async function handler(req, res) {
  const { isVerified, ip } = req.body
  const baseURL = 'https://www.google.com/recaptcha/api/siteverify'
  const queryArgs = `?secret=${process.env.RECAPCHA_CHECKOUT_SECRET}&response=${isVerified}&remoteip=${ip}`
  console.log(`${baseURL}${queryArgs}`)
  const response = await axios.get(`${baseURL}${queryArgs}`)
  res.status(200).json(response.data)
}
