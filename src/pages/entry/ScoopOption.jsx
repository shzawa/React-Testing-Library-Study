import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { apiOrigin } from '../../constant';

const ScoopOption = ({ name, imagePath, updateItemCount }) => {
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event) => {
    const newValue = event.target.value;

    const newValueFloat = parseFloat(newValue);
    const newValueIsValid =
      !isNaN(newValueFloat) &&
      0 <= newValueFloat &&
      newValueFloat <= 10 &&
      Math.floor(newValueFloat) === newValueFloat;

    setIsValid(newValueIsValid);

    if (newValueIsValid) updateItemCount(name, newValue);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`${apiOrigin}/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: '10px' }}
      >
        <Form.Label column xs={6} style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs={5} style={{ textAlign: 'left' }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
            isInvalid={!isValid}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};
export default ScoopOption;
