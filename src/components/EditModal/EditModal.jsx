import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./modal.scss";
import { useLocation } from "react-router-dom";
import EditCarModal from "./EditCarModal";

const EditModal = ({ selectedCategory, closeModal, refreshCategories }) => {
  const location = useLocation().pathname;
  const isCategory = location === "/categories";
  const isModel = location === "/models";
  const isBrand = location === "/brands";
  const isCities = location === "/cities";
  const isLocations = location === "/locations";

  const [formData, setFormData] = useState({
    title: selectedCategory?.name_en || selectedCategory?.name || "",
    name_ru: isCategory
      ? selectedCategory?.name_ru || ""
      : isCities || isLocations
      ? selectedCategory?.text || ""
      : "",
    brand_id: isModel ? selectedCategory?.brand_id || "" : "", // Brand ID for models
    image: null,
  });

  const [brands, setBrands] = useState([]); // Brand list for selection
  const carId = selectedCategory?.id; // carId aniqlanmoqda

  // Fetch brands list for models when the modal loads
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(
          "https://autoapi.dezinfeksiyatashkent.uz/api/brands"
        );
        setBrands(response?.data?.data || []);
      } catch (error) {
        toast.error("Brendlarni olishda xatolik yuzaga keldi.");
      }
    };
    if (isModel) fetchBrands();
  }, [isModel]);

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    const updateData = new FormData();

    if (isModel) {
      updateData.append("name", formData.title);
      updateData.append("brand_id", formData.brand_id); // Selected brand ID for models
    } else if (isCities || isLocations) {
      updateData.append("name", formData.title);
      updateData.append("text", formData.name_ru);
      updateData.append("images", formData.image);
    } else {
      updateData.append(isCategory ? "name_en" : "title", formData.title);
      if (isCategory) updateData.append("name_ru", formData.name_ru);
      if ((isCategory || isBrand) && formData.image) {
        updateData.append("images", formData.image);
      }
    }

    try {
      const response = await axios.put(
        `https://autoapi.dezinfeksiyatashkent.uz/api/${
          isCategory
            ? "categories"
            : isModel
            ? "models"
            : isBrand
            ? "brands"
            : isCities
            ? "cities"
            : isLocations
            ? "locations"
            : null
        }/${selectedCategory.id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        refreshCategories();
        closeModal();
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      console.error("Error during update:", error);
      toast.error("Yangilashda xatolik yuz berdi.");
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      {location !== "/cars" ? (
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-modal" onClick={closeModal}>
            &times;
          </button>
          <h2>
            {isCategory
              ? "Edit Category"
              : isModel
              ? "Edit Model"
              : "Edit Brand"}
          </h2>
          <input
            required
            type="text"
            name="title"
            value={formData.title}
            onChange={handleFormChange}
            placeholder={
              isCategory ? "English Name" : isModel ? "Model Name" : "Title"
            }
          />
          {isCategory && (
            <input
              required
              type="text"
              name="name_ru"
              value={formData.name_ru}
              onChange={handleFormChange}
              placeholder="Russian Name"
            />
          )}
          {isModel && (
            <select
              name="brand_id"
              value={formData.brand_id}
              onChange={handleFormChange}
              required>
              <option value="" disabled>
                Select Brand
              </option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.title}
                </option>
              ))}
            </select>
          )}
          {(isCities || isLocations) && (
            <input
              required
              type="text"
              name="name_ru"
              value={formData.name_ru}
              onChange={handleFormChange}
              placeholder="Text"
            />
          )}
          {(isCategory || isBrand || isCities || isLocations) && (
            <input
              type="file"
              name="image"
              onChange={handleFormChange}
              accept="image/*"
            />
          )}
          <button onClick={handleUpdate}>Update</button>
        </div>
      ) : (
        <EditCarModal
          carId={carId} // carId ni uzatamiz
          closeModal={closeModal}
          refreshCars={refreshCategories}
        />
      )}
    </div>
  );
};

export default EditModal;
