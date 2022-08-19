import ReactStars from "react-rating-stars-component";
import { useSelector, useDispatch } from "react-redux";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../modal";
import "./style.scss";
import { reviewProduct } from "../../store/productSlice";

function ProductList({ item }) {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [commentTitle, setCommentTitle] = useState("");
  const [commentBody, setCommentBody] = useState("");
  const [productReview, setProductReview] = useState(0);

  const { isLoading, error, msg } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleReview = () => {
    if (username && commentBody && commentTitle) {
      const review = {
        username,
        title: commentTitle,
        body: commentBody,
        review: productReview,
      };
      dispatch(reviewProduct({ review, productID: item._id }));
    }
  };

  console.log(item);
  useEffect(() => {
    if (msg) {
      const handleModal = setTimeout(() => {
        setShowModal(false);
      }, 3000);

      return () => clearTimeout(handleModal);
    }
  }, [msg]);

  return (
    <div className="order-item">
      <div className="product-image">
        <img src={item.productThumbnail} alt="product" />
      </div>
      <div className="product-name">
        <h4>{item.productName}</h4>
        <div className="details">
          <p className="detail">
            <span>Price:</span>${item.price}
          </p>
          <p className="detail">
            <span>Color:</span>
            {item.color}
          </p>
          <p className="detail">
            <span>Size:</span>
            {item.size}
          </p>
          <p className="detail">
            <span>Qty:</span>
            {item.qty}
          </p>
        </div>
      </div>
      <div className="more-details">
        <button className="review" onClick={() => setShowModal(true)}>
          Review
        </button>
        <Link to={`/product/${item._id}`}>details</Link>
      </div>
      {showModal && (
        <Modal closeModal={setShowModal}>
          <div className="review-container">
            {msg && <p className="msg">{msg}</p>}
            <div className="main-section">
              <h2>Add your review</h2>
            </div>
            <div className="review-star">
              <ReactStars
                count={5}
                onChange={(e) => setProductReview(e)}
                size={50}
                isHalf
                activeColor="#333"
                emptyIcon={<BsStar />}
                halfIcon={<BsStarHalf />}
                fullIcon={<BsStarFill />}
              />
            </div>
            <div className="add-comment">
              <label htmlFor="name">Name:</label>
              <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
              <label htmlFor="name">title:</label>
              <input type="text" value={commentTitle} onChange={({ target }) => setCommentTitle(target.value)} />
              <label htmlFor="name">comment:</label>
              <textarea value={commentBody} onChange={({ target }) => setCommentBody(target.value)} />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button className="global-btn" onClick={handleReview} disabled={isLoading}>
              submit
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ProductList;
