import React, { useEffect, useState } from "react";
import "./table.scss";
import axios from "axios";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import EditModal from "../EditModal/EditModal";
import AddCategoryModal from "../AddCategoryModal/AddCategoryModal";
import Pagination from "./Pagination"; // Paginatsiya komponentini import qilish

const Table = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1); // Hozirgi sahifa
  const [itemsPerPage] = useState(5); // Har bir sahifada ko'rsatiladigan elementlar soni

  const getCategories = async () => {
    try {
      const response = await axios.get(
        `https://autoapi.dezinfeksiyatashkent.uz/api/categories`
      );
      setCategories(response.data.data);
    } catch (error) {
      console.error("Kategoriyalarni olishda xatolik:", error);
      toast.error("Kategoriyalarni olishda xatolik yuz berdi.");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

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
      getCategories();
    } catch (error) {
      toast.error("Xatolik yuz berdi");
    }
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setEditModalOpen(true);
  };

  // Paginatsiya hisoblash
  const indexOfLastCategory = currentPage * itemsPerPage;
  const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
  const currentCategories = categories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  return (
    <div className="table-container">
      <div className="table_wrapper">
        <div className="table_top">
          <h3>Salom</h3>
          <button className="table_btn" onClick={() => setAddModalOpen(true)}>
            Add Categories
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>name_en</th>
              <th>name_ru</th>
              <th>Image</th>
              <th>Column 4</th>
              <th>Column 5</th>
              <th>Column 6</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentCategories.length ? (
              currentCategories.map((item) => (
                <tr key={item.id}>
                  <td>{item.name_en}</td>
                  <td>{item.name_ru}</td>
                  <td>
                    <img
                      width={100}
                      height={70}
                      src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`}
                      alt={item.name_en}
                    />
                  </td>
                  <td>Column 4 Data</td> {/* Qo'shimcha ustunlar */}
                  <td>Column 5 Data</td>
                  <td>Column 6 Data</td>
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
                <td colSpan="7">
                  <Loader />
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={categories.length}
          paginate={setCurrentPage}
          currentPage={currentPage}
        />
      </div>

      {isEditModalOpen && (
        <EditModal
          selectedCategory={selectedCategory}
          closeModal={() => setEditModalOpen(false)}
          refreshCategories={getCategories}
        />
      )}

      {isAddModalOpen && (
        <AddCategoryModal
          closeModal={() => setAddModalOpen(false)}
          refreshCategories={getCategories}
        />
      )}
    </div>
  );
};

export default Table;
