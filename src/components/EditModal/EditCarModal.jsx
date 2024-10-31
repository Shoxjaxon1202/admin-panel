import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EditCarModal = ({ carId, closeModal, refreshCars }) => {
  const [formData, setFormData] = useState({
    brand_id: "",
    model_id: "",
    city_id: "",
    category_id: "",
    location_id: "",
    color: "",
    year: "",
    seconds: "",
    max_speed: "",
    max_people: "",
    transmission: "",
    drive_side: "",
    motor: "",
    limitperday: "",
    deposit: "",
    premium_protection: "",
    price_in_aed: "",
    price_in_usd: "",
    price_in_aed_sale: "",
    price_in_usd_sale: "",
    inclusive: false,
  });

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [cover, setCover] = useState(null);
  const [imageOne, setImageOne] = useState(null);
  const [imageTwo, setImageTwo] = useState(null);

  const handleeditCar = async () => {
    const token = localStorage.getItem("token");

    if (!formData.brand_id || !formData.model_id || !formData.city_id) {
      toast.error("Iltimos, barcha majburiy maydonlarni to'ldiring.");
      return;
    }

    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });

    if (cover) formDataToSubmit.append("cover", cover);
    if (imageOne) formDataToSubmit.append("images", imageOne);
    if (imageTwo) formDataToSubmit.append("images", imageTwo);

    try {
      const response = await axios.put(
        `https://autoapi.dezinfeksiyatashkent.uz/api/cars/${carId}`,
        formDataToSubmit,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response?.data?.success) {
        toast.success(response.data.message);
        refreshCars();
        closeModal();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Mashina yangilashda xatolik:", error);
      toast.error("Mashina yangilashda xatolik yuz berdi.");
    }
  };

  const handleFormChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (type === "file") {
      if (name === "cover") setCover(files[0]);
      if (name === "imageOne") setImageOne(files[0]);
      if (name === "imageTwo") setImageTwo(files[0]);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [
          brandsData,
          modelsData,
          citiesData,
          categoriesData,
          locationsData,
        ] = await Promise.all([
          axios.get(`https://autoapi.dezinfeksiyatashkent.uz/api/brands`),
          axios.get(`https://autoapi.dezinfeksiyatashkent.uz/api/models`),
          axios.get(`https://autoapi.dezinfeksiyatashkent.uz/api/cities`),
          axios.get(`https://autoapi.dezinfeksiyatashkent.uz/api/categories`),
          axios.get(`https://autoapi.dezinfeksiyatashkent.uz/api/locations`),
        ]);
        setBrands(brandsData.data.data);
        setModels(modelsData.data.data);
        setCities(citiesData.data.data);
        setCategories(categoriesData.data.data);
        setLocations(locationsData.data.data);
      } catch (error) {
        toast.error("Ma'lumotlarni olishda xatolik yuzaga keldi");
      }
    };
    fetchOptions();
  }, []);

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={closeModal}>
          &times;
        </button>
        <h2>Edit Car</h2>
        <select
          name="brand_id"
          value={formData.brand_id}
          onChange={handleFormChange}>
          <option value="">Select Brand</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.title}
            </option>
          ))}
        </select>
        <select
          name="model_id"
          value={formData.model_id}
          onChange={handleFormChange}>
          <option value="">Select Model</option>
          {models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.brand_title}
            </option>
          ))}
        </select>
        <select
          name="city_id"
          value={formData.city_id}
          onChange={handleFormChange}>
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleFormChange}>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name_en}
            </option>
          ))}
        </select>
        <select
          name="location_id"
          value={formData.location_id}
          onChange={handleFormChange}>
          <option value="">Select Location</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleFormChange}
          placeholder="Color"
        />
        <input
          type="text"
          name="year"
          value={formData.year}
          onChange={handleFormChange}
          placeholder="Year"
        />
        <input
          type="text"
          name="motor"
          value={formData.motor}
          onChange={handleFormChange}
          placeholder="Motor"
        />
        <input
          type="text"
          name="seconds"
          value={formData.seconds}
          onChange={handleFormChange}
          placeholder="Seconds"
        />
        <input
          type="text"
          name="max_speed"
          value={formData.max_speed}
          onChange={handleFormChange}
          placeholder="Max Speed"
        />
        <input
          type="text"
          name="max_people"
          value={formData.max_people}
          onChange={handleFormChange}
          placeholder="Max People"
        />
        <input
          type="text"
          name="transmission"
          value={formData.transmission}
          onChange={handleFormChange}
          placeholder="Transmission"
        />
        <input
          type="text"
          name="drive_side"
          value={formData.drive_side}
          onChange={handleFormChange}
          placeholder="Drive Side"
        />
        <input
          type="text"
          name="limitperday"
          value={formData.limitperday}
          onChange={handleFormChange}
          placeholder="Limit Per Day"
        />
        <input
          type="text"
          name="deposit"
          value={formData.deposit}
          onChange={handleFormChange}
          placeholder="Deposit"
        />
        <input
          type="text"
          name="premium_protection"
          value={formData.premium_protection}
          onChange={handleFormChange}
          placeholder="Premium Protection"
        />
        <input
          type="text"
          name="price_in_aed"
          value={formData.price_in_aed}
          onChange={handleFormChange}
          placeholder="Price In AED"
        />
        <input
          type="text"
          name="price_in_usd"
          value={formData.price_in_usd}
          onChange={handleFormChange}
          placeholder="Price In USD"
        />
        <input
          type="text"
          name="price_in_aed_sale"
          value={formData.price_in_aed_sale}
          onChange={handleFormChange}
          placeholder="Price In AED Sale"
        />
        <input
          type="text"
          name="price_in_usd_sale"
          value={formData.price_in_usd_sale}
          onChange={handleFormChange}
          placeholder="Price In USD Sale"
        />
        <label>
          <input
            type="checkbox"
            name="inclusive"
            checked={formData.inclusive}
            onChange={handleFormChange}
          />
          Inclusive
        </label>
        <input type="file" name="cover" onChange={handleFormChange} />
        <input type="file" name="imageOne" onChange={handleFormChange} />
        <input type="file" name="imageTwo" onChange={handleFormChange} />
        <button onClick={handleeditCar}>Edit Car</button>
      </div>
    </div>
  );
};

export default EditCarModal;
