import { TreeView } from '@ark-ui/react/tree-view';
import { IoIosArrowDown } from 'react-icons/io';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { Link } from 'react-router';
import {
  FaPaw,
  FaPizzaSlice,
  FaRobot,
  FaFutbol,
  FaCampground,
  FaBook,
  FaGamepad,
  FaHeadphones,
  FaBaby,
} from 'react-icons/fa6';
import { FaCocktail, FaHome, FaMedkit } from 'react-icons/fa';
import { GiGardeningShears, GiLipstick } from 'react-icons/gi';
import { IoGameController } from 'react-icons/io5';
import { IoMdShirt } from 'react-icons/io';

interface Node {
  id: string;
  name: string;
  children?: Node[] | undefined;
}

const TreeNode = (props: TreeView.NodeProviderProps<Node>) => {
  const { node, indexPath } = props;
  const getIcons: () => React.ReactNode = () => {
    if (node.id === 'categorias') return <HiOutlineShoppingBag size={18} />;
    if (node.id === '/category/electronicos') return <FaRobot size={18} />;
    if (node.id === '/category/ropa') return <IoMdShirt size={18} />;
    if (node.id === '/category/accesorios') return <FaHeadphones size={18} />;
    if (node.id === '/category/hogar') return <FaHome size={18} />;
    if (node.id === '/category/jardin') return <GiGardeningShears size={18} />;
    if (node.id === '/category/salud') return <FaMedkit size={18} />;
    if (node.id === '/category/belleza') return <GiLipstick size={18} />;
    if (node.id === '/category/deportes') return <FaFutbol size={18} />;
    if (node.id === '/category/airelibre') return <FaCampground size={18} />;
    if (node.id === '/category/libros') return <FaBook size={18} />;
    if (node.id === '/category/entretenimiento') return <FaGamepad size={18} />;
    if (node.id === '/category/alimentos') return <FaPizzaSlice size={18} />;
    if (node.id === '/category/bebidas') return <FaCocktail size={18} />;
    if (node.id === '/category/juguetes') return <IoGameController size={18} />;
    if (node.id === '/category/niños') return <FaBaby size={18} />;
    if (node.id === '/category/mascotas') return <FaPaw size={18} />;
    if (node.id === 'categorias') return <HiOutlineShoppingBag size={18} />;
  };
  return (
    <TreeView.NodeProvider key={node.id} node={node} indexPath={indexPath}>
      {node.children ? (
        <TreeView.Branch className="">
          <TreeView.BranchControl className="border border-transparent shadow-lg shadow-black/20 hover:shadow-black/35 hover:border-gray-300/60 flex items-center cursor-pointer justify-between gap-3  py-3 px-4 rounded-lg  transition-discrete duration-300 ease-in-out  data-[state=open]:bg-black/10 data-[state=open]:shadow-transparent   font-normal ">
            <TreeView.BranchText className="flex gap-x-2 items-center text-sm">
              {getIcons()}
              {node.name}
            </TreeView.BranchText>
            <TreeView.BranchIndicator className="transition-transform duration-300 data-[state=open]:rotate-180">
              <IoIosArrowDown />
            </TreeView.BranchIndicator>
          </TreeView.BranchControl>
          <TreeView.BranchContent
            className={`${
              node.id === 'categorias'
                ? 'after:h-[98.4%]'
                : node.id === 'mejores-vendedores'
                ? 'after:h-[95.4%]'
                : node.id === 'descuentos'
                ? 'after:h-[93.3%]'
                : 'after:h-[96.4%]'
            } relative  after:w-[3.5px] after:-top-2 after:rounded-full after:bg-gray-200/90  after:absolute after:-left-0.5  ml-4 pl-5     
            data-[state=open]:animate-in data-[state=open]:slide-in-from-top-1 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:duration-300
        data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top-1 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:duration-200`}
          >
            <TreeView.BranchIndentGuide />
            {node.children.map((child, index) => (
              <TreeNode
                key={child.id}
                node={child}
                indexPath={[...indexPath, index]}
              />
            ))}
          </TreeView.BranchContent>
        </TreeView.Branch>
      ) : (
        <TreeView.Item
          className={`my-1 shadow-lg border after:w-5  after:h-[3px] after:rounded-full after:bg-gray-200/90 relative after:absolute after:-left-5.5 after:top-1/2 after:-translate-y-1/2 border-transparent hover:border-gray-200/50 rounded-lg shadow-transparent hover:shadow-black/30 px-3  py-2.5 transition-all duration-300 cursor-pointer`}
        >
          {node.id.includes('/') ? (
            <Link to={node.id}>
              <TreeView.ItemText className="text-xs flex items-center gap-2 text-black/80">
                {getIcons()} {node.name}
              </TreeView.ItemText>
            </Link>
          ) : (
            <TreeView.ItemText className="text-sm flex items-center text-black/80">
              {node.name}
            </TreeView.ItemText>
          )}
        </TreeView.Item>
      )}
    </TreeView.NodeProvider>
  );
};

export default TreeNode;
