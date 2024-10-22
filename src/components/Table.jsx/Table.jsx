import React, { useEffect, useState } from "react";
import "./table.scss"; // CSS faylingizni import qiling
import axios from "axios";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import "./modal.scss"; // Modal uslublari uchun CSS

const Table = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    name_en: "",
    name_ru: "",
    image_src: null,
  });
  const [isModalOpen, setModalOpen] = useState(false);

  // Kategoriyalarni olish
  const getCategories = async () => {
    try {
      const response = await axios.get(
        `https://autoapi.dezinfeksiyatashkent.uz/api/categories`
      );
      setCategories(response.data.data); // Xato bo'lmasligi uchun `response` ni to'g'ri o'qish
    } catch (error) {
      console.error("Kategoriyalarni olishda xatolik:", error);
      toast.error("Kategoriyalarni olishda xatolik yuz berdi.");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  // Kategoriyani o'chirish
  const deleteCategories = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(response.data.message);
      getCategories(); // O'chirgandan so'ng, yangilang
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error("Static kategoriya o'chirib bo'lmaydi");
      } else {
        toast.error("Xatolik yuz berdi");
      }
    }
  };

  // Kategoriyani tanlash va forma ma'lumotlarini o'rnatish
  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setFormData({
      name_en: category.name_en,
      name_ru: category.name_ru,
      image_src: null,
    });
    setModalOpen(true);
  };

  // Forma o'zgarishlari
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
      updateData.append("image_src", formData.image_src);
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
        getCategories();
        closeModal(); // Modalni yopish uchun `setModalOpen(false)` chaqirmaslik
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      console.error("Yangilashda xatolik:", error);
      toast.error("Yangilashda xatolik yuz berdi.");
    }
  };

  // Modalni yopish
  const closeModal = () => {
    setModalOpen(false);
    setSelectedCategory(null);
    setFormData({ name_en: "", name_ru: "", image_src: null }); // Modalni yopganda forma ma'lumotlarini tozalash
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>name_en</th>
            <th>name_ru</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.length ? (
            categories.map((item) => (
              <tr key={item.id}>
                <td>{item.name_en}</td>
                <td>{item.name_ru}</td>
                <td>
                  <img
                    width={100}
                    height={70}
                    src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`}
                    alt={item.name_en} // Alt tekstini qo'shish
                  />
                </td>
                <td>
                  <button
                    onClick={() => handleEditClick(item)}
                    className="table_button edit">
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCategories(item.id)}
                    className="table_button remove">
                    Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">
                <Loader />
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
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
      )}
    </div>
  );
};

export default Table;
