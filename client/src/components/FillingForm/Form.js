import { useNavigate } from "react-router-dom";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { FaRegRegistered } from "react-icons/fa";
import Cookies from "universal-cookie";

let validationSchema = Yup.object({
  username: Yup.string().required("*username field is required"),
  room: Yup.string().required("*room field is required"),
});

const Register = ({ setRoomCode, setUserName, socket }) => {
  const initialValues = { room: "", username: "" };
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleSubmit = (data, { resetForm }) => {
    setRoomCode(data.room);
    setUserName(data.username);
    socket.on("waiting_room", ({ isRegistered, token }) => {
      if (isRegistered) {
        cookies.set("token_chat_user", token);
        return navigate("/game");
      }
    });
  };

  return (
    <>
      <div className="top-40 relative">
        <div className="container max-w-screen-sm center mx-auto">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ errors, touched }) => (
              <Form
                className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
                style={{ boxShadow: "0px 0px 20px 4px" }}
              >
                <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl mb-4 text-center flex w-100  items-center justify-center">
                  <FaRegRegistered style={{ fontSize: "40px" }} />{" "}
                  <span className=" ml-1 tracking-widest	">egister</span>
                </h1>
                <div className="mb-4">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    User Name
                  </label>
                  <Field
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      touched.name && errors.name && "border-red-700"
                    }`}
                    id="username"
                    name="username"
                    type="text"
                    placeholder="enter username"
                  />

                  {touched.username && errors.username && (
                    <p className="text-red-500 mt-2 text-xs italic">
                      {errors.username}.
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="room"
                  >
                    Room
                  </label>
                  <Field
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      touched.room && errors.room && "border-red-700"
                    }`}
                    id="room"
                    name="room"
                    type="text"
                    placeholder="enter/create Room"
                  />
                  {touched.room && errors.room && (
                    <p className="text-red-500 mt-2 text-xs italic">
                      {errors.room}.
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-center">
                  <button
                    className="bg-white w-40 hover:bg-slate-300  text-gray-800  ease-in transition font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Play now
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <p className="text-center text-gray-500 text-xs">
            &copy;2022 Nodirbek Intern. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
