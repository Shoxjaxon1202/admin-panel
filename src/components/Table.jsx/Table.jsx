import React, { useEffect, useState } from "react";
import "./table.scss";
import axios from "axios";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import EditModal from "../EditModal/EditModal";
import AddCategoryModal from "../AddCategoryModal/AddCategoryModal";
import Pagination from "./Pagination"; // Paginatsiya komponentini import qilish
import { useLocation } from "react-router-dom";

const Table = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const locations = useLocation().pathname;

  const [currentPage, setCurrentPage] = useState(1); // Hozirgi sahifa
  const [itemsPerPage] = useState(5); // Har bir sahifada ko'rsatiladigan elementlar soni

  const getApi = async () => {
    try {
      const response = await axios.get(
        `https://autoapi.dezinfeksiyatashkent.uz/api/${locations}`
      );
      setCategories(response.data.data);
    } catch (error) {
      toast.error("Get qilishda xatolik yuzaga keldi");
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  const deleteCategories = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `https://autoapi.dezinfeksiyatashkent.uz/api/${locations}/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(response.data.message);
      getApi();
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
  console.log(categories);

  return (
    <div className="table-container">
      <div className="table_wrapper">
        <div className="table_top">
          <h3>{locations.slice(1).toUpperCase()}</h3>
          <button className="table_btn" onClick={() => setAddModalOpen(true)}>
            Add Categories
          </button>
        </div>
        <table>
          <thead>
            {locations === "/categories" ? (
              <tr>
                <th>Name(English)</th>
                <th>Name(Russian)</th>
                <th>Image</th>
                <th>Created at</th>
                <th>Action</th>
              </tr>
            ) : locations === "/brands" ? (
              <tr>
                <th>Model</th>
                <th>Image</th>
                <th>Created at</th>
                <th>Action</th>
              </tr>
            ) : locations === "/models" ? (
              <tr>
                <th>Name</th>
                <th>Brand</th>
                <th>Action</th>
              </tr>
            ) : locations === "/cities" || locations === "/locations" ? (
              <tr>
                <th>Name</th>
                <th>Text</th>
                <th>Images</th>
                <th>Action</th>
              </tr>
            ) : locations === "/cars" ? (
              <tr>
                <th>Brand</th>
                <th>Model</th>
                <th>Color</th>  
                <th>City</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            ) : null}
          </thead>
          <tbody>
            {locations == "/categories" ? (
              currentCategories.length ? (
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
                    <td>{item.created_at}</td>
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
              )
            ) : locations === "/brands" ? (
              currentCategories.length ? (
                currentCategories.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>
                      <img
                        width={100}
                        height={70}
                        src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`}
                        alt={item.name_en}
                      />
                    </td>
                    <td>{item.created_at}</td>
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
              )
            ) : locations === "/models" ? (
              currentCategories.length ? (
                currentCategories.map((item) => (
                  <tr key={item.id}>
                    <td>{item?.name}</td>
                    <td>{item?.brand_title}</td>
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
              )
            ) : locations === "/cities" || locations === "/locations" ? (
              currentCategories.length ? (
                currentCategories.map((item) => (
                  <tr key={item.id}>
                    <td>{item?.name}</td>
                    <td>{item?.text}</td>
                    <td>
                      <img
                        width={100}
                        height={70}
                        src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`}
                        alt={item.name_en}
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
                  <td colSpan="7">
                    <Loader />
                  </td>
                </tr>
              )
            ) : locations === "/cars" ? (
              currentCategories.length ? (
                currentCategories.map((item) => (
                  <tr key={item.id}>
                    <td>{item?.brand?.title}</td>
                    <td>{item?.model?.name}</td>
                    <td>{item?.color}</td>
                    <td>{item?.city?.name}</td>
                    <td>
                      {item?.location?.name}
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
                  <td colSpan="7">
                    <Loader />
                  </td>
                </tr>
              )
            ) : null}
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
          refreshCategories={getApi}
        />
      )}

      {isAddModalOpen && (
        <AddCategoryModal
          closeModal={() => setAddModalOpen(false)}
          refreshCategories={getApi}
        />
      )}
    </div>
  );
};

export default Table;
