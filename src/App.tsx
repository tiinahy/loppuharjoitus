import React from 'react';
import { useState } from 'react';
import LoginForm from './LoginForm';
import axios from 'axios';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import './App.css';

function App() {
  React.useEffect(() => {
    var _mtm = window._mtm = window._mtm || [];
    _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src='https://pilvipalvelut-matomo.rahtiapp.fi/js/container_9obdj9az_dev_d37511504bcf258f1135ef87.js'; s.parentNode.insertBefore(g,s);

    const fetchData = async () => {
      try {

var api_params = {
    'module': 'API',
    'method': 'VisitsSummary.get',
    'idSite': '2', 
    'period': 'month',
    'date': 'last30',
    'format': 'json',
    'token_auth': '318af4316e721109a50ec64b8bacd1a4'
};

    //  const response = await axios.get('https://pilvipalvelut-matomo.rahtiapp.fi/index.php', { params: { api_params }});
      const response = await axios.get('https://dummyjson.com/products');
        if (response.status === 200) {
          const products = response.data.products
         setProducts(products)
        }
      } catch (error) {
        console.error('Virhe tietojen haussa:', error);
      }
    };

    fetchData();

  }, [])

  const [products, setProducts] = useState<Object[]>([])
  const [user, setUser] = useState<Object>()
  const [product, setProduct] = useState<Object>()
  const [kategoria, setKategoria] = useState<string>()

  console.log('moikkamoi', products, user)

  const handleAddData = async () => {
    try {
      //Lisää uusi tietue Firestoreen
      for (const product of products) {
        const docRef = await addDoc(collection(firestore, 'Product'), product);
        console.log('Uusi JSON lisätty ID= ', docRef.id);
      }
    } catch (error) {
      console.error('Virhe Firestoreen tallennuksessa: ', error);
    }
  };

  function etsiLahja() {
    return (
      <button onClick={arvoLahja}>Ehdota lahjaa</button>
    )
  }  

  function haeKategoriat(tuotteet: any[]){
    if(!tuotteet){
      return []
    }
    const kategoriat: string[] = [];
    for(let i = 0; i < tuotteet.length; i++) {
      if(!kategoriat.includes(tuotteet[i].category)) {kategoriat.push(tuotteet[i].category)}
    }
    return kategoriat
  }

  function arvoLahja() {
    const filteredProducts= products.filter((tuote: any) => tuote.category==kategoria)
    const random = Math.random()
    const tuotteenindex = Math.floor(random*filteredProducts.length)
    setProduct(filteredProducts[tuotteenindex])
  }

  function kategoriaValitsin(){
const kategoriat= haeKategoriat(products)
return (<select onChange={(event) => setKategoria(event.target.value)}>{ kategoriat.map((kategoria) => (<option value={kategoria} >{kategoria}</option>))} </select>)
  }

function naytaLahja(){
  return (
    <div>
    <div>{product.category}</div>
    <div>{product.title}</div>
    <div>{product.description}</div>
    <div>{product.price}</div>
    </div>
  )
}

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
   
    { user ? (<div>Tervetuloa<br/>{ user.email }</div>) : (<LoginForm onLoginSuccess={setUser}></LoginForm>)}
    { user ? kategoriaValitsin() : undefined}
    { user ? etsiLahja() : undefined}
    { product ? naytaLahja() : undefined}
 
    </>
  )
}

export default App
