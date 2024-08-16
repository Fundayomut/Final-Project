import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
export const ProductsLinie = ({ daten }) => {
  const [productNumber, setproductNumber] = useState();
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [size, setSize] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    setproductNumber(daten.productNumber);
    setName(daten.name);
    setCategory(daten.category);
    setSize(daten.size);
    setPrice(daten.price);
    setImage(daten.image);
    setDescription(daten.description);
  }, [daten])
  return (
    <div className='prodLiniemain'>
      <p>probieren</p>
    <div >
      <Card style={{ width: '18rem' }}>
        <Card.Img  variant="top" src={image} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {description}
          </Card.Text>
          <Button variant="primary">Details</Button>
        </Card.Body>
      </Card>
      </div>
    </div>
      )
}
