import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

const EditBlog = () => {
    const { post_id } = useParams();
    const [blogData, setBlogData] = useState({ paragraphs: [] });
    const [contentValues, setContentValues] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_SERVER}/blog/getBlogDetails/?post_id=${post_id}`);
                setBlogData(response.data);
                setContentValues(response.data.paragraphs);
            } catch (error) {
                setError(error);
            }
        };

        fetchBlogDetails();
    }, [post_id]);

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedValues = [...contentValues];
        updatedValues[index] = { ...updatedValues[index], [name]: value };
        setContentValues(updatedValues);
    };

    const handleFileChange = (index, e) => {
        const file = e.target.files[0];
        const updatedValues = [...contentValues];
        updatedValues[index] = { ...updatedValues[index], image: file };
        setContentValues(updatedValues);
    };

    const handleSubmit = async (index, para_id, e) => {
        e.preventDefault();
        const formData = new FormData();
        const paraData = contentValues[index];

        formData.append('status', 'active');
        formData.append('content', paraData.content);
        formData.append('ad_field_product_name', paraData.ad_field_product_name);
        formData.append('ad_field_price', paraData.ad_field_price);
        formData.append('ad_field_model', paraData.ad_field_model);
        formData.append('ad_field_link', paraData.ad_field_link);
        formData.append('ad_field_image', paraData.ad_field_image);
        formData.append('sequence', paraData.sequence);
        formData.append('post_id', post_id); 
        formData.append('para_id', para_id);
        

        try {
            const response = await axios.post(import.meta.env.VITE_APP_SERVER + "/blog/addpara/", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error updating paragraph:", error);
        }
    };




  return (
    <div>
      <p>Edit blog {post_id} </p>

{blogData.paragraphs.map((para, index)=>(
 <form key={index} onSubmit={(e) => handleSubmit(index, para.id, e)} className='flex flex-col gap-y-5 lg:w-[50%] md:w-[80%] w-[90%] '>
 <input type='text' placeholder='Heading' name='ad_field_product_name' id='ad_field_product_name' onChange={(e) => handleChange(index, e)} value={contentValues[index]?.ad_field_product_name || ''}
 className='w-full rounded-[10px] h-[50px] bg-white border placeholder:text-[#535353] border-[#535353]  px-5 ' />
<div className='flex gap-x-5'>
 <input  id={`image-${index}`} name='image' type="file"  onChange={(e) => handleFileChange(index, e)}
 style={{ display: "none" }}/>
  <label htmlFor={`image-${index}`} className="w-[50%] flex justify-center items-center rounded-[10px] h-[50px] bg-white border cursor-pointer text-[#535353] border-[#535353] ">
  Upload image
  </label>

  <input name='ad_field_model' id='ad_field_model' type='text' onChange={(e) => handleChange(index, e)}  value={contentValues[index]?.ad_field_model || ''}
 placeholder='Model number' className='w-[50%] h-[50px] rounded-[10px] px-5 placeholder:text-[#535353] bg-white border border-[#535353] ' />
</div>


<div className='flex gap-x-5'>
 <input name='ad_field_price' id='ad_field_price' type='text' onChange={(e) => handleChange(index, e)}  value={contentValues[index]?.ad_field_price || ''}
 placeholder='Price' className='w-[50%] h-[50px] rounded-[10px] px-5 placeholder:text-[#535353] bg-white border border-[#535353] ' />
  <input name='ad_field_link' id='ad_field_link' type='text' onChange={(e) => handleChange(index, e)}  value={contentValues[index]?.ad_field_link || ''}
 placeholder='Link' className='w-[50%] h-[50px] rounded-[10px] px-5 placeholder:text-[#535353] bg-white border border-[#535353] ' />
</div>
<input name='sequence' id='sequence' type='text' onChange={(e) => handleChange(index, e)}  value={contentValues[index]?.sequence || ''}
 placeholder='sequence' className='w-[50%] h-[50px] rounded-[10px] px-5 placeholder:text-[#535353] bg-white border border-[#535353] ' />

<textarea placeholder='Content' name='content' id='content' onChange={(e) => handleChange(index, e)}  value={contentValues[index]?.content || ''}
 className='w-full rounded-[10px] h-[200px] bg-white border placeholder:text-[#535353] border-[#535353]  p-5 ' />

<div className='flex justify-center items-center mb-10'>
<button className='w-[30%] h-[50px] bg-gradient-to-r from-[#F05225] to-[#EEA820] text-white font-medium rounded-[10px] text-[18px] '>Submit</button>
</div>
</form>
))}

     
    </div>
  )
}

export default EditBlog
