import axios from 'axios';
import { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        // TODO: handle error response
      });
  }, [optionType]);

  const ItemComponent =
    optionType === 'scoops'
      ? ScoopOption
      : optionType === 'toppings'
      ? ToppingOption
      : null;

  const optionItems = items.map((item) => (
    <ItemComponent key={item.name} {...item} />
  ));

  return <Row>{optionItems}</Row>;
};

export default Options;
