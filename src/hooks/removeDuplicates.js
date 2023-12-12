const removeDuplicates = (items) => {
  const uniqueIds = new Set();

  const cleanedItems = items
    .map((item) => (uniqueIds.has(item.id) ? null : (uniqueIds.add(item.id), item)))
    .filter(Boolean);

  return { cleanedItems };
};

export default removeDuplicates;
