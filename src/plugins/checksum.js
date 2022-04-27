// import Vue from 'vue'

const CryptoJS = require('crypto-js')

export function getChecksum (resource, sharedSecret = '87DWalsdPhwEpRZahPKZiggoY6s6pbKtr56nUBt9czE') {
  const hash = CryptoJS.SHA1(resource + sharedSecret)
  const result = CryptoJS.enc.Hex.stringify(hash)

  return result
}

const convert = require('xml-js')

export function convertXMLtoJSON (xml) {
  const json = convert.xml2json(xml, { compact: true })

  return JSON.parse(json)
}
