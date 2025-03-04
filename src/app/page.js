export const metadata = {
  title: "Home : Work Manager",
};

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-3/5 bg-gray-800 shadow-lg rounded-2xl p-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to Work Manager
        </h1>
        <p className="text-lg text-white">
          Work Manager is a task management system that helps you organize and
          track your tasks efficiently. Stay productive and manage your workflow
          seamlessly!
        </p>
      </div>
    </div>
  );
}
