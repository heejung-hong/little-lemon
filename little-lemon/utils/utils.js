import { useRef, useEffect } from 'react';

/* 
 * 3. Implement this function to transform the raw data
 * retrieved by the getMenuItems() function inside the database.js file
 * into the data structure a SectionList component expects as its "sections" prop.
 * @see https://reactnative.dev/docs/sectionlist as a reference
*/
 
export function getSectionListData(data) {
  // SECTION_LIST_MOCK_DATA is an example of the data structure you need to return from this function.
  // The title of each section should be the category.
  // The data property should contain an array of menu items. 
  // Each item has the following properties: "id", "title" and "price"
  const dataByCategory = data.reduce((acc, curr) => {
    const menuItem = {
      id: curr.id,
      name: curr.name,
      price: curr.price,
      description: curr.description,
    };
    if (!Array.isArray(acc[curr.category])) {
      acc[curr.category] = [menuItem];
    } else {
      acc[curr.category].push(menuItem);
    }
    return acc;
  }, {});
  const sectionListData = Object.entries(dataByCategory).map(([key, item]) => {
    return {
      title: key,
      data: item,
    };
  });
  return sectionListData;
}

export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}
