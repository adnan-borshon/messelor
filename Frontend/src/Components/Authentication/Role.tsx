import React from "react";

interface JoinModalProps {
  closeModal: () => void;
}

const Role: React.FC<JoinModalProps> = ({ closeModal }) => {
  const handleChoice = (role: "Admin" | "Member") => {
    alert(`You chose to join as ${role}`);
    closeModal();
    // 👉 you can navigate here if needed
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 w-96 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Confirm Your Role
        </h2>
        <p className="text-gray-600 mb-6">
          Do you want to join as an Admin or a Member?
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => handleChoice("Admin")}
            className="cursor-pointer px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Admin
          </button>
          <button
            onClick={() => handleChoice("Member")}
            className="cursor-pointer px-5 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
          >
            Member
          </button>
        </div>
        <button
          onClick={closeModal}
          className=" cursor-pointer mt-6 text-sm text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Role;
