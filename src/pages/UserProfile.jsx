import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  // State variables to manage user data and form input
  const [user, setUser] = useState(null); // To store user data
  const [loading, setLoading] = useState(true);
  const [updateLoad, setUpdateLoad] = useState(true);
  const [resetLoad, setResetLoad] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    languageToLearn: "",
    languageFamiliarity: "",
  }); // To manage form data for updating user profile

  const token = JSON.parse(localStorage.getItem("token"));

  const navigate = useNavigate();

  useEffect(() => {
    getUser(token);
  }, []);

  const getUser = async (token) => {
    axios.defaults.headers.common["Authorization"] = token;
    try {
      // Fetch user data from the server using the token
      const response = await axios.get(
        // "http://localhost:3000/api/users/getuser"
        "https://powrlingo-server.onrender.com/api/users/getuser"
      );
      setUser(response.data.user); // Set user data in state
      setLoading(false);
      setFormData({
        name: response.data.user.Name,
        languageToLearn: response.data.user.languageToLearn,
        languageFamiliarity: response.data.user.languageFamiliarity,
      }); // Populate the form with user data
      // toast.success("User Data retrieved successfully");
    } catch (error) {
      toast.error(error);
      // Redirect to the login page if user data cannot be fetched
      navigate("/login");
    }
  };

  const handleChange = (e) => {
    // Handle form input changes and update the formData state
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setUpdateLoad(false);
    try {
      axios.defaults.headers.common["Authorization"] = token; // Set the Authorization header with the token

      // Send a PATCH request to update the user's profile on the server
      const response = await axios.patch(
        "https://powrlingo-server.onrender.com/api/users/updateprofile",
        formData
      );

      if (response.data.ok) {
        // If the update is successful, update the user's data in the state and show a success toast
        getUser(token);
        setUpdateLoad(true);
        toast.success("Profile updated successfully!");
      } else {
        // If the update fails, show an error toast
        toast.error("Profile update failed.");
      }
    } catch (error) {
      console.error(error);
      // Handle errors and show an error toast
      toast.error("An error occurred while updating your profile.");
    }
  };

  const ResetProgress = async () => {
    setResetLoad(false);
    axios.defaults.headers.common["Authorization"] = token; // Set the Authorization header with the token
    const response = await axios.patch(
      "https://powrlingo-server.onrender.com/api/users/resetprogress"
    );
    if (response.data.ok) {
      getUser(token);
      setResetLoad(true);
      toast.success("Progress reset successfully!");
    } else {
      toast.error("Progress reset failed, please try again later.");
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="user-profile bg-gray-100 max-h-screen lg:min-h-screen p-4 font-mono">
      {user ? (
        <>
          <div className="max-w-md mx-auto p-6 bg-black text-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-2">
                <div className="flex">
                  <label className="font-semibold mr-2" htmlFor="name">
                    Name:
                  </label>
                  {loading ? (
                    <MoreHorizontal />
                  ) : (
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="font-mono focus:outline-none bg-black"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  )}
                </div>
                <div className="flex">
                  <label htmlFor="email" className="font-semibold mr-2">
                    Email:{" "}
                  </label>
                  {loading ? <MoreHorizontal /> : <p>{user.Email}</p>}
                </div>
                <div className="flex">
                  <label
                    className="font-semibold mr-2"
                    htmlFor="languageToLearn"
                  >
                    Language to Learn:
                  </label>
                  {loading ? (
                    <MoreHorizontal />
                  ) : (
                    <select
                      id="languageToLearn"
                      name="languageToLearn"
                      className="font-mono focus:outline-none bg-black"
                      value={formData.languageToLearn}
                      onChange={handleChange}
                    >
                      <option value="English">English</option>
                      <option value="German">German</option>
                      <option value="French">French</option>
                    </select>
                  )}
                </div>
                <div className="flex">
                  <label
                    className="font-semibold mr-2"
                    htmlFor="languageFamiliarity"
                  >
                    Language Familiarity:
                  </label>
                  {loading ? (
                    <MoreHorizontal />
                  ) : (
                    <select
                      id="languageFamiliarity"
                      name="languageFamiliarity"
                      className="font-mono focus:outline-none bg-black"
                      value={formData.languageFamiliarity}
                      onChange={handleChange}
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="expert">Expert</option>
                    </select>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 w-40 flex justify-center items-center px-4 py-2 bg-white text-black rounded hover:bg-gray-600 hover:text-white transition duration-300"
              >
                {updateLoad ? "Update Profile" : <Loader2 />}
              </button>
              <span className="text-yellow-500">
                -You can make changes in place
              </span>
            </form>
          </div>

          <div className="max-w-md mx-auto p-6 mt-4 bg-black text-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Statistic</h2>
            <div className="flex flex-row">
              <span className="font-semibold">Total Solved: </span>
              {loading ? (
                <MoreHorizontal />
              ) : (
                <p className="ml-4">
                  {Array.isArray(user.AttemptedQuestions)
                    ? user.totalQuestions.length
                    : 0}
                </p>
              )}
            </div>
            <div className="flex flex-row">
              <span className="font-semibold">Question Attempted: </span>
              {loading ? (
                <MoreHorizontal />
              ) : (
                <p className="ml-4">
                  {Array.isArray(user.totalQuestions)
                    ? user.totalQuestions.filter(
                        (language) => language === formData.languageToLearn
                      ).length
                    : 0}
                </p>
              )}
            </div>

            <span className="font-semibold flex flex-row">
              Points Scored:{" "}
              {loading ? (
                <MoreHorizontal />
              ) : (
                <p className="ml-4">{user.PointsScored}</p>
              )}
            </span>

            <button
              className="p-2 bg-rose-600 rounded-md w-40 flex justify-center items-center mt-4 text-white"
              onClick={ResetProgress}
            >
              {resetLoad ? "Reset Progress" : <Loader2 />}
            </button>
          </div>
        </>
      ) : (
        <div className="text-center">Loa</div>
      )}
    </div>
  );
};

export default UserProfile;
