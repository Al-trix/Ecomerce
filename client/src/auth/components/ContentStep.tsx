const ContentStep = ({
  stateIndex,
  index,
  titleStep,
  children,
}: {
  stateIndex: number;
  index: number;
  titleStep: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`flex  flex-col transition-transform duration-1000  items-center ${stateIndex === index ? 'translate-x-0' : 'absolute -translate-y-100'}`}
    >
      <h4 className="font-medium tracking-widest text-2xl text-gray-800">
        {titleStep}
      </h4>
      <span className="w-60 mt-2 rounded-4xl h-px bg-gray-900 mb-4"></span>
      {children}
    </div>
  );
};

export default ContentStep;
