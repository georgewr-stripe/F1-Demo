import React from "react";
import SectionTransition from "./transition";

interface RegisterProps {
  show: boolean;
  setSection: (section: string) => void;
}

const Register = ({ show }: RegisterProps) => {
  const [loading, setLoading] = React.useState(false);

  return (
    <SectionTransition show={show}>
      <div className="bg-transparent z-50">
        <div className="pt-12 sm:pb-12 sm:pt-16 lg:pt-20 bg-gradient-to-b from-gray-50/0 via-gray-100/80 to-gray-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl text-f1-dark font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Create an Account
              </h2>
              <p className="mt-4 text-xl text-f1-dark ">
                
              </p>
            </div>
          </div>
        </div>
        <div className=" bg-f1-red pb-16 sm:pb-20 lg:pb-28">
          <div className="relative">
            <div className="absolute inset-0 h-1/2 bg-gray-100" />
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-lg overflow-hidden rounded-lg shadow-lg lg:flex lg:max-w-none">
                <div className="flex-1 bg-white px-6 py-8 lg:p-12">
                  <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl sm:tracking-tight">
                    Your Details
                  </h3>
                  <div className="mt-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Christian Horner"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="christian@ferrari.com"
                      />
                    </div>
                    <div className="mt-6">
                    <div className="rounded-md shadow">
                      <div
                        className="flex items-center justify-center rounded-md border border-transparent bg-f1-dark px-5 py-3 text-base font-medium text-white hover:bg-gray-900"
                      >
                        Register
                      </div>
                    </div>
                  </div>
                  </div>
                  <div className="mt-8">
                    <div className="flex items-center">
                      <h4 className="flex-shrink-0 bg-white pr-4 text-base font-semibold text-f1-dark">
                        {"Policies"}
                      </h4>
                      <div className="flex-1 border-t-2 border-gray-200" />
                      
                    </div>
                    <p className="text-sm mt-2">
                    By clicking on register, I agree that I have read and agree to the Terms and Conditions and Privacy Policy
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 py-8 px-6 text-center lg:flex lg:flex-shrink-0 lg:flex-col lg:justify-center lg:p-12"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionTransition>
  );
};

export default Register;
