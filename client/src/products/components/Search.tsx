import { Combobox, createListCollection } from '@ark-ui/react/combobox';
import { useState, useMemo } from 'react';

const items = ['React', 'Vue', 'Solid', 'Svelte', 'Angular'];

export const Search = () => {
  const [filteredItems, setFilteredItems] = useState(items);

  const collection = useMemo(
    () => createListCollection({ items: filteredItems }),
    [filteredItems]
  );

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    setFilteredItems(
      items.filter((item) =>
        item.toLowerCase().includes(details.inputValue.toLowerCase())
      )
    );
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <Combobox.Root
        collection={collection}
        onInputValueChange={handleInputChange}
      >
        <Combobox.Label className="block mb-1 text-sm font-medium text-gray-700">
          Selecciona un framework
        </Combobox.Label>

        <Combobox.Control className="flex border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
          <Combobox.Input
            className="flex-1 px-3 py-2 outline-none"
            placeholder="Buscar..."
          />
          <Combobox.Trigger className="px-2 bg-gray-100 text-gray-700">
            ▼
          </Combobox.Trigger>
        </Combobox.Control>

        <Combobox.Positioner>
          <Combobox.Content className="border border-gray-200 mt-1 rounded-md shadow-md bg-white max-h-60 overflow-y-auto">
            {collection.items.map((item) => (
              <Combobox.Item key={item} item={item}>
                <Combobox.ItemText className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  {item}
                </Combobox.ItemText>
                <Combobox.ItemIndicator className="px-2 text-green-500">
                  ✓
                </Combobox.ItemIndicator>
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Combobox.Root>
    </div>
  );
};

export default Search;