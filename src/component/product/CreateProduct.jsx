import React, { useState } from 'react';
import ProductStore from '../Store/ProductStore';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

function CreateProduct(props) {

    const navigate = useNavigate()

    const {UpdateProductForm, UpdateFormChange, CreateProductRequest} = ProductStore()
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('https://www.testhouse.net/wp-content/uploads/2021/11/default-avatar.jpg');
    const [loading, setLoading] = useState(false)

    const OnSubmit = async (e) => {
        e.preventDefault();
        try{
            if (!UpdateProductForm.name || !UpdateProductForm.brand || !UpdateProductForm.category || !UpdateProductForm.description || !UpdateProductForm.price) {
                toast.error("Please fill in all the required fields.");
                return;
            }
            setLoading(true)

            const formData = new FormData()
            formData.append('image', imageFile);
            formData.append('name', UpdateProductForm.name);
            formData.append('brand', UpdateProductForm.brand);
            formData.append('category', UpdateProductForm.category);
            formData.append('description', UpdateProductForm.description);
            formData.append('price', UpdateProductForm.price);
            
            let res = await CreateProductRequest(formData)
            if (res) {
                toast.success("Product create successfully");
                navigate('/')
                console.log(formData)
            } else {
                toast.error("Failed to create product");
            }
        }catch(e){
            console.error("Error Create product:", e);
            toast.error("Failed to Create product");
        }finally{
            setLoading(false)

        }
    }

    

    return (
        <div>
        <div className='container-fluid'>
          <div className='container mx-auto my-5'>
             <h2 className='text-3xl font-bold text-center my-10'>Create Product</h2>
             <div className='card shadow-sm p-4 bg-white'>
                     <div className='grid lg:grid-cols-2 gap-4 sm:grid-cols-1'>
                        <div className='image flex flex-col items-center'>
                            <label htmlFor='imageInput'>
                                <img src={imageFile ? URL.createObjectURL(imageFile) : imageUrl} className='w-60 rounded-2xl align-center cursor-pointer my-3 hover:opacity-75 transition-all' alt='Profile' />
                            </label>
                            <input id='imageInput' type='file' accept='image/*' className='hidden' onChange={(e) => setImageFile(e.target.files[0])}
                                    />
                                
                        </div>


                         <div className="mb-5">
                             <label for="name" className="block mb-2 text-gray-900">Name</label>
                             <input type="text" id="name" className="0 w-full py-2 px-1 border-2 text-gray-900 text-sm rounded-lg " onChange={(e) => {UpdateFormChange('name', e.target.value)}} value={UpdateProductForm.name}   placeholder="Name" required />

                             <div className="my-10">
                                 <label for="brand" className="block mb-2 text-gray-900">Brand</label>
                                 <input type="text" id="brand" className="0 w-full py-2 px-1 border-2 text-gray-900 text-sm rounded-lg " onChange={(e) => {UpdateFormChange('brand', e.target.value)}}  placeholder="Brand" value={UpdateProductForm.brand}  required />
                             </div>
                         </div>
                         <div className="mb-5">
                             <label for="category" className="block mb-2 text-gray-900">Category</label>
                             <input type="text" id="category" className="0 w-full py-2 px-1 border-2 text-gray-900 text-sm rounded-lg "  placeholder="Category" value={UpdateProductForm.category} onChange={(e) => {UpdateFormChange('category', e.target.value)}}  required />
                         </div>
                         <div className="mb-5">
                             <label for="desc" className="block mb-2 text-gray-900">Description</label>
                             <input type="text" id="desc" className="0 w-full py-2 px-1 border-2 text-gray-900 text-sm rounded-lg "  placeholder="Description" value={UpdateProductForm.description} onChange={(e) => {UpdateFormChange('description', e.target.value)}}  required />
                         </div>
                         <div className="mb-5">
                             <label for="price" className="block mb-2 text-gray-900">Price</label>
                             <input type="text" id="price" className="0 w-full py-2 px-1 border-2 text-gray-900 text-sm rounded-lg " value={UpdateProductForm.price}  placeholder="Price" onChange={(e) => {UpdateFormChange('price', e.target.value)}} required />
                         </div>
                         <div className='mb-5 flex items-center'>
                            {
                                loading?( 
                                    <button className='btn  w-full ' disabled>Creating... <span className="loading loading-dots loading-md"></span></button>
                                    ):( 
                                        <button onClick={(e) => OnSubmit(e)} className='btn bg-yellow-500 hover:bg-yellow-600 w-full '>Create</button>
                                    )
                            }
                            
                         </div>
                     </div>
             </div>
          </div>
        </div> 
     </div>
    );
}

export default CreateProduct;