const Step = ({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex w-fit flex-col items-center gap-y-2">
      <span className="w-12 h-12 flex text-xl items-center justify-center border font-bold border-gray-900 rounded-full">
        {children}
      </span>
      <p className="text-xs font-bold text-center text-gray-800">{text}</p>
    </div>
  );
};

export default Step;
