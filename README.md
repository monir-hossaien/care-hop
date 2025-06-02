# 🩺 **CareHop**

**CareHop** is a comprehensive platform where patients can search for doctors based on specialization, location, experience, and ratings. Patients can easily book appointments, view doctor profiles, and leave reviews. Doctors can manage their profiles and availability, while admins have control over users, doctor approvals, and appointments.

---

## 🚀 **Features**

### **User Authentication**
- Secure login & registration for **Patients**, **Doctors**, and **Admins** using **JWT** and **bcrypt**.

### **Doctor Search**
- Search for doctors based on **specialization**, **location**, **experience**, and **ratings**.
- View doctor **profiles** with detailed information.

### **Appointment Booking**
- Patients can **book appointments** with doctors based on available time slots.
- Real-time availability and booking confirmation.

### **Reviews & Ratings**
- **Patients** can rate doctors and leave **feedback** based on their consultation experience.

### **Admin Dashboard**
- **Admins** can manage users, approve/reject doctor profiles, and oversee appointments and reviews.

### **Notifications**
- **Automated email/SMS** notifications for appointment confirmations and reminders.

---

## 🛠️ **Tech Stack**

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT & bcrypt
- **File Storage**: Multer & Cloudinary (optional for image uploads)
- **Notifications**: SendGrid (email) / Twilio (SMS)

---

## ⚙️ **Setup & Installation**

### **Prerequisites**
- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud)
- **Cloudinary** account (for image uploads) *(optional)*
- **SendGrid** or **Twilio** account *(for email/SMS notifications)*
---

## ⚙️ Configure Environment Variables

Create a `.env` file in the **backend** directory and add your environment variables:

```
env
PORT=5000
MONGO_URI=your_mongo_database_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```
## 🚀 Run the Project

### Start Backend Server:
```
bash
npm run server
```

## 🚀 Start Frontend (React App):
```
cd client
npm start
```

## 📄 Usage

### 👤 For Patients:
- Register and login to create an account.
- Search for doctors by specialization, location, and ratings.
- Book appointments based on available slots.
- Leave reviews and ratings after consultation.

<hr>

### 👨‍⚕️ For Doctors:
- Create and manage your profile with specialization, experience, and consultation fees.
- Set available time slots and manage bookings.

<hr>

### 🛠️ For Admins:
- Approve or reject doctor profiles.
- Manage users (patients and doctors).
- Monitor appointments and reviews.

<hr>

## 📝 License
This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for more details.

<hr>

## 👨‍💻 Contributors
- **Monir Hossain**  
  - [LinkedIn](https://linkedin.com/in/monirhdigital) | [GitHub](https://github.com/monir-hossaien)

<hr>

## 📸 Screenshots
_Add screenshots here to showcase the UI._

<hr>

## 🖋️ Acknowledgements
- **MERN Stack** for full-stack development.
- **MongoDB** for database management.
- **Cloudinary** for file uploads (optional).
- **SendGrid / Twilio** for notifications.
