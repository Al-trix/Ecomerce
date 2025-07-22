import { CiSearch } from 'react-icons/ci';

const Search = () => {
  return (
    <form action="" className="flex gap-1 relative">
      <CiSearch className='absolute left-3 top-1/2 -translate-y-1/2'/>
      <input
        type="text"
        className=" rounded-4xl py-2 pl-9 text-sm pr-40 border border-gray-300 shadow-lg shadow-black/20 hover:border-gray-400 focus:border-gray-300/10"
      />
      <button type="submit" className=' absolute right-1.5 top-1/2 -translate-y-1/2 bg-gray-900 text-white rounded-4xl px-4 py-1.5 text-xs cursor-pointer'>Buscar</button>
    </form>
  );
};

export default Search;
