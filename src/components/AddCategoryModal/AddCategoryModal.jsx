import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddCategoryModal = ({ closeModal, refreshCategories }) => {
  const [formData, setFormData] = useState({
    name_en: "",
    name_ru: "",
    image_src: null,
  });

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "image_src" ? files[0] : value,
    }));
  };

  const handleAddCategory = async () => {
    const token = localStorage.getItem("token");

    // Formani tekshirish
    if (!formData.name_en || !formData.name_ru || !formData.image_src) {
      toast.error("Iltimos, barcha maydonlarni to'ldiring.");
      return; // Formani yuborishdan oldin to'ldirilganligini tekshirish
    }

    const addData = new FormData();
    addData.append("name_en", formData.name_en);
    addData.append("name_ru", formData.name_ru);
    addData.append("images", formData.image_src); // Bu yerda image_src har doim mavjud bo'ladi

    try {
      const response = await axios.post(
        `https://autoapi.dezinfeksiyatashkent.uz/api/categories`,
        addData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.data?.success) {
        toast.success(response.data.message);
        refreshCategories();
        closeModal();
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      console.error("Kategoriya qo'shishda xatolik:", error);
      toast.error("Kategoriya qo'shishda xatolik yuz berdi.");
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={closeModal}>
          &times;
        </button>
        <h2>Add Category</h2>
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
        <button onClick={handleAddCategory}>Add</button>
      </div>
    </div>
  );
};

export default AddCategoryModal;
