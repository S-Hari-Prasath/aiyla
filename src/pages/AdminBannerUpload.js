// import React, { useState } from "react";
// import { db, storage } from "../firebase";
// import { collection, addDoc } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import "../styles/AdminBannerUpload.css";

// const AdminBannerUpload = () => {
//   const [title, setTitle] = useState("");
//   const [targetCategoryId, setTargetCategoryId] = useState("");
//   const [order, setOrder] = useState(0);
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUploading(true);
//     setSuccessMsg("");
//     setErrorMsg("");

//     if (!image) {
//       setErrorMsg("Please select an image before uploading!");
//       setUploading(false);
//       return;
//     }

//     try {
//       // upload image to storage
//       const storageRef = ref(storage, `banners/${Date.now()}_${image.name}`);
//       await uploadBytes(storageRef, image);
//       const imageUrl = await getDownloadURL(storageRef);

//       // store banner details in Firestore
//       await addDoc(collection(db, "banners"), {
//         title,
//         imageUrl,
//         targetCategoryId,
//         order: Number(order),
//         createdAt: new Date(),
//       });

//       setSuccessMsg("✅ Banner uploaded successfully!");
//       setTitle("");
//       setOrder(0);
//       setTargetCategoryId("");
//       setImage(null);
//       setPreview("");
//     } catch (error) {
//       console.error("Error uploading banner:", error);
//       setErrorMsg("❌ Failed to upload banner. Try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="admin-banner-upload">
//       <h2>Upload New Banner</h2>
//       <form onSubmit={handleSubmit} className="banner-form">
//         <label>
//           Banner Title:
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="e.g. Diwali Offers"
//             required
//           />
//         </label>

//         <label>
//           Target Category ID (optional):
//           <input
//             type="text"
//             value={targetCategoryId}
//             onChange={(e) => setTargetCategoryId(e.target.value)}
//             placeholder="Category ID (optional)"
//           />
//         </label>

//         <label>
//           Display Order:
//           <input
//             type="number"
//             value={order}
//             onChange={(e) => setOrder(e.target.value)}
//             required
//           />
//         </label>

//         <label>
//           Select Banner Image:
//           <input type="file" accept="image/*" onChange={handleImageChange} required />
//         </label>

//         {preview && <img src={preview} alt="preview" className="banner-preview" />}

//         <button type="submit" disabled={uploading}>
//           {uploading ? "Uploading..." : "Upload Banner"}
//         </button>

//         {successMsg && <p className="success">{successMsg}</p>}
//         {errorMsg && <p className="error">{errorMsg}</p>}
//       </form>
//     </div>
//   );
// };

// export default AdminBannerUpload;




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { db, storage } from "../firebase";
// import { collection, addDoc } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import "../styles/AdminBannerUpload.css";

// const AdminBannerUpload = () => {
//   const navigate = useNavigate();
//   const [title, setTitle] = useState("");
//   const [targetCategoryId, setTargetCategoryId] = useState("");
//   const [order, setOrder] = useState(0);
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Validate file size (max 5MB)
//       if (file.size > 5 * 1024 * 1024) {
//         setErrorMsg("Image size should be less than 5MB");
//         return;
//       }
      
//       // Validate file type
//       if (!file.type.startsWith("image/")) {
//         setErrorMsg("Please select a valid image file");
//         return;
//       }

//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//       setErrorMsg(""); // Clear any previous errors
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUploading(true);
//     setSuccessMsg("");
//     setErrorMsg("");

//     if (!image) {
//       setErrorMsg("Please select an image before uploading!");
//       setUploading(false);
//       return;
//     }

//     if (!title.trim()) {
//       setErrorMsg("Please enter a banner title!");
//       setUploading(false);
//       return;
//     }

//     try {
//       console.log("Starting upload...");
      
//       // Upload image to storage with better error handling
//       const fileName = `${Date.now()}_${image.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
//       const storageRef = ref(storage, `banners/${fileName}`);
      
//       console.log("Uploading to:", storageRef.fullPath);
//       const uploadResult = await uploadBytes(storageRef, image);
//       console.log("Upload successful:", uploadResult);
      
//       const imageUrl = await getDownloadURL(storageRef);
//       console.log("Download URL:", imageUrl);

//       // Store banner details in Firestore
//       const docRef = await addDoc(collection(db, "banners"), {
//         title: title.trim(),
//         imageUrl,
//         targetCategoryId: targetCategoryId.trim() || null,
//         order: Number(order),
//         createdAt: new Date(),
//       });

