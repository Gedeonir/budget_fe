import React, { useState } from 'react';
import axios from 'axios';

const ProfilePictureUploader = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);

            // Generate a preview of the image
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const uploadImage = async () => {
        if (!image) {
            alert('Please select an image first.');
            return;
        }

        setUploading(true);

        try {
            // Convert image to base64
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = async () => {
                const base64Image = reader.result;

                // Replace with the actual user ID
                const userId = sessionStorage.getItem('userId');

                // Send data to API
                const response = await axios.post(
                    `${process.env.BACKEND_URL}/users/upload-profile-picture`,
                    {
                        userId,
                        base64Image,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
                        },
                    }
                );

                alert('Profile picture uploaded successfully!');
                console.log('Updated User Data:', response.data);
            };
        } catch (err) {
            console.error('Error uploading profile picture:', err);
            alert('Failed to upload profile picture. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <h2>Upload Profile Picture</h2>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />
            {preview && (
                <div>
                    <h3>Preview:</h3>
                    <img
                        src={preview}
                        alt="Preview"
                        style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                    />
                </div>
            )}
            <button onClick={uploadImage} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
        </div>
    );
};

export default ProfilePictureUploader;
