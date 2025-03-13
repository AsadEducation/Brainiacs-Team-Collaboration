import { useForm } from 'react-hook-form';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
  };
  
  return (
    <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
    <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: '1000px' }}>
        <div className="md:flex w-full">
            <div className=" w-1/2 bg-indigo-500 ">
               <h2>Welcome Back</h2>
            </div>
            <div className="md:w-1/2 py-10 px-10">
                <h2 className="text-3xl font-semibold text-center text-gray-900 mb-5">Sign Up</h2>
                <form action="#" method="POST">
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">Username</label>
                        <input type="text" id="username" className="w-full p-3 mt-2 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter username" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input type="email" id="email" className="w-full p-3 mt-2 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter email" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input type="password" id="password" className="w-full p-3 mt-2 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter password" />
                    </div>
                    <button type="submit" className="w-full py-3 mt-5 text-white bg-indigo-500 hover:bg-indigo-600 rounded-md focus:outline-none">Sign Up</button>
                </form>
            </div>
        </div>
    </div>
</div>

  );
};

export default Login;
