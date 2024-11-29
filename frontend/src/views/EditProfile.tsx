import { useState } from "react";

const EditProfile = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userInfo] = useState({
    email: "user@example.com",
    username: "John Doe",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Edit Your Profile
            </h1>

            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile Preview"
                className="w-32 h-32 rounded-full mx-auto"
              />
            ) : (
              <img
                src="default-profile.png"
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto"
              />
            )}
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Change Profile Picture
                </label>
                <input
                  type="file"
                  className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <div className="bg-gray-50 border text-gray-900 rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  {userInfo.email}
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Username
                </label>
                <div className="bg-gray-50 border text-gray-900 rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  {userInfo.username}
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
