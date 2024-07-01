import { Skeleton } from "@/components/ui/skeleton";

const IconLoader = () => {
  // create 100 length array
  const skeletonArray = Array.from({ length: 100 });

  return (
    <div className="flex py-4 gap-4 flex-wrap ">
      {skeletonArray.map((_, i) => (
        <Skeleton key={i} className="h-10 w-10 rounded-md" />
      ))}
    </div>
  );
};

export default IconLoader;
