import { TreeView, createTreeCollection } from '@ark-ui/react/tree-view';
import TreeNode from './TreeNode';

interface Node {
  id: string;
  name: string;
  children?: Node[] | undefined;
}

const Category = () => {
  const collection = createTreeCollection<Node>({
    nodeToValue: (node) => node.id,
    nodeToString: (node) => node.name,
    rootNode: {
      id: 'ROOT',
      name: '',
      children: [
        {
          id: 'categorias',
          name: 'Categorías',
          children: [
            {
              id: '/category/electronicos',
              name: 'Electrónicos',
            },
            {
              id: '/category/ropa',
              name: 'Ropa',
            },
            {
              id: '/category/hogar',
              name: 'Hogar',
            },
            {
              id: '/category/jardin',
              name: 'Jardín',
            },
            {
              id: '/category/accesorios',
              name: 'Accesorios',
            },
            {
              id: '/category/salud',
              name: 'Salud',
            },
            {
              id: '/category/belleza',
              name: 'Belleza',
            },
            {
              id: '/category/deportes',
              name: 'Deportes',
            },
            {
              id: '/category/airelibre',
              name: 'Aire Libre',
            },
            {
              id: '/category/libros',
              name: 'Libros',
            },
            {
              id: '/category/entretenimiento',
              name: 'Entretenimiento',
            },
            {
              id: '/category/alimentos',
              name: 'Alimentos',
            },
            {
              id: '/category/bebidas',
              name: 'Bebidas',
            },
            {
              id: '/category/juguetes',
              name: 'Juguetes',
            },
            {
              id: '/category/niños',
              name: 'Niños',
            },
            {
              id: '/category/mascotas',
              name: 'Mascotas',
            },
          ],
        },
        {
          id: 'mejores-vendedores',
          name: 'Mejores vendedores',
          children: [
            { id: 'mejores-vendedores-iphone', name: 'iPhone 15 Pro' },
            { id: 'mejores-vendedores-airpods', name: 'AirPods Pro' },
            { id: 'mejores-vendedores-macbook', name: 'MacBook Air M3' },
            { id: 'mejores-vendedores-watch', name: 'Apple Watch Series 9' },
            { id: 'mejores-vendedores-jeans', name: 'Jeans Premium' },
            { id: 'mejores-vendedores-sneakers', name: 'Sneakers Deportivos' },
          ],
        },
        {
          id: 'descuentos',
          name: 'En Descuento!!!',
          children: [
            { id: 'descuento-samsung', name: 'Samsung Galaxy S24 - 20% OFF' },
            { id: 'descuento-laptop', name: 'Laptop Gaming - 15% OFF' },
            { id: 'descuento-ropa-verano', name: 'Colección Verano - 30% OFF' },
            { id: 'descuento-muebles', name: 'Muebles de Sala - 25% OFF' },
            {
              id: 'descuento-electrodomesticos',
              name: 'Electrodomésticos - 18% OFF',
            },
          ],
        },
      ],
    },
  });

  return (
    <TreeView.Root collection={collection} className="">
      <TreeView.Label className="font-bold  text-normal text-shadow-xs text-shadow-black/30  tracking-wider">
        Catalogo de categorias
      </TreeView.Label>
      <TreeView.Tree className="flex flex-col gap-4 mt-6">
        {collection.rootNode.children?.map((node, index) => (
          <TreeNode key={node.id} node={node} indexPath={[index]} />
        ))}
      </TreeView.Tree>
    </TreeView.Root>
  );
};

export default Category;
