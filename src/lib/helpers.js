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

  // Convert the aggregated data to the desired format
  const transformedData = Object.entries(aggregatedData).map(([x, y]) => ({
    x,
    y,
  }));

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
