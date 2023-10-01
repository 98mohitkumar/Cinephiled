const removeDuplicates = (items) => {
  let filtered = [];

  const cleanedItems = items
    .map((item) => {
      if (filtered.includes(item.id)) {
        return { duplicate: true };
      } else {
        filtered.push(item.id);
        return item;
      }
    })
    .filter((item) => !item?.duplicate);

  return { cleanedItems };
};

export default removeDuplicates;
