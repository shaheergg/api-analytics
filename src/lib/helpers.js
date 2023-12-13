export function transformData(originalData) {
  // Create an object to store the aggregated data
  const aggregatedData = {};

  // Iterate through the original data
  originalData.forEach((item) => {
    // Extract the date part from the "createdAt" field
    const date = new Date(item.createdAt);
    const formattedDate = `${date.getDate()}, ${
      months[date.getMonth()]
    } ${date.getFullYear()}`;

    // Increment the count for the corresponding date
    aggregatedData[formattedDate] = (aggregatedData[formattedDate] || 0) + 1;
  });

  // Ensure all current dates are in the aggregatedData with a count of zero
  const currentDate = new Date();
  const currentDateFormatted = `${currentDate.getDate()}, ${
    months[currentDate.getMonth()]
  } ${currentDate.getFullYear()}`;

  const startDate = new Date(originalData[0]?.createdAt);
  const endDate = new Date(originalData[originalData.length - 1]?.createdAt);

  const dateIterator = new Date(startDate);
  while (dateIterator <= endDate) {
    const formattedDate = `${dateIterator.getDate()}, ${
      months[dateIterator.getMonth()]
    } ${dateIterator.getFullYear()}`;

    if (!(formattedDate in aggregatedData)) {
      aggregatedData[formattedDate] = 0;
    }

    dateIterator.setDate(dateIterator.getDate() + 1);
  }

  // Convert the aggregated data to the desired format
  const transformedData = Object.entries(aggregatedData).map(([x, y]) => ({
    x,
    y,
  }));

  // Sort the transformed data based on the date created
  transformedData.sort((a, b) => {
    const dateA = new Date(a.x);
    const dateB = new Date(b.x);
    return dateA - dateB;
  });

  return transformedData;
}

// Mapping for month names
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