//       console.log("Document created:", docRef.id);
//       setSuccessMsg("✅ Banner uploaded successfully! Redirecting...");
      
//       // Reset form
//       setTitle("");
//       setOrder(0);
//       setTargetCategoryId("");
//       setImage(null);
//       setPreview("");

//       // Redirect to home page after 1.5 seconds
//       setTimeout(() => {
//         navigate("/");
//       }, 1500);

//     } catch (error) {
//       console.error("Detailed error uploading banner:", error);
//       console.error("Error code:", error.code);
//       console.error("Error message:", error.message);
      
//       // Provide more specific error messages
//       let errorMessage = "❌ Failed to upload banner. ";
      
//       if (error.code === "storage/unauthorized") {
//         errorMessage += "Permission denied. Check Firebase Storage rules.";
//       } else if (error.code === "storage/canceled") {
//         errorMessage += "Upload was canceled.";
//       } else if (error.code === "storage/unknown") {
//         errorMessage += "Unknown error occurred. Check console for details.";
//       } else {
//         errorMessage += error.message || "Please try again.";
//       }
      
//       setErrorMsg(errorMessage);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="admin-banner-upload">
//       <h2>Upload New Banner</h2>
//       <form onSubmit={handleSubmit} className="banner-form">
//         <label>
//           Banner Title:
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="e.g. Diwali Offers"
//             required
//             disabled={uploading}
//           />
//         </label>

//         <label>
//           Target Category ID (optional):
//           <input
//             type="text"
//             value={targetCategoryId}
//             onChange={(e) => setTargetCategoryId(e.target.value)}
//             placeholder="Category ID (optional)"
//             disabled={uploading}
//           />
//         </label>

//         <label>
//           Display Order:
//           <input
//             type="number"
//             value={order}
//             onChange={(e) => setOrder(e.target.value)}
//             required
//             disabled={uploading}
//           />
//         </label>

//         <label>
//           Select Banner Image:
//           <input 
//             type="file" 
//             accept="image/*" 
//             onChange={handleImageChange} 
//             required 
//             disabled={uploading}
//           />
//         </label>

//         {preview && (
//           <div className="preview-container">
//             <img src={preview} alt="preview" className="banner-preview" />
//           </div>
//         )}

//         <button type="submit" disabled={uploading}>
//           {uploading ? "Uploading..." : "Upload Banner"}
//         </button>

//         {successMsg && <p className="success">{successMsg}</p>}
//         {errorMsg && <p className="error">{errorMsg}</p>}
//       </form>
//     </div>
//   );
// };

// export default AdminBannerUpload;




import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, orderBy, query, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/AdminBannerUpload.css";

const AdminBannerUpload = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);  
  const [order, setOrder] = useState("");
  const [banners, setBanners] = useState([]);

  // ✅ Fetch banners
  const fetchBanners = async () => {
    const q = query(collection(db, "banners"), orderBy("order", "asc"));
    const snap = await getDocs(q);
    setBanners(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // ✅ Handle submit (save only image filename)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !file || !order) {
      alert("Please fill all fields");
      return;
    }

    const fileName = file.name; // only filename, not file content
    const imagePath = `/images/${fileName}`; // assume image is inside /public/images/

    await addDoc(collection(db, "banners"), {
      title,
      imageUrl: imagePath,
      order: Number(order),
      createdAt: new Date(),
    });

    alert(`✅ Banner added! Remember to place "${fileName}" inside /public/images/`);
    setTitle("");
    setFile(null);
    setOrder("");
    fetchBanners();
  };

  // ✅ Delete banner
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this banner?")) return;
    await deleteDoc(doc(db, "banners", id));
    fetchBanners();
  };

  return (
    <div className="admin-banner-container">
      <h2>🛠️ Admin - Banner Upload (Save Only Path)</h2>

      <form className="admin-banner-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Banner Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <input
          type="number"
          placeholder="Display Order"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        />

        <button type="submit">Add Banner</button>
      </form>

      <h3>📸 Current Banners</h3>
      <div className="banner-list">
        {banners.length > 0 ? (
          banners.map((b) => (
            <div key={b.id} className="banner-item-admin">
              <img src={b.imageUrl} alt={b.title} />
              <div>
                <h4>{b.title}</h4>
                <p>Order: {b.order}</p>
                <p><code>{b.imageUrl}</code></p>
                <button onClick={() => handleDelete(b.id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No banners yet.</p>
        )}
      </div>
    </div>
  );
};

export default AdminBannerUpload;

