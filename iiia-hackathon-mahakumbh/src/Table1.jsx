import React from 'react';

const Table = ({ data }) => {
  return (
    <table className="border-collapse border border-gray-400 w-full">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-400 px-4 py-2">Camera ID</th>
          <th className="border border-gray-400 px-4 py-2">Bicycle</th>
          <th className="border border-gray-400 px-4 py-2">Buses</th>
          <th className="border border-gray-400 px-4 py-2">Cars</th>
          <th className="border border-gray-400 px-4 py-2">Motorcycles</th>
          <th className="border border-gray-400 px-4 py-2">Trucks</th>
        </tr>
      </thead>
      <tbody>
        {data && Object.entries(data).map(([key, value]) => (
          <tr key={key}>
            <td className={`border border-gray-400 px-4 py-2 ${value.alertStatus === "Warn" ? "text-red-600 bg-red-100" : ""}`}>{key}</td>
            <td className={`border border-gray-400 px-4 py-2 ${value.alertStatus === "Warn" ? "text-red-600 bg-red-100" : ""}`}>{value.vehiclecount.bicycle}</td>
            <td className={`border border-gray-400 px-4 py-2 ${value.alertStatus === "Warn" ? "text-red-600 bg-red-100" : ""}`}>{value.vehiclecount.bus}</td>
            <td className={`border border-gray-400 px-4 py-2 ${value.alertStatus === "Warn" ? "text-red-600 bg-red-100" : ""}`}>{value.vehiclecount.car}</td>
            <td className={`border border-gray-400 px-4 py-2 ${value.alertStatus === "Warn" ? "text-red-600 bg-red-100" : ""}`}>{value.vehiclecount.motorcycle}</td>
            <td className={`border border-gray-400 px-4 py-2 ${value.alertStatus === "Warn" ? "text-red-600 bg-red-100" : ""}`}>{value.vehiclecount.truck}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
