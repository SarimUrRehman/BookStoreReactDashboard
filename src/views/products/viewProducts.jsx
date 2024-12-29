import React, { useEffect, useState } from 'react';
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
} from '@coreui/react';
import { db } from '../../firebaseConfig/firebase';
import { collection, getDocs } from 'firebase/firestore';

const ViewProducts = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (productId) => {
    alert(`Edit product with ID: ${productId}`);
    // Edit logic here
  };

  const handleDelete = async (productId) => {
    alert(`Delete product with ID: ${productId}`);
    // Delete logic here
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Product List</strong>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>Product Name</CTableHeaderCell>
                  <CTableHeaderCell>Price</CTableHeaderCell>
                  <CTableHeaderCell>Description</CTableHeaderCell>
                  <CTableHeaderCell>Image</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {products.length > 0 ? (
                  products.map((product, index) => (
                    <CTableRow key={product.id}>
                      <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{product.productName}</CTableDataCell>
                      <CTableDataCell>{product.productPrice}</CTableDataCell>
                      <CTableDataCell>{product.productDescription}</CTableDataCell>
                      <CTableDataCell>
                        {product.productImage ? (
                          <img
                            src={product.productImage}
                            alt="Product"
                            style={{ width: '50px' }}
                          />
                        ) : (
                          'No Image'
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="info"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEdit(product.id)}
                        >
                          Edit
                        </CButton>
                        <CButton
                          color="danger"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan={6} className="text-center">
                      No Products Found
                    </CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ViewProducts;
