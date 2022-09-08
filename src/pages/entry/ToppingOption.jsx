import { Col, Form } from 'react-bootstrap';
import { apiOrigin } from '../../constant';

const ToppingOption = ({ name, imagePath, updateItemCount }) => {
  const handleChange = (event) => {
    updateItemCount(name, event.target.checked ? 1 : 0);
  };

  return (
    <Col xs={6} sm={4} md={3} lg={2} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`${apiOrigin}/${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check type="checkbox" onChange={handleChange} label={name} />
      </Form.Group>
    </Col>
  );
};
export default ToppingOption;
