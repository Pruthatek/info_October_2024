import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Editor = () => {
    const [blogCategory, setblogCategory] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selects, setselects] = useState();
    const [isSelectedTypeOfBlog, setIsSelectedTypeOfBlog] = useState("Select");
    const [category, setcategory] = useState("");

 
  const [postId, setPostId] = useState(null); // State to store the post ID

  useEffect(() => {
    const fetchcat = async () => {
      try {
        const responsecat = await axios.get(import.meta.env.VITE_APP_SERVER + "/blog/fetchcategory/");
        const fetchcategorydata = responsecat.data;
        console.log(fetchcategorydata)
        setblogCategory(fetchcategorydata);
      } catch (error) {
        console.log(error);
      }
    };
    fetchcat();
  }, []);

  const [blogValues, setBlogValues] = useState({ title: "", author: "", thumbnail: "", type: "", addToTop: "" });
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogValues({ ...blogValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', blogValues.title);
    formData.append('author', blogValues.author);
    formData.append('category', category);
    formData.append('thumbnail', blogValues.thumbnail);
    formData.append('add_to_top', blogValues.addToTop);

    try {
      const response = await axios.post(import.meta.env.VITE_APP_SERVER + "/blog/storepost/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = response.data;
      alert(JSON.stringify(data));
      setPostId(data.post_id); // Store the post ID
      setIsSubmit(true);
      setBlogValues({ title: "", author: "", thumbnail: null, type: "", addToTop: "" });
    } catch (error) {
      console.error('Error uploading the blog post:', error);
    }
  };

  const [contentValues, setContentValues] = useState({
    heading: "", image: "", model: "", price: "", link: "", content: "",  post_id: "", sequence: ""
  });

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setContentValues({ ...contentValues, [name]: value });
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('status', 'active');
    formData.append('content', contentValues.content);
    formData.append('ad_field_product_name', contentValues.heading);
    formData.append('ad_field_price', contentValues.price);
    formData.append('ad_field_model', contentValues.model);
    formData.append('ad_field_link', contentValues.link);
    formData.append('ad_field_image', contentValues.image);
    formData.append('sequence', contentValues.sequence);
    formData.append('post_id', postId); // Add post_id to form data

    try {
      const response = await axios.post(import.meta.env.VITE_APP_SERVER + "/blog/addpara/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form.');
    }

    setContentValues({
      heading: "", image: "", model: "", price: "", link: "", content: "", post_id: "", sequence: ""
    });
  };



  return (
<>
{!isSubmit &&  <div className='w-full flex flex-col justify-center items-center mt-20'>

<p className='text-[40px] text-[#f05225] font-semibold mb-10 '>Blog Upload</p>


<form onSubmit={handleSubmit} className='flex flex-col gap-y-5 lg:w-[50%] md:w-[80%] w-[90%] '>
   <input type='text' placeholder='Title of Blog' name='title' id='title' onChange={handleChange} value={blogValues.title} className='w-full rounded-[10px] h-[50px] bg-transparent  border placeholder:text-[#535353] dark:placeholder:text-[#ffffff] border-[#535353]  px-5 ' />
  <div className='flex gap-x-5'>
   <input id='thumbnail' name='thumbnail' type="file"  onChange={(e) => setBlogValues({ ...blogValues, thumbnail: e.target.files[0] })} style={{ display: "none" }}/>
    <label htmlFor='thumbnail' className="w-[50%] flex justify-center items-center rounded-[10px] h-[50px]  border cursor-pointer text-[#535353] dark:text-[#ffffff] border-[#535353] ">
    Upload thumbnail
    </label>

    
    <div className=" flex flex-col  w-full">
            <div
             onClick={() => setIsOpen((prev) => !prev)}
              className="w-full px-4 text-[#535353] border-[#535353] border rounded-[10px] h-[50px] flex items-center justify-between  text-lg tracking-wider duration-300"
            >
              <p className='text-[#535353] dark:text-white '>{isSelectedTypeOfBlog}</p>
              {!isOpen ? (
                <ExpandMoreIcon/>
                
              ) : (
                <ExpandLessIcon/>
              )}
            </div>
            {isOpen && (
              <div
                value={selects}
                onChange={(e) => setselects(e.target.value)}
                className="bg-white dark:bg-[#101010] mt-2 flex flex-col items-start rounded-lg p-2 w-full z-50"
              >
                {blogCategory.map((categoryItem, i) => (
                  <div
                    key={categoryItem.pk}
                    className="flex w-full p-4 justify-between dark:hover:bg-black hover:bg-slate-100 cursor-pointer rounded-lg"
                    onClick={() => {
                      setIsSelectedTypeOfBlog(
                        categoryItem.fields.category_title
                      );
                      setIsOpen((prev) => !prev);
                      setcategory(categoryItem.fields.category_title);
                    }}
                  >
                    <h3 className="font-bold">
                      {categoryItem.fields.category_title}
                    </h3>
                  </div>
                ))}
              </div>
            )}
          </div>
</div>

<div className='flex gap-x-4 items-center'>
  <p>Add to Top?</p>
    <div className='flex gap-x-2 items-center'>
    <label className='text-[18px] '>Yes</label><input type='radio' name='addToTop' id='yes' checked={blogValues.addToTop === 'True'} value="True" className='w-[18px] h-[18px] accent-[#f05225] bg-transparent'  onChange={handleChange}/>       
    </div>
<div className='flex gap-x-2 items-center'>
<label>No</label><input type='radio' name='addToTop' id='no' checked={blogValues.addToTop === 'False'} value="False"  className='w-[18px] h-[18px] accent-[#f05225]' onChange={handleChange}/>
</div>

</div>

<input type='text' placeholder='Author' name='author' id='author' onChange={handleChange} value={blogValues.author} className='w-[50%] rounded-[10px] h-[50px] bg-transparent border placeholder:text-[#535353] border-[#535353]  px-5 ' />



<div className='flex justify-center items-center mb-10'>
<button className='w-[30%] h-[50px] bg-gradient-to-r from-[#F05225] to-[#EEA820] text-white font-medium rounded-[10px] text-[18px] '>Submit</button>
</div>
</form>

</div>}

{isSubmit && <div className='w-full flex flex-col justify-center items-center mt-20'>

<p className='text-[40px] text-[#f05225] font-semibold mb-10 '>Blog Upload</p>

<form onSubmit={handleSubmit2} className='flex flex-col gap-y-5 lg:w-[50%] md:w-[80%] w-[90%] '>
   <input type='text' placeholder='Heading' name='heading' id='heading' onChange={handleChange2} value={contentValues.heading} className='w-full rounded-[10px] h-[50px] bg-white border placeholder:text-[#535353] border-[#535353]  px-5 ' />
  <div className='flex gap-x-5'>
   <input id='image' name='image' type="file"  onChange={(e) => setContentValues({ ...contentValues, image: e.target.files[0] })} style={{ display: "none" }}/>
    <label htmlFor='image' className="w-[50%] flex justify-center items-center rounded-[10px] h-[50px] bg-white border cursor-pointer text-[#535353] border-[#535353] ">
    Upload image
    </label>

    <input name='model' id='model' type='text' onChange={handleChange2} value={contentValues.model} placeholder='Model number' className='w-[50%] h-[50px] rounded-[10px] px-5 placeholder:text-[#535353] bg-white border border-[#535353] ' />
 </div>

 <div className='flex gap-x-5'>
   <input name='price' id='price' type='text' onChange={handleChange2} value={contentValues.price} placeholder='Price' className='w-[50%] h-[50px] rounded-[10px] px-5 placeholder:text-[#535353] bg-white border border-[#535353] ' />
    <input name='link' id='link' type='text' onChange={handleChange2} value={contentValues.link} placeholder='Link' className='w-[50%] h-[50px] rounded-[10px] px-5 placeholder:text-[#535353] bg-white border border-[#535353] ' />
 </div>
 <input name='sequence' id='sequence' type='text' onChange={handleChange2} value={contentValues.sequence} placeholder='sequence' className='w-[50%] h-[50px] rounded-[10px] px-5 placeholder:text-[#535353] bg-white border border-[#535353] ' />

 <textarea placeholder='Content' name='content' id='content' onChange={handleChange2} value={contentValues.content} className='w-full rounded-[10px] h-[200px] bg-white border placeholder:text-[#535353] border-[#535353]  p-5 ' />

<div className='flex justify-center items-center mb-10'>
<button className='w-[30%] h-[50px] bg-gradient-to-r from-[#F05225] to-[#EEA820] text-white font-medium rounded-[10px] text-[18px] '>Submit</button>
</div>
</form>

</div>}

</>

    
  )
}

export default Editor
