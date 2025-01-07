export default function TableHeader({ columnHeaders }) {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        {Object.values(columnHeaders).map((header, index) => (
          <th key={index} className="p-2">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}
