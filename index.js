import express from 'express'
import json from './products.json' assert { type: 'json' };

const app = express()
app.use(express.json())
const products = json.product
const PORT = 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando na ${PORT}` );
})

function searchProduct(id){
    return products.findIndex(products =>{
        return products.id === Number(id)
    })
}

app.route('/products')
    .get((req, res) =>{
        res.status(200).json(products)
    })
    .post((req, res) =>{
        products.push(req.body)
        res.status(200).send("Registration successeful")
    })

    
app.route('/products/:id')
    .get((req, res) =>{
        const id = searchProduct(req.params.id)
        res.status(200).json(products[id])
    })
    .put((req, res) =>{
        const id = searchProduct(req.params.id)
        products[id].description = req.body.description
        products[id].cost = req.body.cost
        products[id].price = req.body.price
        res.status(200).json(products[id])
    })
    .delete((req, res) =>{
        const id = searchProduct(req.params.id)
        if(products[id]){
            products.splice(id, 1)
            res.status(200).send('Removido')
        }
        else{
            res.status(200).send("Id não encontrado")
        }
    })
