const Card = (props) => {
  return (
    <div className="px-6 py-4 text-center rounded-lg flex flex-col space-y-2 bg-gradient-to-tr from-gray-200 to-pink-200 shadow-md">
      <span className="text-pink-700 text-3xl font-bold">{props.maintext}</span>
      <span className="text-2xl font-bold">{props.text}</span>
    </div>
  );
};

export default Card;
