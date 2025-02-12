interface CardProps {
  title: string;
  image: string;
  description: string;
  onReadMore?: () => void;
}

export default function Card({ title, image, description, onReadMore }: CardProps) {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden hover:bg-gray-100 transition duration-300 flex flex-col">
      <img src={image} alt={title} className="w-full h-48 object-cover" loading="lazy" />
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        {onReadMore && (
          <button
            onClick={onReadMore}
            className="mt-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            Read More
          </button>
        )}
      </div>
    </div>
  );
}
