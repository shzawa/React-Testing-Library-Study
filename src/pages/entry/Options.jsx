import axios from 'axios';
import { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import AlertBanner from '../common/AlertBanner';

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        setHasError(true);
      });
  }, [optionType]);

  if (hasError) {
    return <AlertBanner />;
  }

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
