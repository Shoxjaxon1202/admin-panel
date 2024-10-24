import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./modal.scss";

const EditModal = ({ selectedCategory, closeModal, refreshCategories }) => {
  // Dastlabki state (formData) ichida rasm uchun 'image_src' null qiymat bilan boshlanadi
  const [formData, setFormData] = useState({
    name_en: selectedCategory.name_en,
    name_ru: selectedCategory.name_ru,
    image_src: null, // Rasm uchun joy ajratilgan, dastlab hech qanday rasm tanlanmagan
  });
  
  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "image_src" ? files[0] : value,
    }));
  };
  // Yangilash funksiyasi
  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    const updateData = new FormData();

    updateData.append("name_en", formData.name_en);
    updateData.append("name_ru", formData.name_ru);

    if (formData.image_src) {
      updateData.append("images", formData.image_src);
    }

    try {
      const response = await axios.put(
        `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${selectedCategory.id}`,
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
      console.error("Yangilashda xatolik:", error);
      toast.error("Yangilashda xatolik yuz berdi.");
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={closeModal}>
          &times;
        </button>
        <h2>Edit Category</h2>
        <input
          required
          type="text"
          name="name_en"
          value={formData.name_en}
          onChange={handleFormChange}
          placeholder="English Name"
        />
        <input
          required
          type="text"
          name="name_ru"
          value={formData.name_ru}
          onChange={handleFormChange}
          placeholder="Russian Name"
        />
        <input
          required
          type="file"
          name="image_src"
          onChange={handleFormChange}
        />
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
};

export default EditModal;
