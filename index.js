// il nostro server funziona sulla prot 8000
const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()
const url = 'https://www.ilpost.it/'

axios(url)
.then(response => {
   const html = response.data
   const $  = cheerio.load(html)
   const articles = []

   // inidchiamo quali classi cercare e invochiamo una funzione per conservare i dati in variabili 
   $('._article-title_1aaqi_4',html).each(function(){
  const title = $(this).text()
   const url =  $(this).find('a').attr('href')

   // push nel nostro array usando struttura a oggetti 
   articles.push({
    title,
    url
   })
})
console.log(articles)
}).catch(err => console.log('error'))


// diciamo a express di monitorare gli avvenimenti sulla nostra porta
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))