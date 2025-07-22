
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
              id: 'categoria-electronica',
              name: 'Electrónicos',
              children: [
                { id: 'smartphones', name: 'Smartphones' },
                { id: 'laptops', name: 'Laptops' },
                { id: 'tablets', name: 'Tablets' },
                { id: 'accesorios', name: 'Accesorios' },
              ],
            },
            {
              id: 'categoria-ropa',
              name: 'Ropa',
              children: [
                { id: 'hombres', name: 'Hombres' },
                { id: 'mujeres', name: 'Mujeres' },
                { id: 'niños', name: 'Niños' },
                { id: 'zapatos', name: 'Zapatos' },
              ],
            },
            {
              id: 'categoria-hogar',
              name: 'Hogar y Jardín',
              children: [
                { id: 'muebles', name: 'Muebles' },
                { id: 'decoracion', name: 'Decoración' },
                { id: 'jardin', name: 'Jardín' },
                { id: 'cocina', name: 'Cocina' },
              ],
            },
          ],
        },
        {
          id: 'best-sellers',
          name: 'Best Sellers',
          children: [
            { id: 'bestseller-iphone', name: 'iPhone 15 Pro' },
            { id: 'bestseller-airpods', name: 'AirPods Pro' },
            { id: 'bestseller-macbook', name: 'MacBook Air M3' },
            { id: 'bestseller-watch', name: 'Apple Watch Series 9' },
            { id: 'bestseller-jeans', name: 'Jeans Premium' },
            { id: 'bestseller-sneakers', name: 'Sneakers Deportivos' },
          ],
        },
        {
          id: 'descuentos',
          name: 'En Descuento',
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
     <TreeView.Root collection={collection}>
       <TreeView.Label>Catálogo de Productos</TreeView.Label>
       <TreeView.Tree>
         {collection.rootNode.children?.map((node, index) => (
           <TreeNode key={node.id} node={node} indexPath={[index]} />
         ))}
       </TreeView.Tree>
     </TreeView.Root>
   );
}


export default Category
