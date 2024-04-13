
function App() {
  return (
    <div className="bg-neutral-200 h-screen flex justify-center items-center">
      <div className="flex h-[600px] w-[1000px] bg-stone-500 p-1 space-x-1">
        <div className="flex flex-col w-1/3 space-y-1">
          <div className="bg-red-300 rounded h-1/2 w-full"></div>
          <div className="bg-red-400 rounded h-1/2 w-full"></div>
        </div>
        <div className="bg-red-600 rounded flex-1 w-2/3"></div>
      </div>


    </div >
  );
}

export default App;
