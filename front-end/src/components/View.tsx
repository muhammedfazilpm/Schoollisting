import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function View() {
  const navigate=useNavigate()
  const location = useLocation();
  const [data, setData] = useState([]);
  const id = location.state;

  const getviewdata = async (id: string) => {
    try {
      console.log("req", id);
      const response = await axios.post('http://localhost:5000/api/school/view', { id });
      if (response.data.success) {
        setData(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  }

  useEffect(() => {
    getviewdata(id);
  }, [id]);

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
    <Card className='text-center' style={{ width: '100rem' }}>
      <h2 className="font-weight-bold mt-5 mb-5">School-View</h2>
      <div className="d-flex justify-content-center">
        <Image
          src={`http://localhost:5000/icons/${(data[0] as any)?.image}`}
          alt="Image"
          fluid
          style={{ maxWidth: '300px', maxHeight: '300px' }}
        />
      </div>
      <Card.Body>
  <Card.Header className="font-weight-bold" style={{ fontSize: '1.8rem' }}>
    {(data[0] as any)?.name}
  </Card.Header>

  <Card.Text className="font-weight-bold" style={{ fontSize: '1.2rem' }}>
    STATE   :- {(data[0] as any)?.state}
  </Card.Text>
  <Card.Text className="font-weight-bold" style={{ fontSize: '1.2rem' }}>
    DISTRICT:- {(data[0] as any)?.district}
  </Card.Text>
  <Card.Text className="font-weight-bold" style={{ fontSize: '1.2rem' }}>
    PLACE   :- {(data[0] as any)?.place}
  </Card.Text>
  <Card.Text className="font-weight-bold" style={{ fontSize: '1.9rem' }}>
    {(data[0] as any)?.description}
  </Card.Text>
  <Button onClick={() => navigate('/')} variant="primary">Back</Button>
</Card.Body>

    </Card>
  </div>
  
  );
}

export default View;
