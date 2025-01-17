import React, { useState } from 'react';
import './AddSpecials.css';
import { assets, url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddSpecials = () => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Special"
    });

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!image) {
            toast.error('Image not selected');
            return null;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);
        formData.append("isSpecial", true); // Add this line to mark it as a special item

        try {
            const response = await axios.post(`${url}/api/food/add`, formData);
            if (response.data.success) {
                toast.success(response.data.message);
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Special"
                });
                setImage(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Error adding special item");
            console.error("Error:", error);
        }
    };

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    return (
        <div className='add-specials'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-img-upload flex-col'>
                    <p>Upload image</p>
                    <input onChange={(e) => { setImage(e.target.files[0]); e.target.value = ''; }} type="file" accept="image/*" id="image" hidden />
                    <label htmlFor="image">
                        <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
                    </label>
                </div>
                <div className='add-product-name flex-col'>
                    <p>Special Name</p>
                    <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Type here' required />
                </div>
                <div className='add-product-description flex-col'>
                    <p>Special Description</p>
                    <textarea name='description' onChange={onChangeHandler} value={data.description} type="text" rows={6} placeholder='Write content here' required />
                </div>
                <div className='add-category-price'>
                    <div className='add-category flex-col'>
                        <p>Special Category</p>
                        <select name='category' onChange={onChangeHandler} value={data.category}>
                            <option value="Special Salad">Special Salad</option>
                            <option value="Special Rolls">Special Rolls</option>
                            <option value="Special Deserts">Special Deserts</option>
                            <option value="Special Sandwich">Special Sandwich</option>
                            <option value="Special Cake">Special Cake</option>
                            <option value="Special Pasta">Special Pasta</option>
                            <option value="Special Noodles">Special Noodles</option>
                        </select>
                    </div>
                    <div className='add-price flex-col'>
                        <p>Special Price</p>
                        <input type="Number" name='price' onChange={onChangeHandler} value={data.price} placeholder='25' required />
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD SPECIAL</button>
            </form>
        </div>
    );
};

export default AddSpecials;