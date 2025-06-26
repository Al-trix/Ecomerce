
const CardTypeUser = ({title, description, children, typeUser}: {title: string, description: string, children: React.ReactNode, typeUser: "user" | "seller"}) => {
  
  return (
    <article data-typeuser={typeUser} className={typeUser === "user" ? ` hover:shadow-cyan-600/50 shadow-xl shadow-black/30 rounded-2xl border-transparent border-b-15 hover:border-b-cyan-600  px-3 py-9 flex flex-col items-center text-center cursor-pointer transition-discrete hover:scale-105 duration-200 ` : `  hover:shadow-emerald-600/50  shadow-xl shadow-black/30 rounded-2xl border-transparent border-b-15 hover:border-b-emerald-600 px-3 py-9 flex flex-col items-center text-center cursor-pointer transition-discrete hover:scale-105 duration-200 `}>
      {children}
      <h5 className="text-2xl font-medium tracking-wider pointer-events-none text-gray-800">
        {title}
      </h5>
      <p className="text-gray-700 mt-1 pointer-events-none">
        {description}
      </p>
    </article>
  );
};

export default CardTypeUser;
