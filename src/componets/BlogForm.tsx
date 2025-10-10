// components/BlogForm.tsx
import React, { useState } from 'react';
import { createBlogs } from '../api/authService';
import { handleError } from '../utils/toastHandler';

interface BlogFormData {
  title: string;
  description: string;
  author: string;
  category: string;
  readTime: string;
  badge: string;
  image: File | null;
}

const BlogForm: React.FC = () => {
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    description: '',
    author: '',
    category: '',
    readTime: '',
    badge: '',
    image: null,
  });

  const [previewImage, setPreviewImage] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
      }));

      const reader = new FileReader();
      reader.onload = e => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  console.log(formData, 'formdata');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      alert('Please select an image before submitting');
      return;
    }

    try {
      setLoading(true);
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('author', formData.author);
      submitData.append('category', formData.category);
      submitData.append('readTime', formData.readTime);
      submitData.append('badge', formData.badge);
      submitData.append(
        'blogimage',
        'https://www.shutterstock.com/shutterstock/photos/1795123882/display_1500/stock-photo-young-handsome-man-with-beard-wearing-casual-sweater-and-glasses-over-blue-background-pointing-1795123882.jpg'
      );

      const response: any = await createBlogs(submitData);
      console.log(response, 'response');

      // alert(response.message || 'Blog created successfully!');

      setFormData({
        title: '',
        description: '',
        author: '',
        category: '',
        readTime: '',
        badge: '',
        image: null,
      });
      setPreviewImage('');
    } catch (err: any) {
      if (err.name === 'ZodError') {
        const fieldErrors: any = {};
        if (Array.isArray(err.issues)) {
          err.issues.forEach((issue: any) => {
            if (issue.path?.[0]) fieldErrors[issue.path[0]] = issue.message;
          });
        }
        console.log(fieldErrors);

        return;
      }

      handleError(err?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Blog Image *</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        {previewImage && (
          <div className="mt-4">
            <img src={previewImage} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Author *</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select Category</option>
            <option value="development">Development</option>
            <option value="design">Design</option>
            <option value="technology">Technology</option>
            <option value="self-improvement">Self Improvement</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Read Time *</label>
          <input
            type="text"
            name="readTime"
            value={formData.readTime}
            onChange={handleInputChange}
            placeholder="e.g., 5 min read"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Badge</label>
          <input
            type="text"
            name="badge"
            value={formData.badge}
            onChange={handleInputChange}
            placeholder="e.g., New, Popular"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
      >
        {loading ? 'Creating Blog...' : 'Create Blog'}
      </button>
    </form>
  );
};

export default BlogForm;
