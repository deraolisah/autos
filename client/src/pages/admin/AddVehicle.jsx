import React, { useState } from "react";
import axios from "axios";

const AddVehicle = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    year: "",
    listed: true,
    vehicleType: "",
    condition: "",
    images: [],
    fuelType: "",
  });

  const API_URL = import.meta.env.VITE_API_URL;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!formData.name || !formData.description || !formData.price) {
        setError("Vehicle name, description and price are required fields!");
        alert("Vehicle name, description and price are required fields!");
        return;
      }

      const response = await axios.post(
        `${API_URL}/api/vehicles/add`,
        {
          name: formData.name,
          description: formData.description,
          price: formData.price,
          year: formData.year,
          listed: formData.listed,
          vehicleType: formData.vehicleType,
          condition: formData.condition,
          images: formData.images,
          fuelType: formData.fuelType,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        alert("New Vehicle Added!");
      } else {
        throw new Error("Failed to add new vehicle");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="name">Vehicle Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleOnChange}
            className="bg-light-alt/60 rounded-md text-base px-3 p-1 border border-light-alt"
            required
            placeholder="Vehicle name here"
          />
        </div>

        <div>
          <label htmlFor="description">Vehicle Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleOnChange}
            className="bg-light-alt/60 rounded-md text-base px-3 p-1 border border-light-alt"
            required
            placeholder="Vehicle description here"
          />
        </div>

        <div>
          <label htmlFor="price">Vehicle Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleOnChange}
            className="bg-light-alt/60 rounded-md text-base px-3 p-1 border border-light-alt"
            required
            placeholder="Vehicle price here"
          />
        </div>


        <div>
          <label htmlFor="year">Vehicle Year</label>
          <input
            type="text"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleOnChange}
            className="bg-light-alt/60 rounded-md text-base px-3 p-1 border border-light-alt"
            required
            placeholder="Vehicle year here"
          />
        </div>

        <div>
          <label htmlFor="vehicleType">Vehicle Type</label>
          <select
            id="vehicleType"
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleOnChange}
            required
            className="bg-light-alt/60 rounded-md text-base px-3 p-1 border border-light-alt"
          >
            <option value="">Select type</option>
            <option value="Car">Car</option>
            <option value="Suv">Suv</option>
            <option value="Truck">Truck</option>
            <option value="Pick-up">Pick-up</option>
          </select>
        </div>

        <div>
          <label htmlFor="fuelType">Fuel Type</label>
          <select
            id="fuelType"
            name="fuelType"
            value={formData.fuelType}
            onChange={handleOnChange}
            required
            className="bg-light-alt/60 rounded-md text-base px-3 p-1 border border-light-alt"
          >
            <option value="">Select fuel</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div>
          <label htmlFor="condition">Condition</label>
          <select
            id="condition"
            name="condition"
            value={formData.condition}
            onChange={handleOnChange}
            required
            className="bg-light-alt/60 rounded-md text-base px-3 p-1 border border-light-alt"
          >
            <option value="">Select condition</option>
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn bg-blue-500 text-white rounded-md px-4 py-2"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </section>
  );
};

export default AddVehicle;