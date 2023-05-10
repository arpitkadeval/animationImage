import React from "react";
// import ImageUploader from "./view/ImageUploader/BackgroundRemover.js";

import "./App.css";

const App = () => {
  const pic =
    "https://elala.matoresell.com/images/experience_images_thumb/experience_images_5408231672224329.jpg";
  // https://codepen.io/hexagoncircle/pen/XWbWKwL
  return (
    <>
      <div className="padding">
        <div className="image-grid">
          <div className="image-grid-item image-item animate__animated animate__fade animate__animated animate__fadeInIn">
            <img
              src={pic}
              alt="NoImg"
              animate__animated
              animate__flipInX
              className="image-item"
            />
          </div>
          <div className="image-grid-item">
            <img src={pic} alt="NoImg" className="image-item" />
          </div>
          <div className="image-grid-item animate__animated animate__zoomIn">
            <img src={pic} alt="NoImg" className="image-item" />
          </div>
          <div className="image-grid-item animate__animated animate__fadeInDown">
            <img src={pic} alt="NoImg" className="image-item" />
          </div>
          <div className="image-grid-item animate__animated animate__slideInLeft">
            <img src={pic} alt="NoImg" className="image-item" />
          </div>
          <div className="image-grid-item animate__animated animate__bounceIn">
            <img src={pic} alt="NoImg" className="image-item" />
          </div>
          <div className="image-grid-item animate__animated animate__rotateIn">
            <img src={pic} alt="NoImg" className="image-item" />
          </div>
          <div className="image-grid-item animate__animated animate__flipIn">
            <img src={pic} alt="NoImg" className="image-item" />
          </div>
          <div className="image-grid-item animate__animated animate__swingIn">
            <img src={pic} alt="NoImg" className="image-item" />
          </div>
          <div className="image-grid-item animate__animated animate__pulse">
            <img src={pic} alt="NoImg" className="image-item" />
          </div>
          <div className="image-grid-item animate__animated animate__flash">
            <img src={pic} alt="NoImg" className="image-item" />
          </div>
          <div className="image-grid-item animate__animated animate__shake">
            <img src={pic} alt="NoImg" className="image-item" />
          </div>
          <div className="image-grid-item animate__animated animate__flipInX">
            <img src={pic} alt="NoImg" className="image-item" />
          </div>
        </div>
      </div>

      {/* <div> <ImageUploader /> </div>); */}
    </>
  );
};

export default App;
