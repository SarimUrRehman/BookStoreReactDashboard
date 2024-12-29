import React, { useRef, useState, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CFormSelect,
  CRow,
} from '@coreui/react';
import { db } from '../../firebaseConfig/firebase';
import { collection , addDoc , getDoc } from 'firebase/firestore';
import AddCategory from '../category/addCategory';

const AddProducts = () => {
  const nameRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const imageRef = useRef();
  const [categories, setCategories] = useState([]);

  // Fetch categories from Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesCollection = collection(db, 'categories');
      const categorySnapshot = await getDocs(categoriesCollection);
      const categoryList = categorySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoryList);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productName = nameRef.current.value;
    const productPrice = priceRef.current.value;
    const productCategory = categoryRef.current.value;
    const productDescription = descriptionRef.current.value;
    const productImageFile = imageRef.current.files[0];

    if (!productName || !productPrice || !productCategory || !productDescription || !productImageFile) {
      alert('Please fill out all fields!');
      return;
    }

    try {
      // Convert image to Base64
      const reader = new FileReader();
      reader.onload = async () => {
        const productImage = reader.result;

        // Save product data to Firestore
        const productsCollection = collection(db, 'products');
        await addDoc(productsCollection, {
          productName,
          productPrice,
          productDescription,
          productCategory,
          productImage,
        });

        alert('Product added successfully!');
        // Clear form fields
        nameRef.current.value = '';
        priceRef.current.value = '';
        categoryRef.current.value = '';
        descriptionRef.current.value = '';
        imageRef.current.value = '';
      };
      reader.readAsDataURL(productImageFile);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Products</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="productName">Product Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="productName"
                  placeholder="Enter product name"
                  ref={nameRef}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="productPrice">Product Price</CFormLabel>
                <CFormInput
                  type="number"
                  id="productPrice"
                  placeholder="Enter product price"
                  ref={priceRef}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="productCategory">Product Category</CFormLabel>
                <CFormSelect id="productCategory" ref={categoryRef} required>
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.categoryName}>
                      {category.categoryName}
                    </option>
                  ))}
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="productDescription">Product Description</CFormLabel>
                <CFormTextarea
                  id="productDescription"
                  rows={3}
                  placeholder="Enter product description"
                  ref={descriptionRef}
                  required
                ></CFormTextarea>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="productImage">Product Image</CFormLabel>
                <CFormInput
                  type="file"
                  id="productImage"
                  accept="image/*"
                  ref={imageRef}
                  required
                />
              </div>
              <CButton type="submit" color="primary">
                Submit
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default AddProducts;
