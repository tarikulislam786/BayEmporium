import React, { useEffect, useState } from "react";
// import data from "../data";
import { Link } from "react-router-dom";
import $ from "jquery";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../actions/userActions";
import axios from "axios";
import {
  saveProduct,
  listProducts,
  deleteProduct,
} from "../actions/productActions";
function ProductsScreen(props) {
  // image upload
  var files = [];
  var file = {};
  //const [File, setFile] = useState({File:''});
  const [filem, setFile] = useState({});
  const handleUploadFileHandler = (e) => {
    // files = e.target.files;
    file = e.target.files[0];
    setFile(file);
    console.log("f obj ");
    console.log(file);
    // console.log(file);
    if (file) setImage(file.name);

    // showing image instant
    var changed = false;
    // window.alert("change image");
    let imagesPreview = function (input, placeToInsertImagePreview) {
      if (!changed) {
        if (input.files) {
          let filesAmount = input.files.length; //alert("file amount"+filesAmount)
          for (let i = 0; i < filesAmount; i++) {
            let reader = new FileReader();
            reader.onload = function (event) {
              $($.parseHTML("<img style='width:100%'>"))
                .attr("src", event.target.result)
                .appendTo(placeToInsertImagePreview);
            };
            reader.readAsDataURL(input.files[i]);
          }
          changed = true;
        }
      }
    };
    $("#input-files").on("change", function () {
      //alert("change?")
      $("div.preview-images").empty();
      imagesPreview(this, "div.preview-images");
    });
  };
  /* const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleEditClose = () => setShowEdit(false);
  const handleEditShow = photo => {
    setSelectedPhoto(photo);
    setShowEdit(true);
  };*/
  // image upload end
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const [uploading, setUploading] = useState(false);
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  //const [rating, setRating] = useState("");
  //const [numReviews, setNumReviews] = useState("");
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  const productSave = useSelector((state) => state.productSave);
  // onChangeHandler = (event) => {
  //   console.log(event.target.files[0]);
  // };

  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());
    return () => {};
  }, [successSave, successDelete]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDiscountRate(product.discountRate);
    setDescription(product.description);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    //   const file = e.target.files[0]; // file
    // console.log("any file ?")
    //  console.log(filem);
    dispatch(
      saveProduct({
        _id: id,
        name,
        image,
        brand,
        price,
        discountRate,
        category,
        countInStock,
        description,
      })
    );
    const bodyFormData = new FormData();
    bodyFormData.append("image", filem);
    setUploading(true);
    axios
      .post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };
  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id));
  };
  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>Products</h3>
        <button className="button primary" onClick={() => openModal({})}>
          Create Product
        </button>
      </div>
      <div className="product-list">
        <table style={{ margin: "0px auto" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Discount Rate</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.discountRate}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <button
                      className="button"
                      onClick={() => openModal(product)}
                    >
                      Edit
                    </button>{" "}
                    <button
                      onClick={() => deleteHandler(product)}
                      className="button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler} enctype="multipart/form-data">
            <ul className="form-container" style={{ width: "50rem" }}>
              <li style={{ marginBottom: "0px", marginTop: "0px" }}>
                <h2>Create Product</h2>
              </li>
              <li>
                <div
                  className="preview-images"
                  style={{ margin: "0px auto", width: "500px" }}
                >
                  {
                    (image)?<img src = "uploads/{{image}}" />:''
                  }
                </div>
                <label htmlFor="image">Image</label>

                <div
                  className="custom-file mb-3"
                  style={{ width: "50%", float: "right" }}
                >
                  <input
                    type="file"
                    // required
                    onClick={handleUploadFileHandler}
                    onChange={handleUploadFileHandler}
                    className="custom-file-input"
                    id="input-files"
                  ></input>
                  <label
                    for="file"
                    className="custom-file-label"
                    style={{ zIndex: "0" }}
                  >
                    Choose File
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={image}
                    id="image"
                    onChange={(e) => setImage(e.target.value)}
                  ></input>

                  {uploading && <div>Uploading ...</div>}
                </div>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>
              <li>
                <label htmlFor="name">Name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                />
              </li>
              <li>
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  name="price"
                  value={price}
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="price">Discount Rate</label>
                <input
                  type="text"
                  name="discountRate"
                  value={discountRate}
                  id="discountRate"
                  onChange={(e) => setDiscountRate(e.target.value)}
                ></input>
              </li>

              <li>
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={brand}
                  id="brand"
                  onChange={(e) => setBrand(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="countInStock">CountInStock</label>
                <input
                  type="text"
                  name="countInStock"
                  value={countInStock}
                  id="countInStock"
                  onChange={(e) => setCountInStock(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  name="category"
                  value={category}
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  value={description}
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </li>
              <li>
                <button type="submit" className="button primary">
                  {id ? "Update" : "Create"}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="button secondary"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}
    </div>
  );
}
export default ProductsScreen;
