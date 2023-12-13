import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

interface FormData {
  name: string;
  place: string;
  state: string;
  district: string;
  description: string;
  image: File | null;
}

function Form() {
  const location = useLocation();
  const id = location.state;
  const navigate = useNavigate();

  const [mode, setMode] = useState(false);
  const [edit, setEdit] = useState<FormData>({
    name: '',
    place: '',
    state: '',
    district: '',
    description: '',
    image: null,
  });
  const [data, setData] = useState<FormData>({
    name: '',
    place: '',
    state: '',
    district: '',
    description: '',
    image: null,
  });

  const getEditData = async (id: string) => {
    const response = await axios.post('http://localhost:5000/api/school/getdetails', { id });
    if (response.data.success) {
      setEdit(response.data.datas);
      setMode(true);
    }
  };

  useEffect(() => {
    if (id) {
      getEditData(id);
    }
  }, [id]);

  const sendDatas = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('place', data.place);
    formData.append('state', data.state);
    formData.append('district', data.district);
    formData.append('description', data.description);

    if (data.image) {
      formData.append('image', data.image);
    }

    try {
      if (mode) {
        const response = await axios.post('http://localhost:5000/api/school/edit', edit, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
       if(response.data.success){
        toast.success(response.data.message)
        navigate('/')

       }
       else{
        toast.error("something went wrong")
       }
      } else {
        const response = await axios.post('http://localhost:5000/api/school/new', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data.success) {
          toast.success(response.data.message);
          navigate('/');
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      
      toast.error('Check the details properly');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (mode) {
        setEdit({ ...edit, image: e.target.files[0] });
      } else {
        setData({ ...data, image: e.target.files[0] });
      }
    }
  };
  

  return (
    <div className="container mt-5">
      {edit.name ? (
        <h1 className="text-center mb-4">Edit School Details</h1>
      ) : (
        <h1 className="text-center mb-4">Add School Details</h1>
      )}


      <div className="row justify-content-center">
      
        <div className="col-md-6">
        <Button onClick={()=>navigate('/')} variant="primary container-fluid">Back</Button>{' '}
          <form
            className="text-center border rounded p-4"
            style={{ backgroundColor: '#f8f9fa', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
            encType="multipart/form-data"
            onSubmit={sendDatas}
          >
             
            <div className="form-group">
           
              <label htmlFor="schoolName">Name of the School</label>
              <input
                type="text"
                className="form-control"
                id="schoolName"
                name="schoolName"
                value={mode ? edit.name : data.name}
                required
                onChange={(e) =>
                  mode
                    ? setEdit({ ...edit, name: e.target.value })
                    : setData({ ...data, name: e.target.value })
                   
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="schoolPlace">Place of the School</label>
              <input
                type="text"
                className="form-control"
                id="schoolPlace"
                name="schoolPlace"
                value={mode ? edit.place : data.place}
                required
                onChange={(e) =>
                  mode
                    ? setEdit({ ...edit, place: e.target.value })
                    : setData({ ...data, place: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="schoolState">State</label>
              <input
                type="text"
                className="form-control"
                id="schoolState"
                name="schoolState"
                value={mode ? edit.state : data.state}
                required
                onChange={(e) =>
                  mode
                    ? setEdit({ ...edit, state: e.target.value })
                    : setData({ ...data, state: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="schoolDistrict">District</label>
              <input
                type="text"
                className="form-control"
                id="schoolDistrict"
                name="schoolDistrict"
                value={mode ? edit.district : data.district}
                required
                onChange={(e) =>
                  mode
                    ? setEdit({ ...edit, district: e.target.value })
                    : setData({ ...data, district: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="schoolDescription">Description</label>
              <textarea
                className="form-control"
                id="schoolDescription"
                name="schoolDescription"
                value={mode ? edit.description : data.description}
                onChange={(e) =>
                  mode
                    ? setEdit({ ...edit, description: e.target.value })
                    : setData({ ...data, description: e.target.value })
                }
              />
            </div>
            <div className="form-group text-center">
              <label htmlFor="schoolImage">School Image</label>
              {edit.image && <img style={{ width: '200px' }} src={`http://localhost:5000/icons/${edit.image}`} />}
              <input type="file" className="form-control-file" id="schoolImage" name="schoolImage" onChange={handleImageChange} />
            </div>
            <button type="submit" className="btn btn-primary btn-block" style={{ backgroundColor: '#007bff', border: 'none' }}>
              {mode ? 'Edit' : 'Add'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
