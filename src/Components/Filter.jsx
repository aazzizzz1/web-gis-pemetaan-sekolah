// src/components/Filter.js
import React from "react";
import "./Filter.css"; // Import file CSS untuk gaya kustom

const Filter = ({
  kecamatanOptions,
  bentukOptions,
  statusOptions,
  selectedKecamatan,
  setSelectedKecamatan,
  selectedBentuk,
  setSelectedBentuk,
  selectedStatus,
  setSelectedStatus,
}) => {
  return (
    <div className="filter-container flex flex-row sm:w-full">
      <div className="filter-section">
        <label className="filter-label">
          Kecamatan:
          <select
            className="filter-select"
            value={selectedKecamatan}
            onChange={(e) => setSelectedKecamatan(e.target.value)}
          >
            <option value="">Semua</option>
            {kecamatanOptions.map((kec, index) => (
              <option key={index} value={kec}>
                {kec}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="filter-section">
        <label className="filter-label">
          Tingkat Sekolah:
          <select
            className="filter-select"
            value={selectedBentuk}
            onChange={(e) => setSelectedBentuk(e.target.value)}
          >
            <option value="">Semua</option>
            {bentukOptions.map((bentuk, index) => (
              <option key={index} value={bentuk}>
                {bentuk}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="filter-section">
        <label className="filter-label">
          Status Sekolah:
          <select
            className="filter-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">Semua</option>
            {statusOptions.map((status, index) => (
              <option key={index} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default Filter;
