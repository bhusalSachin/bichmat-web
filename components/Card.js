const Card = (props) => {
  return (
    <div className=" px-2 py-1 sm:px-6 sm:py-4 text-center rounded-md sm:rounded-lg flex flex-col space-y-2 bg-gradient-to-tr from-gray-200 to-pink-200 shadow-md hover:scale-105">
      <span className="text-pink-700 text-xl sm:text-2xl md:text-3xl font-bold">
        {props.maintext}
      </span>
      <span className="text-lg sm:text-xl md:text-2xl font-bold">
        {props.text}
      </span>
    </div>
  );
};

export default Card;
