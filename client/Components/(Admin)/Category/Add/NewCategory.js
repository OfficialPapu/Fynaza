"use client"
import { useState } from 'react';
import { Folder, ImageIcon, Upload } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/Components/ui/select';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import axios from "@/lib/axios";
import { useSnackbar } from 'notistack';
const AddCategoryForm = () => {
    const { enqueueSnackbar: ShowNotification } = useSnackbar();
    const [formData, setFormData] = useState({
        Category: '',
        Attribute: '',
        Image: null,
    });
    const [ImagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSelectChange = (value) => {
        setFormData({ ...formData, Category: value });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, Image: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const resetForm = () => {
        setFormData({
            Category: '',
            Attribute: '',
            Image: null,
        });
        setImagePreview(null);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post('api/categories/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.success) {
                resetForm();
                ShowNotification('Category added successfully', { variant: 'success' });
            } else {
                ShowNotification('Failed to create Category.', { variant: 'error' });
            }
            const result = response.data;
        } catch (error) {
            ShowNotification('Failed to create Category.', { variant: 'error' });
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center p-4 bg-gray-50">
            <div className="bg-white rounded-xl shadow-sm w-full max-w-2xl p-6 sm:p-8 border border-gray-100">
                <div className="flex items-center space-x-4 mb-8">
                    <Folder className="h-10 w-10 text-blue-500 mr-4" />
                    <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">Add New Category</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <label htmlFor="Category" className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <Select onValueChange={handleSelectChange} value={formData.Category}>
                            <SelectTrigger className="w-full border-gray-200 focus:ring-blue-500  transition-all">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Jewellery">Jewellery</SelectItem>
                                <SelectItem value="Brand">Brand</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label htmlFor="Attribute" className="block text-sm font-medium text-gray-700 mb-2">Category Attribute</label>
                        <Input
                            id="Attribute"
                            name="Attribute"
                            value={formData.Attribute}
                            onChange={handleInputChange}
                            placeholder="Enter category attribute"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="Image" className="block text-sm font-medium text-gray-700 mb-2">Category Image</label>
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-blue-300 transition-colors duration-200 bg-gray-50">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                id="Image-upload"
                            />
                            <label htmlFor="Image-upload" className="cursor-pointer flex flex-col items-center space-y-3">
                                {ImagePreview ? (
                                    <img src={ImagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-lg mb-2" />
                                ) : (
                                    <ImageIcon className="w-10 h-10 text-gray-400" />
                                )}
                                <span className="text-sm text-gray-600">
                                    <span className="text-blue-500 font-medium">Click to upload</span> or drag and drop
                                </span>
                                <span className="text-xs text-gray-400">PNG, JPG, or JPEG (max. 5MB)</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full sm:w-auto bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                        >
                            {isLoading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Adding...
                                </span>
                            ) : (
                                <>
                                    <Upload className="mr-2 h-4 w-4" /> Add Category
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCategoryForm;