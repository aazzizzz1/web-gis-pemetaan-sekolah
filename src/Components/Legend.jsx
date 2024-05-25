import React from "react";
import "./Legend.css";
import MarkerIconSD from "./../Assets/marker-sd.png";
import MarkerIconSMP from "./../Assets/marker-smp.png";
import MarkerIconSMA from "./../Assets/marker-sma.png";

const iconStyle = {
  width: "15px",
  height: "20px",
  marginRight: "10px", // Memberikan sedikit ruang antara ikon dan teks
};

const Legend = () => {
  return (
    <div className="legend">
      <h4 className="legend-label font-bold">Legenda</h4>
      <hr className="my-4 border-t-2 border-gray-300" />
      <div className="legend-item">
        <img src={MarkerIconSD} alt="SD" style={iconStyle} />
        <span>SD</span>
      </div>
      <div className="legend-item">
        <img src={MarkerIconSMP} alt="SMP" style={iconStyle} />
        <span>SMP</span>
      </div>
      <div className="legend-item">
        <img src={MarkerIconSMA} alt="SMA" style={iconStyle} />
        <span>SMA</span>
      </div>
      <div className="legend-item">
        <img
          src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png"
          alt="SMK"
          style={iconStyle}
        />
        <span>SMK</span>
      </div>
      <div className="legend-item">
        <div
          className="color-box"
          style={{
            backgroundColor: "#418bcc",
            width: "15px",
            height: "15px",
            marginRight: "5px",
            marginTop: "2px",
          }}
        ></div>
        <span>Kota Surabaya</span>
      </div>
    </div>
  );
};

export default Legend;
