const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="bg-gray-50 py-8 mb-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-xl text-gray-600 max-w-3xl">{subtitle}</p>
      </div>
    </div>
  );
};

export default PageHeader;
