import { Button } from "@/components/ui/button";

const Videos = () => {
  return (
    <div className="w-full p-4 space-y-3">
      <div className="flex items-center gap-x-3">
        <Button className="bg-main text-white px-3 h-6 text-sm font-medium rounded-none hover:bg-main">
          Latest
        </Button>
        <Button className="border  text-white px-3 h-6 text-sm font-medium rounded-none hover:bg-main hover:border-0">
          Popular
        </Button>
        <Button className="border border-white text-white px-3 h-6 text-sm font-medium rounded-none hover:bg-main hover:border-0">
          Oldest
        </Button>
      </div>
    </div>
  );
};

export default Videos;
