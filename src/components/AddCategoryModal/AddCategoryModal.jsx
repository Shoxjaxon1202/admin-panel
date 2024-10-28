import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const AddCategoryModal = ({ closeModal, refreshCategories }) => {
  const [formData, setFormData] = useState({
    name_en: "",
    name_ru: "",
    image_src: null,
  });

  const locations = useLocation().pathname;

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
    if (locations === "/categories") {
      if (!formData.name_en || !formData.name_ru || !formData.image_src) {
        toast.error("Iltimos, barcha maydonlarni to'ldiring.");
        return;
      }
    } else if (locations === "/brands") {
      if (!formData.name_en || !formData.image_src) {
        toast.error("Iltimos, barcha maydonlarni to'ldiring.");
        return;
      }
    } else if (locations === "/models") {
      if (!formData.name_en || !formData.name_ru) {
        toast.error("Iltimos, barcha maydonlarni to'ldiring.");
        return;
      }
    } else if (locations === "/cities" || locations === "/locations") {
      if (!formData.name_en && !formData.name_ru && formData.image_src) {
        toast.error("Iltimos, barcha maydonlarni to'ldiring.");
        return;
      }
    }

    const addData = new FormData();

    if (locations === "/categories") {
      addData.append("name_en", formData.name_en);
      addData.append("name_ru", formData.name_ru);
      addData.append("images", formData.image_src);
    } else if (locations === "/brands") {
      addData.append("title", formData.name_en);
      addData.append("images", formData.image_src);
    } else if (locations === "/cities" || locations === "/locations") {
      addData.append("name", formData.name_en);
      addData.append("images", formData.image_src);
      addData.append("text", formData.name_ru);
    } else if (locations === "/models") {
      addData.append("name", formData.name_en);
      addData.append("brand_id", formData.name_ru);

      try {
        const response = await axios.post(
          `https://autoapi.dezinfeksiyatashkent.uz/api/brands`,
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
        console.error("Model qo'shishda xatolik:", error);
        toast.error("Model qo'shishda xatolik yuz berdi.");
      }
      return;
    }

    try {
      const response = await axios.post(
        `https://autoapi.dezinfeksiyatashkent.uz/api/${locations}`,
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
      console.error("Element qo'shishda xatolik:", error);
      toast.error("Element qo'shishda xatolik yuz berdi.");
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={closeModal}>
          &times;
        </button>
        <h2>Add {locations}</h2>
        <input
          required
          type="text"
          name="name_en"
          value={formData.name_en}
          onChange={handleFormChange}
          placeholder={
            locations === "/categories"
              ? "English Name"
              : locations === "/brands"
              ? "Brand name"
              : locations === "/models"
              ? "Model name"
              : locations === "/cities" || locations === "/locations"
              ? "Name"
              : null
          }
        />
        {locations === "/categories" ||
        locations === "/models" ||
        locations === "/cities" ||
        locations === "/locations" ? (
          <input
            required
            type="text"
            name="name_ru"
            value={formData.name_ru}
            onChange={handleFormChange}
            placeholder={
              locations === "/categories"
                ? "Russian Name"
                : locations === "/brands"
                ? "Brand name"
                : locations === "/models"
                ? "Brand ID"
                : locations === "/cities" || locations === "/locations"
                ? "Text"
                : null
            }
          />
        ) : null}
        {locations !== "/models" ? (
          <input
            required
            type="file"
            name="image_src"
            onChange={handleFormChange}
          />
        ) : null}
        <button onClick={handleAddCategory}>Add</button>
      </div>
    </div>
  );
};

export default AddCategoryModal;
