import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react';
import { db } from '../../firebaseConfig/firebase';
import { collection, addDoc } from 'firebase/firestore';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName) {
      setError('Please enter a category name.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const categoriesCollection = collection(db, 'categories');
      await addDoc(categoriesCollection, { categoryName });

      setCategoryName(''); // Reset form
      alert('Category added successfully!');
    } catch (err) {
      console.error('Error adding category:', err);
      setError('Failed to add category.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Category</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="categoryName">Category Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="categoryName"
                  placeholder="Enter category name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-danger">{error}</p>}
              <CButton type="submit" color="primary" disabled={loading}>
                {loading ? 'Adding...' : 'Submit'}
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default AddCategory;
