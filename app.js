const express =require('express');
const stripe = require('stripe')('enter your stripe secrete here');
const bodyParser = require('body-parser');
const exphndbr = require('express-handlebars');

const app = express();
const port = process.env.PORT || 3000;


 app.engine('handlebars', exphndbr({defaultLayout: 'main'}));
 app.set('view engine', 'handlebars');

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended:false}));


 app.use(express.static(`${__dirname}/public`));


 app.get('/', (req, res) => {
    res.render('index');
 });

 app.post('/charge', (req, res) => {
     const amount = 2500;
     stripe.customers.create({
         email: req.body.stripeEmail,
         source: req.body.stripeToken
     }).then(customer => stripe.charges.create({
         amount,
         description: ' By Omkar Patil',
         currency: 'usd',
         customer: customer.id
     })).then(charge => res.render('success'));
 });

app.listen(port,() => {
   console.log(`Server Started on port ${port}`);
});
