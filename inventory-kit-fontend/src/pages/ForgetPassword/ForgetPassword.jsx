// import { Link } from "react-router-dom"

// function ForgetPassword() {


//     return (
//         <>
//             <main className="w-full h-screen flex flex-col items-center justify-center px-4">
//                 <div className="max-w-sm w-full m-2  p-4 rounded-xl   text-black bg-gray-300 shadow-dark-800">
//                     <div className="text-center">
//                         <img src="https://floatui.com/logo.svg" width={150} className="mx-auto" />
//                         <div className="mt-5 space-y-2">
//                             <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Enter Your Email </h3>

//                         </div>
//                     </div>
//                     <form
//                         onSubmit={(e) => e.preventDefault()}
//                         className="mt-8 space-y-5"
//                     >
//                         <div>
//                             <label className="font-medium">
//                                 Email
//                             </label>
//                             <input
//                                 type="email"
//                                 required
//                                 placeholder="Enter Your Email"
//                                 className="w-full mt-2 mb-2 px-3 py-2 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
//                             />
//                         </div>

//                         <button
//                             className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
//                         >
//                             Submit
//                         </button>
//                         <div className="text-center">
//                             <Link to="/" className="hover:text-indigo-600">Have an Account ? LogIn</Link>
//                         </div>
//                     </form>
//                 </div>
//             </main>
//         </>
//     )
// }

// export default ForgetPassword



import { useState } from "react";
import { Link } from "react-router-dom";
import SuperAdminResetPasswordService from "../../services/SuperAdminServices/SuperADminResetPasswordService";
SuperAdminResetPasswordService

function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await SuperAdminResetPasswordService.sendResetPasswordEmail(email);
            setSuccessMessage("Reset password email sent successfully.");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <main className="w-full h-screen flex flex-col items-center justify-center px-4">
            <div className="max-w-sm w-full m-2 p-4 rounded-xl text-black bg-gray-300 shadow-dark-800">
                <div className="text-center">
                    <img src="https://floatui.com/logo.svg" width={150} className="mx-auto" />
                    <div className="mt-5 space-y-2">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Enter Your Email</h3>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                        <label className="font-medium">Email</label>
                        <input
                            type="email"
                            required
                            placeholder="Enter Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-2 mb-2 px-3 py-2 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                    >
                        Submit
                    </button>

                    {error && <p className="text-red-500 mt-3">{error}</p>}
                    {successMessage && <p className="text-green-500 mt-3">{successMessage}</p>}

                    <div className="text-center">
                        <Link to="/" className="hover:text-indigo-600">Have an Account? Log In</Link>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default ForgetPassword;
